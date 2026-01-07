// server/api/track.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const query = getQuery(event)
  const game = query.game?.toString()

  if (!game) {
    throw createError({
      statusCode: 400,
      statusMessage: '"game" query parameter is required',
    })
  }

  try {
    // ① 現在の views を取得
    const { data, error: selErr } = await supabase
      .from('page_views')
      .select('views')
      .eq('game', game)
      .single()

    if (selErr && selErr.code !== 'PGRST116') throw selErr

    const currentViews = data ? (data as any).views : 0
    const newViews = currentViews + 1

    // ② upsert して views を更新
    const { error: upErr } = await supabase
      .from('page_views')
      .upsert({ game, views: newViews }, { onConflict: 'game' })

    if (upErr) throw upErr

    return { ok: true, views: newViews }
  } catch (e: any) {
    throw createError({ statusCode: 500, statusMessage: e.message })
  }
})