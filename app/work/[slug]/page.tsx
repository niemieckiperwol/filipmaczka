import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Screen } from "../../components/Screen";
import { Slideshow } from "../../components/Slideshow";
import { findSession, sessions } from "../../content";

export const dynamicParams = false;

export function generateStaticParams() {
  return sessions.map((session) => ({ slug: session.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: findSession(slug)?.model };
}

export default async function SessionPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const session = findSession(slug);
  if (!session) notFound();

  return (
    <Screen tone="white">
      <Slideshow frames={session.frames} allowSheet />
    </Screen>
  );
}
