// src/components/PawTrail.tsx
// 背景　足跡

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STEP_DELAY = 1; // 一歩ごとの時間差(秒)
const STEPS = 8; // 足跡の数
const FADE_DURATION = 1.2; // 1個のフェード時間(秒)

const DIRECTIONS = [
  { mainAxis: "top", mainSign: 1, rotate: 0 }, //　上から下
  { mainAxis: "top", mainSign: -1, rotate: 180 }, //　下から上
  { mainAxis: "left", mainSign: 1, rotate: -90 }, //　左から右
  { mainAxis: "left", mainSign: -1, rotate: 90 }, //　右から左
];

// random出発地
export default function PawTrail() {
  const [base, setBase] = useState(() => ({
    top: Math.random() * 50 + 10,
    left: Math.random() * 50 + 10,
    direction: DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)],
  }));

  // 歩数　フェードが終わったら出発地の切り替え
  useEffect(() => {
    const totalDuration = (STEPS * STEP_DELAY + FADE_DURATION) * 1000;
    const timeout = setTimeout(() => {
      setBase({
        top: Math.random() * 50 + 10,
        left: Math.random() * 50 + 10,
        direction: DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)],
      });
    }, totalDuration);
    return () => clearTimeout(timeout);
  }, [base]);

  //　足跡間隔
  const footprints = Array.from({ length: STEPS }, (_, i) => ({
    top:
      base.direction.mainAxis === "top"
        ? base.top + i * 8 * base.direction.mainSign
        : base.top + (i % 2 === 0 ? 0 : 3),
    left:
      base.direction.mainAxis === "left"
        ? base.left + i * 8 * base.direction.mainSign
        : base.left + (i % 2 === 0 ? 0 : 3),
    delay: (STEPS - 1 - i) * STEP_DELAY,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {footprints.map((paw, i) => (
        <Image
          key={`${base.top}-${base.left}-${i}`}
          src="/paw.png"
          alt=""
          width={40}
          height={40}
          className="absolute animate-[pawFade_1.2s_ease-in-out_both]"
          style={{
            top: `${paw.top}%`,
            left: `${paw.left}%`,
            animationDelay: `${paw.delay}s`,
            transform: `rotate(${base.direction.rotate}deg)`,
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
}
