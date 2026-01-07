// server/api/get-count.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default defineEventHandler(async (event) => {
  // Nuxt 3 のヘルパーでクエリパラメータを取得
  const query = getQuery(event);
  const game = query.game?.toString();
  const field = (query.field?.toString() || 'views') as 'views' | 'likes';

  if (!game) {
    throw createError({
      statusCode: 400,
      statusMessage: '"game" query parameter is required',
    });
  }

  if (field !== 'views' && field !== 'likes') {
    throw createError({
      statusCode: 400,
      statusMessage: '"field" must be either "views" or "likes"',
    });
  }

  try {
    const { data, error } = await supabase
      .from('page_views')
      .select(field)
      .eq('game', game)
      .single();

    // PGRST116 は「データが見つからない」エラー。その場合は 0 を返す
    if (error && error.code !== 'PGRST116') {
      console.error('[get-count] select error:', error);
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    const current = data ? (data as any)[field] : 0;
    return { count: current };
  } catch (e: any) {
    console.error('[get-count] Unexpected error:', e);
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Internal server error',
    });
  }
});