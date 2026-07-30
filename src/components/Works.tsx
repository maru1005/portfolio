// src/components/Works.tsx
//

import WorksMarquee from "./WorksMarquee";
import { works } from "../data/works";

export default function Works() {
  return (
    <section
      id="works"
      className="min-h-screen bg-amber-50 flex flex-col items-center justify-center text-4xl font-bold"
    >
      Works
      <WorksMarquee works={works} />
    </section>
  );
}
