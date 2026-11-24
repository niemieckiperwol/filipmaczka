import { Screen } from "./components/Screen";
import { Slideshow } from "./components/Slideshow";
import { allFrames } from "./content";

export default function Home() {
  return (
    <Screen tone="white">
      <Slideshow frames={allFrames} showModel={false} />
    </Screen>
  );
}
