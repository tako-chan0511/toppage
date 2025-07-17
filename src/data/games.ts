// src/data/games.ts
export interface GameInfo {
  id: string;
  title: string;
  description: string;
  url: string;
  demoUrl?: string;
  repo?: string;
}

export const games: GameInfo[] = [
  {
    id: "Hit&Blow-vue-vercel",
    title: "🔢 HitBlow (Vue3-Vercel)",
    description:
      "PWA対応済：Vue3 + Composition API で実装。スマホ対応。Vercelホスティング",
    url: "https://my-hitblow-game.vercel.app/",
    demoUrl:
      "https://drive.google.com/file/d/1uObWehEEmGL-AdIiG63VRY3qViXoz-LW/view?usp=drive_link",
    repo: "tako-chan0511/my-hitblow-game",
  },
  {
    id: "ai-stat-analist",
    title: "😎 AI統計アナリスト",
    description:
      "PWA対応未：Vercel（e-statとgemini AIのAPI活用）、Vue＋Vite＋Typscriptで実装。",
    url: "https://hara0511ai-stat-analist.vercel.app/",
    demoUrl: "",
    repo: "tako-chan0511/ai-stat-analist",
  },
   {
    id: "jp-politics",
    title: "👩‍🌾 AI政権比較アプリ",
    description:
      "PWA対応未：Vercel＋Upstash（Serverless Redis活用）、Vue＋Vite＋Typscriptで実装。",
    url: "https://hara0511jp-politics.vercel.app/",
    demoUrl: "",
    repo: "tako-chan0511/jp-politics",
  },
   {
    id: "my-recipes",
    title: "🧔‍♀️ 料理レシピアプリ",
    description:
      "PWA対応未：Vercel（Serverless API活用）、Vue＋Vite＋Typscriptで実装。",
    url: "https://hara0511my-recipes.vercel.app/",
    demoUrl: "",
    repo: "tako-chan0511/my-recipes",
  },
   {
    id: "bookmark-manager",
    title: "😎 ブックマーク管理アプリ",
    description:
      "PWA対応済：supabaseクライアント(postgreSQL）+Vercel、Vue＋Vite＋Typscriptで実装。",
    url: "https://hara0511bookmark-manager.vercel.app/",
    demoUrl: "",
    repo: "tako-chan0511/bookmark-manager",
  },
   {
    id: "weather-app",
    title: "🔲 天気予報アプリ",
    description:
      "PWA対応済：Leaflet,OpenWeatherMAP API,LocationIQ API,tone.js,VexFlow活用、Vue＋Vite＋Typscriptで実装。",
    url: "https://hara0511weather-app.vercel.app/",
    demoUrl: "",
    repo: "tako-chan0511/weather-app",
  },
   {
    id: "melodycanvas",
    title: "🔲 Melody Canvasアプリ",
    description:
      "PWA対応未：Piniaストア永続化,tone.js,VexFlow活用、Vue＋Vite＋Typscriptで実装。",
    url: "https://tako-chan0511.github.io/melodycanvas/",
    demoUrl: "",
    repo: "tako-chan0511/melodycanvas",
  },
  {
    id: "luckylotto",
    title: "🔲 ナンバーズ4＆ロト6シミュレーターアプリ",
    description:
      "PWA対応済：Piniaストア永続化、Router、NaiveUI活用、Vue＋Vite＋Typscriptで実装。",
    url: "https://tako-chan0511.github.io/luckylotto/",
    demoUrl: "",
    repo: "tako-chan0511/luckylotto",
  },
 
  {
    id: "cssvisualizer",
    title: "🔲 CSS初心者向け練習アプリ",
    description:
      "PWA対応済：親コンテナ・子要素（BOX,円,TEXT,Image,Button:Vue＋Vite＋Typscriptで実装。",
    url: "https://tako-chan0511.github.io/cssvisualizer/",
    demoUrl: "",
    repo: "tako-chan0511/cssvisualizer",
  },
  {
    id: "Typing Fall",
    title: "🔲 タイピングの練習アプリ",
    description: "PWA対応済：Vue＋Vite＋Typscriptで実装。スマホスワイプ対応。",
    url: "https://tako-chan0511.github.io/typingfall/",
    demoUrl: "",
    repo: "tako-chan0511/typingfall",
  },
  {
    id: "sudoku",
    title: "🔲 数独（ナンプレ、トレーニング付）",
    description:
      "PWA対応済：Vue3 + Composition API で実装。スマホスワイプ対応。",
    url: "https://tako-chan0511.github.io/sudoku/",
    demoUrl: "",
    repo: "tako-chan0511/sudoku",
  },

  {
    id: "Othello-vue",
    title: "⚫⚪ オセロ (Vue3-GithubPages)",
    description: "PWA対応済：Vue3 + Composition API で実装。スマホ対応。",
    url: "https://tako-chan0511.github.io/othello-Vue3-/",
    demoUrl:
      "https://drive.google.com/file/d/1MCbhuUMfMyDDD4RP79uujKie-0vow2AD/view?usp=drive_link",
    repo: "tako-chan0511/othello-Vue3-",
  },
  {
    id: "slidpuzzle-vue3",
    title: "🔲 パズルスライドＮ×Ｍ",
    description:
      "PWA対応済：Vue3 + Composition API で実装。スマホスワイプ対応。",
    url: "https://tako-chan0511.github.io/slidepuzzle/",
    demoUrl: "",
    repo: "tako-chan0511/slidepuzzle",
  },
  {
    id: "matchinggame-vue3",
    title: "🔲 神経衰弱Ｎ×Ｍ",
    description:
      "PWA対応済：Vue3 + Composition API で実装。スマホスワイプ対応。",
    url: "https://tako-chan0511.github.io/matchinggame/",
    demoUrl: "",
    repo: "tako-chan0511/matchinggame",
  },

  {
    id: "Minesweeper-vue",
    title: "💣 マインスイーパ (Vue3-GithubPages)",
    description: "PWA対応済：Vue3 + Composition API で実装。スマホ対応。",
    url: "https://tako-chan0511.github.io/Minesweeper/",
    demoUrl:
      "https://drive.google.com/file/d/1nxwCwWmRVO_pgZrGHYGqGtrnkH6KYeHP/view?usp=drive_link",
    repo: "tako-chan0511/Minesweeper",
  },

  {
    id: "tetris-vue",
    title: "🧩 テトリス (Vue3-GithubPages)",
    description: "PWA対応済：Vue3 + Composition API で実装。スマホ対応。",
    url: "https://tako-chan0511.github.io/tetris/",
    demoUrl:
      "https://drive.google.com/file/d/16bJnDxD-xdq65xgSd18drF7-mZsxkFia/view?usp=drive_link",
    repo: "tako-chan0511/tetris",
  },
  {
    id: "breakout-next",
    title: "🧱 ブロック崩し (Next.js-GithubPages)",
    description: "Next.js + Canvas で書いたブロック崩し。スマホ対応。",
    url: "https://tako-chan0511.github.io/breakout-next/",
    demoUrl:
      "https://drive.google.com/file/d/1esNm0T_3UKjZ-xg664pAslLLUAOfDggW/view?usp=drive_link",
    repo: "tako-chan0511/breakout-next",
  },
  {
    id: "breakout-vue",
    title: "🧱 ブロック崩し (Vue3-GithubPages)",
    description:
      "PWA対応済：Vue3 + Composition API で実装。スマホスワイプ対応。",
    url: "https://tako-chan0511.github.io/breakout/",
    demoUrl:
      "https://drive.google.com/file/d/1SRR_kq2U7pKwWPEBf5kmql7IYfdpSWaa/view?usp=drive_link",
    repo: "tako-chan0511/breakout",
  },
  {
    id: "squared-streamlit(python)",
    title: "🔲 二乗数アプリ (streamlit Comumunity Cloud)",
    description: "streamlit(python)で実装。スマホスワイプ対応。",
    url: "https://squared-cypmgjuwvks8uqqehiuy2p.streamlit.app/",
    demoUrl: "",
    repo: "tako-chan0511/sq2",
  },

  {
    id: "kakezan",
    title: "🔲 二桁の掛け算アプリ",
    description: "PWA対応済：Vue＋Vite＋Typscriptで実装。スマホスワイプ対応。",
    url: "https://tako-chan0511.github.io/kakezan/",
    demoUrl: "",
    repo: "tako-chan0511/kakezan",
  },
  {
    id: "connect4-vue",
    title: "🔴🟡 立体4並べ (Vue3-GithubPages)",
    description: "PWA対応済：Vue3 + Composition API で実装。スマホ対応。",
    url: "https://tako-chan0511.github.io/Connect4/",
    demoUrl:
      "https://drive.google.com/file/d/1SWi0w0t2lVe0Haa5fu5ybc4Em1IG8eTw/view?usp=drive_link",
    repo: "tako-chan0511/connect4",
  },
  {
    id: "Hit&Blow-Next.js-vercel",
    title: "🎯 HitBlow (Next.js-Vercel)",
    description:
      "PWA対応済：Next.js + Canvas で書いたHit&Blow、スマホ対応。Vercelホスティング",
    url: "https://hitblow-next.vercel.app/",
    demoUrl:
      "https://drive.google.com/file/d/1sC0ibWtbrWOFf5E_smbhLwJlOwELRaiC/view?usp=drive_link",
    repo: "tako-chan0511/hitblow-next",
  },
  {
    id: "Solitaire-vue",
    title: "🃏 ソリティア (Vue3-GithubPages)",
    description: "PWA対応済：Vue3 + Composition API で実装。スマホ対応。",
    url: "https://tako-chan0511.github.io/Solitaire/",
    demoUrl:
      "https://drive.google.com/file/d/1i7qQhH2vLv5Ru6CUfvaNPWwpRYCHanz4/view?usp=drive_link",
    repo: "tako-chan0511/Solitaire",
  },

  // …他のゲームも同様に
];
