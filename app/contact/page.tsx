import type { Metadata } from "next";
import { FitText } from "../components/FitText";
import { Screen } from "../components/Screen";
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../contact-details";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <Screen tone="yellow">
      <main className="contact">
        <h1 className="contact-head">Bookings and availability</h1>
        <a className="contact-social" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          Instagram {INSTAGRAM_HANDLE}
        </a>
        <a className="contact-mail" href={`mailto:${EMAIL}`}>
          <FitText>{EMAIL}</FitText>
        </a>
      </main>
    </Screen>
  );
}
