import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-amber-50 flex flex-col  items-center justify-center md:flex-row"
    >
      <Image
        src="/luluthecat.png"
        alt="Lulu"
        width={600}
        height={600}
        className="w-48  h-auto md:w-150 relative z-10"
      />
      <div className="flex flex-col items-center mt-4 ml-0 md:mt-0 md:ml-0 animate-float">
        <span className="text-lg">{"I'm Lulu"}</span>
        <span className="text-4xl font-bold">Lulu the Cat🐾</span>
      </div>
    </section>
  );
}
