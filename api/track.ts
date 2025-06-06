// api/track.ts
import 'dotenv/config';
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
    const game = Array.isArray(gameParam) ? gameParam[0] : (gameParam || '').toString();

    if (!game) {
      return res.status(400).json({ error: '"game" query parameter is required' });
    }

    // ① 現在のviewsを取得
    const { data, error: selErr } = await supabase
      .from('page_views')
      .select('views')
      .eq('game', game)
      .single();

    if (selErr && selErr.code !== 'PGRST116') {
      console.error('[track] select error:', selErr);
      return res.status(500).json({ error: selErr.message });
    }

    const currentViews = data ? (data as any).views : 0;
    const newViews = currentViews + 1;

    // ② upsert して views を更新（なければ新規挿入）
    const { error: upErr } = await supabase
      .from('page_views')
      .upsert({ game, views: newViews }, { onConflict: 'game' });

    if (upErr) {
      console.error('[track] upsert error:', upErr);
      return res.status(500).json({ error: upErr.message });
    }

    return res.status(200).json({ ok: true, views: newViews });
  } catch (e: any) {
    console.error('[track] exception:', e);
    return res.status(500).json({ error: e.message });
  }
}
