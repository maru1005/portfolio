// src/components/Works.tsx
// 表示部

import WorksMarquee from "./WorksMarquee";

export default function Works() {
  return (
    <section
      id="works"
      className="min-h-screen bg-amber-50 flex flex-col items-center justify-center text-4xl font-bold"
    >
      Works
      <WorksMarquee />
    </section>
  );
}
