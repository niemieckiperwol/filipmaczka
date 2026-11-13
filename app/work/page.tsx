import type { Metadata } from "next";
import { Screen } from "../components/Screen";
import { SessionCover } from "../components/SessionCover";
import { sessions } from "../frames";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <Screen tone="white">
      <main className="work">
        <h1 className="work-title">Selected sessions</h1>
        <ul className="work-list">
          {sessions.map((session) => (
            <li key={session.slug}>
              <SessionCover session={session} />
            </li>
          ))}
        </ul>
      </main>
    </Screen>
  );
}
