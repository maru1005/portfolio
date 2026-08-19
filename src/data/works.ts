// src/data/works.ts
// カード内容

export type Work = {
  name: string;
  color: string;
  tech: string[];
  desc: string;
  image?: string;
  images?: string[];
  video?: string;
  orientation?: "portrait" | "landscape";
  github: string;
  demo?: string;
};

export const works: Work[] = [
  {
    name: "デモトレ",
    color: "#3a3a3a",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase",
      "Go 1.25",
      "Gin",
      "GORM",
      "OpenAI API",
      "CoinGecko API",
    ],
    desc: "個人でLLM・RAGに挑戦したくて開発した仮想通貨デモトレアプリ。バックエンドはGoに初挑戦し、実際の資金を使わない取引練習ツールとして設計。",
    image: "/works/demo-1.png",
    images: ["/works/demo-1.png", "/works/demo-2.png", "/works/demo-3.png"],
    github: "https://github.com/maru1005/demo-traid-app",
  },
  {
    name: "MeowLingo",
    color: "#c9c9c9",
    tech: [
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "OpenAI API",
      "Firebase",
      "Next.js 16",
      "React 18",
      "Zustand",
      "Tailwind v4",
    ],
    desc: "LLM担当としてチーム開発に参加。個人開発でカテゴリ拡張・プロンプト改善・リファクタリングを実施。",
    images: [],
    github: "https://github.com/maru1005/Meow-Lingo",
  },
  {
    name: "PawType",
    color: "#C4845A",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Supabase",
      "Zustand",
      "Zod",
      "React Hook Form",
    ],
    desc: "Next.jsのおさらいとして開発したエンジニア用語タイピングゲーム。バージョン2では、コードの穴埋め問題を解きながら実装を学べるモードを追加予定。",
    images: [],
    video: "/works/pawtype-demo.mp4",
    github: "https://github.com/maru1005/typeforge",
  },
  {
    name: "にゃいんスイーパー",
    color: "#7a8b74",
    tech: [
      "Go 1.26",
      "Gin",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
    ],
    desc: "Go学習を兼ねて作った猫テーマのマインスイーパー。row・col の扱いやゲームロジックの実装を通じて、Goの基礎をしっかり身につけた。",
    image: "/works/nyain-2.png",
    images: [],
    video: "/works/nyain-sweeper-demo.mp4",
    orientation: "portrait",
    github: "https://github.com/maru1005/nyain-sweeper",
    demo: "https://nyain-sweeper.vercel.app/",
  },
];
