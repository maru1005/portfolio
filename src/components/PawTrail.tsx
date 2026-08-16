// src/components/PawTrail.tsx
// 背景　足跡

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STEP_DELAY = 1; // 一歩ごとの時間差(秒)
const STEPS = 8; // 足跡の数
const FADE_DURATION = 1.2; // 1個のフェード時間(秒)
const STEP_DISTANCE = 8; // 1歩の移動量

const DIRECTIONS = [
  { mainAxis: "top", mainSign: 1, rotate: 0 }, //　上から下
  { mainAxis: "top", mainSign: -1, rotate: 180 }, //　下から上
  { mainAxis: "left", mainSign: 1, rotate: -90 }, //　左から右
  { mainAxis: "left", mainSign: -1, rotate: 90 }, //　右から左
];

function getRandomBase() {
  const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  const maxMove = STEP_DISTANCE * (STEPS - 1);
  return {
    top:
      direction.mainAxis === "top"
        ? direction.mainSign === 1
          ? Math.random() * (90 - maxMove) + 10
          : Math.random() * (90 - maxMove) + maxMove
        : Math.random() * 50 + 10,
    left:
      direction.mainAxis === "left"
        ? direction.mainSign === 1
          ? Math.random() * (90 - maxMove) + 10
          : Math.random() * (90 - maxMove) + maxMove
        : Math.random() * 50 + 10,
    direction,
  };
}

// random出発地
export default function PawTrail() {
  const [base, setBase] = useState(getRandomBase);

  // 歩数　フェードが終わったら出発地の切り替え
  useEffect(() => {
    const totalDuration = (STEPS * STEP_DELAY + FADE_DURATION) * 1000;
    const timeout = setTimeout(() => {
      setBase(getRandomBase);
    }, totalDuration);
    return () => clearTimeout(timeout);
  }, [base]);

  //　足跡　間隔方向
  const footprints = Array.from({ length: STEPS }, (_, i) => ({
    top:
      base.direction.mainAxis === "top" // 縦の時
        ? base.top + i * STEP_DISTANCE * base.direction.mainSign
        : base.top + (i % 2 === 0 ? 0 : 3),
    left:
      base.direction.mainAxis === "left" // 横の時
        ? base.left + i * STEP_DISTANCE * base.direction.mainSign
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
