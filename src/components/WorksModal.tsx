// src/components/WorksModal.tsx
// カードクリック後モーダル表示

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Work } from "../data/works";

type WorksModalProps = {
  work: Work | null;
  onClose: () => void;
};

export default function WorksModal({ work, onClose }: WorksModalProps) {
  if (!work) return null;
  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center p-6 z-10 overflow-y-auto"
      onClick={onClose}
    >
      <ModalContent work={work} onClose={onClose} />
    </div>
  );
}

function ModalContent({ work, onClose }: { work: Work; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasVideo = !!work.video;
  const hasImages = !!work.images && work.images.length > 0;

  // イメージ　次
  const handleNext = () => {
    if (!work?.images) return;
    setCurrentIndex((prev) => Math.min(prev + 1, work.images!.length - 1));
  };

  // イメージ　前
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      className="bg-white rounded-2xl w-[80vw] h-[80vh] overflow-y-auto p-7 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        aria-label="閉じる"
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-50 text-stone-500"
      >
        ✕
      </button>

      {hasVideo ? (
        <video
          src={work.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-video rounded-xl mb-4 object-cover"
        />
      ) : work.images ? (
        <div className="relative mb-4">
          <Image
            src={work.images[currentIndex]}
            alt={work.name}
            width={640}
            height={360}
            className="w-full aspect-video rounded-xl mb-4 object-cover"
          />
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              aria-label="前の画像"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {currentIndex < work.images!.length - 1 && (
            <button
              onClick={handleNext}
              aria-label="次の画像"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      ) : (
        <div
          className="w-full aspect-video rounded-xl mb-4 flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: work.color }}
        >
          {work.name}
        </div>
      )}
      <p className="text-xl font-bold mb-2">{work.name}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {work.tech.map((t) => (
          <span
            key={t}
            className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="text-sm text-stone-500 leading-relaxed">{work.desc}</p>
    </div>
  );
}
