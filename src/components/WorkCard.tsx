// src/components/WorkCatd.tsx
//  Works　カード表示だけ

type WorkCardProps = {
  name: string;
  color: string;
};

export default function WorkCard({ name, color }: WorkCardProps) {
  return (
    <div className="shrink-0 w-50 bg-white border border-stone-200 rounded-2xl p-4 cursor-pointer">
      <div
        className="w-full aspect-4/3 rounded-xl mb-3 flex items-center justify-center text-white text-sm font-semibold"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
      <p className="text-[15px] font-bold text-center m-0">{name}</p>
    </div>
  );
}
