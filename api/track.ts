// api/track.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// 環境変数周りをログに出す
console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key:', process.env.SUPABASE_KEY?.slice(0, 4) + '…');

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('Incoming request:', req.method, req.url, req.query);
  try {
    const url = (req.query.url as string) || '/';
    const { data, error } = await supabase
      .from('page_views')
      .upsert({ url, views: 1 }, { onConflict: ['url'] })
      .increment('views', 1);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }
    console.log('Upsert result:', data);
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error('Handler exception:', e);
    return res.status(500).json({ error: e.stack || e.message });
  }
}
