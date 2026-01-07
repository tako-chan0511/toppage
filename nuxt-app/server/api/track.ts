// server/api/track.ts
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
    // ① 現在の views を取得
    const { data, error: selErr } = await supabase
      .from('page_views')
      .select('views')
      .eq('game', game)
      .single();

    if (selErr && selErr.code !== 'PGRST116') {
      console.error('[track] select error:', selErr);
      throw createError({ statusCode: 500, statusMessage: selErr.message });
    }

    const currentViews = data ? (data as any).views : 0;
    const newViews = currentViews + 1;

    // ② upsert して views を更新
    const { error: upErr } = await supabase
      .from('page_views')
      .upsert({ game, views: newViews }, { onConflict: 'game' });

    if (upErr) {
      console.error('[track] upsert error:', upErr);
      throw createError({ statusCode: 500, statusMessage: upErr.message });
    }

    return { ok: true, views: newViews };
  } catch (e: any) {
    console.error('[track] exception:', e);
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});