// src/components/WorksMarquee.tsx
// カードマーキー(Embla Carusel版)

"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import WorkCard from "./WorkCard";
import WorksModal from "./WorksModal";
import { Work } from "@/data/works";

type WorksMarqueeProps = {
  works: Work[];
};

export default function WorksMarquee({ works }: WorksMarqueeProps) {
  const [selecctedWork, setSelectedWork] = useState<Work | null>(null);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      WheelGesturesPlugin(),
    ],
  );

  const handleCardClick = (work: Work) => {
    setSelectedWork(work);
  };

  return (
    <>
      {/*  外枠　はみ出しを隠す */}
      <div
        ref={emblaRef}
        className="w-full overflow-hidden py-12 cursor-grab active:cursor-grabbing"
      >
        {/* 横に並ぶ箱  */}
        <div className="flex -ml-">
          {/* 各カード  */}
          {works.map((work) => (
            <div
              key={work.name}
              className="shrink-0 pl-6"
              onClick={() => handleCardClick(work)}
            >
              <WorkCard
                name={work.name}
                color={work.color}
                image={work.image}
              />
            </div>
          ))}
        </div>
      </div>

      <WorksModal
        key={selecctedWork?.name}
        work={selecctedWork}
        onClose={() => setSelectedWork(null)}
      />
    </>
  );
}
