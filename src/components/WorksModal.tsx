// src/components/WorksModal.tsx
// カードクリック後モーダル表示

import { Work } from "../data/works";

type WorksModalProps = {
  work: Work | null;
  onClose: () => void;
};

export default function WorksModal({ work, onClose }: WorksModalProps) {
  if (!work) return null;
  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center p-6 z-10"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[84vh] overflow-y-auto p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-50 text-stone-500"
        >
          ✕
        </button>
        <div
          className="w-full aspect-video rounded-xl mb-4 flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: work.color }}
        >
          {work.name}
        </div>
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
    </div>
  );
}
