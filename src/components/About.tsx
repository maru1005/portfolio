import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className=" bg-amber-50 flex flex-col items-center justify-center gap-6 px-8 md:px-16 py-24"
    >
      <h2 className="text-4xl font-bold flex items-center gap-3">
        About Meow🐾
      </h2>
      <p className="text-base leading-relaxed">
        猫大好きエンジニア(見習い中)。
        <br />
        プログラミングスクール卒業後、個人開発を通して学習を続けています。
      </p>
      <a
        href="https://github.com/maru1005"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Image
          src="/GitHub_Lockup_Black.svg"
          alt="GitHub"
          width={128}
          height={28}
        />
      </a>
    </section>
  );
}
