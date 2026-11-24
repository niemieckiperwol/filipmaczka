import type { Metadata } from "next";
import Image from "next/image";
import { Bio } from "../components/Bio";
import { Screen } from "../components/Screen";
import { about } from "../content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <Screen tone="pink">
      <main className="spread">
        <section className="spread-panel" aria-labelledby="about-title">
          <h1 id="about-title" className="spread-title">
            {about.heading}
          </h1>
          <div className="spread-body">
            <p>Bio</p>
            <div className="spread-text">
              <Bio blocks={about.bio} />
            </div>
          </div>
        </section>
        <figure className="spread-media">
          <Image
            src={about.portrait.src}
            alt={about.portrait.alt || "Filip Maczka"}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="spread-photo"
            style={about.portrait.focus ? { objectPosition: about.portrait.focus } : undefined}
            preload
          />
        </figure>
      </main>
    </Screen>
  );
}
