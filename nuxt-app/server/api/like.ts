// server/api/like.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const game = query.game?.toString();

  if (!game) {
    throw createError({
      statusCode: 400,
      statusMessage: '"game" query parameter is required',
    });
  }

  try {
    // ① 現在の likes を取得
    const { data, error: selErr } = await supabase
      .from('page_views')
      .select('likes')
      .eq('game', game)
      .single();

    if (selErr && selErr.code !== 'PGRST116') {
      console.error('[like] select error:', selErr);
      throw createError({ statusCode: 500, statusMessage: selErr.message });
    }

    const currentLikes = data ? (data as any).likes : 0;
    const newLikes = currentLikes + 1;

    // ② upsert して likes を更新
    const { error: upErr } = await supabase
      .from('page_views')
      .upsert({ game, likes: newLikes }, { onConflict: 'game' });

    if (upErr) {
      console.error('[like] upsert error:', upErr);
      throw createError({ statusCode: 500, statusMessage: upErr.message });
    }

    return { ok: true, likes: newLikes };
  } catch (e: any) {
    console.error('[like] exception:', e);
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});