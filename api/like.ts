// api/like.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
)

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      console.error('[like] Missing SUPABASE_URL or SUPABASE_KEY')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const gameParam = req.query.game
    const game = Array.isArray(gameParam)
      ? gameParam[0]
      : (gameParam || '').toString()

    if (!game) {
      console.error('[like] "game" query is missing or empty')
      return res
        .status(400)
        .json({ error: '"game" query parameter is required' })
    }

    // ① 現在のいいね数を取得
    const { data, error: selError } = await supabase
      .from('page_views')
      .select('likes')
      .eq('game', game)
      .single()

    if (selError && (selError.code as string) !== 'PGRST116') {
      console.error('[like] Supabase select error:', selError)
      return res.status(500).json({ error: selError.message })
    }

    const oldLikes = data ? data.likes : 0
    const newLikes = oldLikes + 1

    // ② upsert していいね数を更新
    const { error: upsertError } = await supabase
      .from('page_views')
      .upsert({ game, likes: newLikes }, { onConflict: 'game' })

    if (upsertError) {
      console.error('[like] Supabase upsert error:', upsertError)
      return res.status(500).json({ error: upsertError.message })
    }

    return res.status(200).json({ ok: true, likes: newLikes })
  } catch (e: any) {
    console.error('[like] Unexpected error:', e)
    return res
      .status(500)
      .json({ error: e.message || 'Internal server error' })
  }
}
