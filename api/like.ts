// api/like.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: any, res: any) {
  try {
    const game = String(req.query.game || '');
    const { data, error: selErr } = await supabase
      .from('page_views')
      .select('count')
      .eq('game', game)
      .single();

    if (selErr && selErr.code !== 'PGRST116') {
      console.error('Select error:', selErr);
      return res.status(500).json({ error: selErr.message });
    }

    const current = data?.count ?? 0;
    const newCount = current + 1;

    const { error: upErr } = await supabase
      .from('page_views')
      .upsert({ game, count: newCount }, { onConflict: 'game' });

    if (upErr) {
      console.error('Upsert error:', upErr);
      return res.status(500).json({ error: upErr.message });
    }

    return res.status(200).json({ ok: true, count: newCount });
  } catch (e: any) {
    console.error('Handler exception:', e);
    return res.status(500).json({ error: e.message });
  }
}
