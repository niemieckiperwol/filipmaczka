import { createHash } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PROJECT_ID = "na73b8di";
const DATASET = "production";
const API_VERSION = "v2025-02-19";
const MAX_EDGE = 2000;
const MEDIA_DIR = join(process.cwd(), "public", "media");
const OUTPUT_FILE = join(process.cwd(), "content", "site.json");

const imageProjection = `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  crop,
  hotspot,
  alt
}`;

const query = `{
  "sessions": *[_type == "session" && defined(slug.current) && count(images) > 0] | order(orderRank) {
    model,
    "slug": slug.current,
    "images": images[]${imageProjection}
  },
  "about": *[_type == "about" && _id == "about"][0] {
    heading,
    bio,
    "portrait": portrait${imageProjection}
  },
  "settings": *[_type == "settings" && _id == "settings"][0] {
    email,
    instagramHandle,
    instagramUrl,
    contactHeading,
    description
  }
}`;

async function fetchContent() {
  const url = new URL(`https://${PROJECT_ID}.apicdn.sanity.io/${API_VERSION}/data/query/${DATASET}`);
  url.searchParams.set("query", query);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Sanity query failed: ${response.status} ${await response.text()}`);
  const { result } = await response.json();
  return result;
}

function cropRect(image) {
  const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const x = Math.round(crop.left * image.width);
  const y = Math.round(crop.top * image.height);
  const width = Math.round(image.width * (1 - crop.left - crop.right));
  const height = Math.round(image.height * (1 - crop.top - crop.bottom));
  return { x, y, width, height };
}

function focalPoint(image) {
  if (!image.hotspot) return null;
  const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const horizontal = (image.hotspot.x - crop.left) / (1 - crop.left - crop.right);
  const vertical = (image.hotspot.y - crop.top) / (1 - crop.top - crop.bottom);
  const clamp = (value) => Math.min(100, Math.max(0, Math.round(value * 100)));
  return `${clamp(horizontal)}% ${clamp(vertical)}%`;
}

async function localImage(image) {
  const rect = cropRect(image);
  const scale = Math.min(1, MAX_EDGE / Math.max(rect.width, rect.height));
  const width = Math.round(rect.width * scale);
  const height = Math.round(rect.height * scale);
  const source = new URL(image.url);
  source.searchParams.set("rect", `${rect.x},${rect.y},${rect.width},${rect.height}`);
  source.searchParams.set("w", String(width));
  source.searchParams.set("h", String(height));
  source.searchParams.set("fm", "jpg");
  source.searchParams.set("q", "84");

  const name = `${createHash("sha1").update(source.toString()).digest("hex").slice(0, 16)}.jpg`;
  const target = join(MEDIA_DIR, name);
  if (!existsSync(target)) {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`Image download failed: ${response.status} ${source}`);
    writeFileSync(target, Buffer.from(await response.arrayBuffer()));
  }

  return { src: `/media/${name}`, width, height, focus: focalPoint(image), alt: image.alt ?? "" };
}

async function inBatches(items, size, task) {
  const results = [];
  for (let start = 0; start < items.length; start += size) {
    results.push(...(await Promise.all(items.slice(start, start + size).map(task))));
  }
  return results;
}

const content = await fetchContent();
if (!content.about || !content.settings || content.sessions.length === 0) {
  throw new Error("Sanity content is incomplete: publish the About page, Contact and settings, and at least one session.");
}

mkdirSync(MEDIA_DIR, { recursive: true });
mkdirSync(join(process.cwd(), "content"), { recursive: true });

const sessions = [];
for (const session of content.sessions) {
  const images = await inBatches(session.images.filter((image) => image.url), 6, localImage);
  sessions.push({ slug: session.slug, model: session.model, images });
}

const site = {
  sessions,
  about: {
    heading: content.about.heading,
    bio: content.about.bio ?? [],
    portrait: await localImage(content.about.portrait),
  },
  settings: content.settings,
};

writeFileSync(OUTPUT_FILE, `${JSON.stringify(site, null, 2)}\n`);
const count = sessions.reduce((total, session) => total + session.images.length, 0);
console.log(`Sanity content: ${sessions.length} sessions, ${count} photos`);
