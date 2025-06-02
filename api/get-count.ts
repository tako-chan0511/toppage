// api/get-count.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: any, res: any) {
  // ── CORS 設定 ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const gameParam = req.query.game;
    const fieldParam = req.query.field;

    const game = Array.isArray(gameParam) ? gameParam[0] : (gameParam || '').toString();
    const field = Array.isArray(fieldParam) ? fieldParam[0] : (fieldParam || 'views').toString();

    if (!game) {
      return res.status(400).json({ error: '"game" query parameter is required' });
    }
    if (field !== 'views' && field !== 'likes') {
      return res.status(400).json({ error: '"field" must be either "views" or "likes"' });
    }

    // page_views テーブルを想定し、"views" か "likes" カラムを取得
    const { data, error } = await supabase
      .from('page_views')
      .select(field)
      .eq('game', game)
      .single();

    if (error && (error.code as string) !== 'PGRST116') {
      console.error('[get-count] select error:', error);
      return res.status(500).json({ error: error.message });
    }

    const current = data ? (data as any)[field] : 0;
    return res.status(200).json({ count: current });
  } catch (e: any) {
    console.error('[get-count] Unexpected error:', e);
    return res.status(500).json({ error: e.message || 'Internal server error' });
  }
}
