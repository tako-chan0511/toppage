// api/track.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: any, res: any) {
  // 1) CORS プリフライトまたは GET リクエストを許可
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS リクエストには 204 返して終わり
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const game = String(req.query.game || '');

    // ① 現在の views を取得
    const { data, error: selErr } = await supabase
      .from('page_views')
      .select('views')
      .eq('game', game)
      .single();

    if (selErr && selErr.code !== 'PGRST116') {
      console.error('Select error:', selErr);
      return res.status(500).json({ error: selErr.message });
    }

    // ② views を +1
    const newViews = (data?.views ?? 0) + 1;

    // ③ upsert して views を更新
    const { error: upErr } = await supabase
      .from('page_views')
      .upsert({ game, views: newViews }, { onConflict: 'game' });

    if (upErr) {
      console.error('Upsert error:', upErr);
      return res.status(500).json({ error: upErr.message });
    }

    return res.status(200).json({ ok: true, views: newViews });
  } catch (e: any) {
    console.error('Handler exception:', e);
    return res.status(500).json({ error: e.message });
  }
}
