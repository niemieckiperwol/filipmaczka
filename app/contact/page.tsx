import type { Metadata } from "next";
import { FitText } from "../components/FitText";
import { Screen } from "../components/Screen";
import { settings } from "../content";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <Screen tone="yellow">
      <main className="contact">
        <h1>{settings.contactHeading}</h1>
        <a className="contact-social" href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
          Instagram {settings.instagramHandle}
        </a>
        <a className="contact-mail" href={`mailto:${settings.email}`}>
          <FitText>{settings.email}</FitText>
        </a>
      </main>
    </Screen>
  );
}
