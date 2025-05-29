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
    id: 'Hit&Blow-vue-vercel',
    title: '🔢 HitBlow (Vue3-Vercel)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。Vercelホスティング',
    url: 'https://my-hitblow-game.vercel.app/',
    demoUrl: 'https://drive.google.com/file/d/1uObWehEEmGL-AdIiG63VRY3qViXoz-LW/view?usp=drive_link',
    repo: 'tako-chan0511/my-hitblow-game',
  },
  {
    id: 'Hit&Blow-Next.js-vercel',
    title: '🎯 HitBlow (Next.js-Vercel)',
    description: 'Next.js + Canvas で書いたHit&Blow、スマホスワイプ対応。Vercelホスティング',
    url: 'https://hitblow-next.vercel.app/',
    demoUrl: 'https://drive.google.com/file/d/1sC0ibWtbrWOFf5E_smbhLwJlOwELRaiC/view?usp=drive_link',
    repo: 'tako-chan0511/hitblow-next',
  },
    {
    id: 'Othello-vue',
    title: '⚫⚪ オセロ (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/othello-Vue3-/',
    demoUrl: 'https://drive.google.com/file/d/1MCbhuUMfMyDDD4RP79uujKie-0vow2AD/view?usp=drive_link',
    repo: 'tako-chan0511/othello-Vue3-',
  },
    {
    id: 'Solitaire-vue',
    title: '🃏 ソリティア (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/Solitaire/',
    demoUrl: 'https://drive.google.com/file/d/1i7qQhH2vLv5Ru6CUfvaNPWwpRYCHanz4/view?usp=drive_link',
    repo: 'tako-chan0511/Solitaire',
  },
    {
    id: 'Minesweeper-vue',
    title: '💣 マインスイーパ (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/Minesweeper/',
    demoUrl: 'https://drive.google.com/file/d/1nxwCwWmRVO_pgZrGHYGqGtrnkH6KYeHP/view?usp=drive_link',
    repo: 'tako-chan0511/Minesweeper',
  },
  {
    id: 'connect4-vue',
    title: '🔴🟡 立体4並べ (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/Connect4/',
    demoUrl: 'https://drive.google.com/file/d/1SWi0w0t2lVe0Haa5fu5ybc4Em1IG8eTw/view?usp=drive_link',
    repo: 'tako-chan0511/connect4',
  },
  {
    id: 'tetris-vue',
    title: '🧩 テトリス (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/tetris/',
    demoUrl: 'https://drive.google.com/file/d/16bJnDxD-xdq65xgSd18drF7-mZsxkFia/view?usp=drive_link',
    repo: 'tako-chan0511/tetris',
  },
  {
    id: 'breakout-next',
    title: '🧱 ブロック崩し (Next.js-GithubPages)',
    description: 'Next.js + Canvas で書いたブロック崩し。スマホはスワイプ対応。',
    url: 'https://tako-chan0511.github.io/breakout-next/',
    demoUrl: 'https://drive.google.com/file/d/1esNm0T_3UKjZ-xg664pAslLLUAOfDggW/view?usp=drive_link',
    repo: 'tako-chan0511/breakout-next',
  },
  {
    id: 'breakout-vue',
    title: '🧱 ブロック崩し (Vue3-GithubPages)',
    description: 'Vue3 + Composition API で実装。スマホスワイプ対応。',
    url: 'https://tako-chan0511.github.io/breakout/',
    demoUrl: 'https://drive.google.com/file/d/1SRR_kq2U7pKwWPEBf5kmql7IYfdpSWaa/view?usp=drive_link',
    repo: 'tako-chan0511/breakout',
  },
  


  // …他のゲームも同様に
];
