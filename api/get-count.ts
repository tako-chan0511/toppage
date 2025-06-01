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
  // 例：CORS ヘッダー
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
    // 環境変数チェック
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      console.error('[get-count] Missing SUPABASE_URL or SUPABASE_KEY')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // クエリの取り出し（例：game と field）
    const gameParam = req.query.game
    const fieldParam = req.query.field

    const game = Array.isArray(gameParam)
      ? gameParam[0]
      : (gameParam || '').toString()
    const field = Array.isArray(fieldParam)
      ? fieldParam[0]
      : (fieldParam || 'views').toString()

    if (!game) {
      console.error('[get-count] "game" query is missing or empty')
      return res
        .status(400)
        .json({ error: '"game" query parameter is required' })
    }

    if (field !== 'views' && field !== 'likes') {
      console.error('[get-count] "field" query is invalid:', field)
      return res
        .status(400)
        .json({ error: '"field" must be either "views" or "likes"' })
    }

    // Supabase からデータを取得
    const { data, error } = await supabase
      .from('page_views')
      .select(field)
      .eq('game', game)
      .single()

    // レコードがなければ error.code === 'PGRST116' → 0 と扱う
    if (error && (error.code as string) !== 'PGRST116') {
      console.error('[get-count] Supabase select error:', error)
      return res.status(500).json({ error: error.message })
    }

    const currentCount = data ? (data as any)[field] : 0
    return res.status(200).json({ count: currentCount })
  } catch (e: any) {
    console.error('[get-count] Unexpected error:', e)
    return res
      .status(500)
      .json({ error: e.message || 'Internal server error' })
  }
}
