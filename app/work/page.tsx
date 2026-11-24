import type { Metadata } from "next";
import { Screen } from "../components/Screen";
import { WorkReel } from "../components/WorkReel";
import { sessions } from "../frames";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <Screen tone="white">
      <WorkReel sessions={sessions} />
    </Screen>
  );
}
