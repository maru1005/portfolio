// src/components/WorksMarquee.tsx
// カードマーキー

"use client";

import { useState, useEffect, useRef } from "react";
import WorkCard from "./WorkCard";
import WorksModal from "./WorksModal";
import { Work } from "../data/works";

type WorksMarqueeProps = {
  works: Work[];
};

const DRAG_THRESHOLD = 6;

export default function WorksMarquee({ works }: WorksMarqueeProps) {
  const [selectedWork, setSelectedWork] = useState<
    (typeof works)[number] | null
  >(null);
  const loopWorks = [...works, ...works, ...works];
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const ScrollStart = useRef(0);
  const dragDistance = useRef(0);
  // マウスを押した瞬間
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true; // ドラック中
    setIsDragging(true); // true
    dragDistance.current = 0; // マウス位置リセット
    startX.current = e.pageX; // 押した瞬間のマウス座標
    ScrollStart.current = trackRef.current?.scrollLeft ?? 0; // スクロール位置
  };
  // マウスが動いている間　常時発火
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !trackRef.current) return; // 何もしない　ガード
    const dx = e.pageX - startX.current; // 押した時と今の座標
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

  useEffect(() => {
    if (!trackRef.current) return;

    const cards = trackRef.current.children;
    const middleCard = cards[works.length] as HTMLElement;

    trackRef.current.scrollLeft =
      middleCard.offsetLeft -
      trackRef.current.clientWidth / 2 +
      middleCard.clientWidth / 2;
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    const handleScroll = () => {
      const setWidth = track.scrollWidth / 3;
      if (track.scrollLeft < setWidth * 0.4) {
        track.scrollLeft += setWidth;
      } else if (track.scrollLeft > setWidth * 1.6) {
        track.scrollLeft -= setWidth;
      }
    };

    track.addEventListener("scroll", handleScroll);

    return () => {
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        {loopWorks.map((work, index) => (
          <div
            key={`${work.name}-${index}`}
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
