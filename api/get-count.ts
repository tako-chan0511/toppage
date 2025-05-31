// api/get-count.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const game = String(req.query.game || '');
    const field = String(req.query.field || 'views'); // 'views' or 'likes'

    const { data, error } = await supabase
      .from('page_views')
      .select(field)
      .eq('game', game)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Select error:', error);
      return res.status(500).json({ error: error.message });
    }

    const current = (data as any)?.[field] ?? 0;
    return res.status(200).json({ count: current });
  } catch (e: any) {
    console.error('Handler exception:', e);
    return res.status(500).json({ error: e.message });
  }
}
