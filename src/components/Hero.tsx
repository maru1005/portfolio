import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-amber-50 flex flex-row items-center justify-center"
    >
      <Image src="/luluthecat.png" alt="Lulu" width={400} height={400} />
      <div className="flex flex-col items-center ml-4 animate-float">
        <span className="text-lg">{"I'm Lulu"}</span>
        <span className="text-3xl font-bold">Lulu the Cat🐾</span>
      </div>
    </section>
  );
}
