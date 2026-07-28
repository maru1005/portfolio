// src/components/WorksMarquee.tsx
// カードマーキー

"use client";

import { useState, useRef } from "react";
import WorkCard from "./WorkCard";
import WorksModal from "./WorksModal";

const works = [
  { name: "デモトレ", color: "#3a3a3a" },
  { name: "MeowLingo", color: "#c9c9c9" },
  { name: "PawType", color: "#C4845A" },
  { name: "にゃいんスイーパー", color: "#7a8b74" },
];

const DRAG_THRESHOLD = 6;

export default function WorksMarquee() {
  const [selectedWork, setSelectedWork] = useState<
    (typeof works)[number] | null
  >(null);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const ScrollStart = useRef(0);
  const dragDistance = useRef(0);
  // マウスを押した瞬間
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    setIsDragging(true);
    dragDistance.current = 0;
    startX.current = e.pageX;
    ScrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  // マウスが動いている間　常時発火
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !trackRef.current) return;
    const dx = e.pageX - startX.current;
    trackRef.current.scrollLeft = ScrollStart.current - dx;
    dragDistance.current = Math.abs(dx);
  };
  // ドラッグ終了フラグ
  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
  };
  // カードがクリックされた時
  const handleCardClick = (work: (typeof works)[number]) => {
    if (dragDistance.current > DRAG_THRESHOLD) return;
    setSelectedWork(work);
  };

  return (
    <>
      <div
        ref={trackRef}
        className={`w-full flex overflow-x-auto gap-6 px-[40vw] py-12 cursor-grab active:cursor-grabbing ${
          isDragging ? "snap-none" : "snap-x snap-proximity"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {works.map((work) => (
          <div
            key={work.name}
            className="snap-center"
            onClick={() => handleCardClick(work)}
          >
            <WorkCard name={work.name} color={work.color} />
          </div>
        ))}
      </div>
      <WorksModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </>
  );
}
