import site from "../content/site.json";

export type Frame = {
  src: string;
  width: number;
  height: number;
  focus: string | null;
  alt: string;
  model: string;
};

export type Session = {
  slug: string;
  model: string;
  frames: Frame[];
};

export type BioSpan = {
  _key: string;
  text: string;
  marks?: string[];
};

export type BioBlock = {
  _key: string;
  children: BioSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
};

export const sessions: Session[] = site.sessions.map((session) => ({
  slug: session.slug,
  model: session.model,
  frames: session.images.map((image) => ({ ...image, model: session.model })),
}));

export const allFrames: Frame[] = sessions.flatMap((session) => session.frames);

export function findSession(slug: string) {
  return sessions.find((session) => session.slug === slug);
}

export const about = {
  heading: site.about.heading,
  bio: site.about.bio as BioBlock[],
  portrait: site.about.portrait,
};

export const settings = site.settings;
