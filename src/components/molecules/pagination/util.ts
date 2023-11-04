export const displayPage = 0
// １ページに表示する件数
export const pageLimit = 20
// ページ遷移時にトップにスクロールする
export const moveToTop = () => {
  const duration = 200 // 移動速度（1秒で終了）
  const interval = 20 // 0.025秒ごとに移動
  const step = -window.pageYOffset / Math.ceil(duration / interval) // 1回に移動する距離
  const timer = setInterval(() => {
    window.scrollBy(0, step) // スクロール位置を移動
    if (window.pageYOffset <= 0) {
      clearInterval(timer)
    }
  }, interval)
}
