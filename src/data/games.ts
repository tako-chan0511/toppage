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
    id: 'breakout-next',
    title: 'ブロック崩し (Next.js-GithubPages)',
    description: 'Next.js + Canvas で書いたブロック崩し。スマホはスワイプ対応。',
    url: 'https://tako-chan0511.github.io/breakout-next/',
    demoUrl: 'https://drive.google.com/file/d/1youaV03_eecjPzQaY9HxnKazM8UFpVrV/view',
    repo: 'tako-chan0511/breakout-next'
  },
  {
    id: 'breakout-vue',
    title: 'ブロック崩し (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/breakout/',
    demoUrl: 'https://drive.google.com/file/d/1BIAL0YsS0tWHkNhfbCw-Cqalbt6m1leW/view',
    repo: 'tako-chan0511/breakout'
  },
  {
    id: 'tetris-vue',
    title: 'テトリス (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/tetris/',
    demoUrl: 'https://drive.google.com/file/d/1T-V-hY65cHzHvnpUD_am2KOsY8vDlbjV/view',
    repo: 'tako-chan0511/tetris'
  },
  {
    id: 'connect4-vue',
    title: '立体4並べ (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/Connect4/',
    demoUrl: 'https://drive.google.com/file/d/14pFa1Q_6o6J19YXCn5CAmGRUWtVwDAdQ/view',
    repo: 'tako-chan0511/connect4'
  },
  {
    id: 'Minesweeper-vue',
    title: 'マインスイーパ (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/Minesweeper/',
    demoUrl: 'https://drive.google.com/file/d/1bu8L5l3qU91g88Qg4eIthXho_XqQfkB3/view',
    repo: 'tako-chan0511/Minesweeper'
  },
  {
    id: 'Solitaire-vue',
    title: 'ソリティア (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/Solitaire/',
    demoUrl: 'https://drive.google.com/file/d/1-8ypqmORD3ZB_Dy9BkXsos5LhLVnSnjt/view',
    repo: 'tako-chan0511/Solitaire'
  },
  {
    id: 'Othello-vue',
    title: 'オセロ (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/othello-Vue3-/',
    demoUrl: 'https://drive.google.com/file/d/1WVvE3w3qzSa9OxkOvrafiC-Ds1zuzcEm/view',
    repo: 'tako-chan0511/othello-Vue3-'
  },
   {
    id: 'Hit&Blow-vue-vercel',
    title: 'HitBlow (Vue3-Vercel)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。Vercelホスティング',
    url: 'https://my-hitblow-game.vercel.app/',
    demoUrl: 'https://drive.google.com/file/d/1cUvbhb7TEhYtJ-MTO7Mwu0UU8dkA7CfR/view',
    repo: 'tako-chan0511/my-hitblow-game'
  },
  {
    id: 'Hit&Blow-Next.js-vercel',
    title: 'HitBlow (Next.js-Vercel)',
    description: 'Next.js + Canvas で書いたHit&Blow、スマホスワイプ対応。Vercelホスティング',
    url: 'https://hitblow-next.vercel.app/',
    demoUrl: 'https://drive.google.com/file/d/1YPU8WxEzDPP4An2ibMwICb-eI05tB_cO/view',
    repo: 'tako-chan0511/hitblow-next'
  },
  // …他のゲームも同様に
];
