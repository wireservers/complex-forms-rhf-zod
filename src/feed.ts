
export type Point = { t: number; v: number }

export function startFeed(cb: (p: Point) => void) {
  let t = Date.now()
  const id = setInterval(() => {
    t += 1000
    const noise = (Math.random() - 0.5) * 10
    const v = 50 + 10 * Math.sin(t / 5000) + noise
    cb({ t, v: Math.round(v * 100) / 100 })
  }, 1000)
  return () => clearInterval(id)
}
