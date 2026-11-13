import type { Metadata } from "next";
import Image from "next/image";
import { Screen } from "../components/Screen";

export const metadata: Metadata = { title: "About" };

const services = ["Agency tests", "Private shoots", "Campaigns", "Lookbooks"];

export default function About() {
  return (
    <Screen tone="pink">
      <main className="split">
        <div className="split-media">
          <Image
            src="/images/ania-lisia/08.jpg"
            alt="Ania Lisia, portrait by Filip Maczka"
            fill
            sizes="(min-width: 768px) 30vw, 40vw"
            className="split-photo"
            preload
          />
        </div>
        <div className="split-copy">
          <h1 className="split-lede">
            Filip Maczka is a fashion and portrait photographer working with model agencies, brands
            and private clients.
          </h1>
          <ul className="split-list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </main>
    </Screen>
  );
}
