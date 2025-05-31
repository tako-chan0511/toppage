// api/track.ts
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
      console.error('[track] Missing SUPABASE_URL or SUPABASE_KEY')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const gameParam = req.query.game
    const game = Array.isArray(gameParam)
      ? gameParam[0]
      : (gameParam || '').toString()

    if (!game) {
      console.error('[track] "game" query is missing or empty')
      return res.status(400).json({ error: '"game" query parameter is required' })
    }

    // ① 以前のビュー数を取得
    const { data, error: selError } = await supabase
      .from('page_views')
      .select('views')
      .eq('game', game)
      .single()

    if (selError && (selError.code as string) !== 'PGRST116') {
      console.error('[track] Supabase select error:', selError)
      return res.status(500).json({ error: selError.message })
    }

    const oldViews = data ? data.views : 0
    const newViews = oldViews + 1

    // ② upsert してビュー数を更新
    const { error: upsertError } = await supabase
      .from('page_views')
      .upsert({ game, views: newViews }, { onConflict: 'game' })

    if (upsertError) {
      console.error('[track] Supabase upsert error:', upsertError)
      return res.status(500).json({ error: upsertError.message })
    }

    return res.status(200).json({ ok: true, views: newViews })
  } catch (e: any) {
    console.error('[track] Unexpected error:', e)
    return res
      .status(500)
      .json({ error: e.message || 'Internal server error' })
  }
}
