import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Screen } from "../components/Screen";
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../contact-details";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <Screen tone="white">
      <main className="spread">
        <section className="spread-panel" aria-labelledby="about-title">
          <h1 id="about-title" className="spread-title">
            About
          </h1>
          <div className="spread-body">
            <p className="spread-label">Bio</p>
            <div className="spread-text">
              <p>
                Filip Maczka is a fashion and portrait photographer working with model agencies,
                brands and private clients.
              </p>
              <p>
                He shoots agency tests, private sessions, campaigns and lookbooks, in the studio
                and on location.
              </p>
              <p>
                For bookings and availability, write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or
                find him on Instagram at{" "}
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  {INSTAGRAM_HANDLE}
                </a>
                .
              </p>
            </div>
          </div>
          <Link href="/contact" className="spread-label">
            Contact
          </Link>
        </section>
        <figure className="spread-media">
          <Image
            src="/images/about/autoportret-2024.jpg"
            alt="Filip Maczka, self-portrait, 2024"
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="spread-photo"
            preload
          />
          <figcaption className="spread-caption">Autoportret</figcaption>
          <span className="spread-year" aria-hidden="true">
            2024
          </span>
        </figure>
      </main>
    </Screen>
  );
}
