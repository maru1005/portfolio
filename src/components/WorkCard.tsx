// src/components/WorkCatd.tsx
//  Works　カード表示だけ

import Image from "next/image";

type WorkCardProps = {
  name: string;
  color: string;
  image?: string;
};

export default function WorkCard({ name, color, image }: WorkCardProps) {
  return (
    <div className="shrink-0 w-80 bg-white border border-stone-200 rounded-2xl p-4 cursor-pointer">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={320}
          height={240}
          className="w-full aspect-4/3 rounded-xl object-cover"
        />
      ) : (
        <div
          className="w-full aspect-4/3 rounded-xl mb-3 flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: color }}
        >
          {name}
        </div>
      )}
      <p className="text-[15px] font-bold text-center m-0">{name}</p>
    </div>
  );
}
