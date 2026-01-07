// server/api/get-count.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // モジュール提供のクライアントを取得（手動の createClient は不要になります）
  const supabase = await serverSupabaseClient(event)

  const query = getQuery(event)
  const game = query.game?.toString()
  const field = (query.field?.toString() || 'views') as 'views' | 'likes'

  if (!game) {
    throw createError({
      statusCode: 400,
      statusMessage: '"game" query parameter is required',
    });
  }

  try {
    const { data, error } = await supabase
      .from('page_views')
      .select(field)
      .eq('game', game)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }

    const current = data ? (data as any)[field] : 0
    return { count: current }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message || 'Internal server error',
    })
  }
})