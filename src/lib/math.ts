export function parseAnswer(raw: string): number | null {
  const s = raw.trim().replace(',', '.').replaceAll(' ', '')
  if (!s) return null
  const frac = /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/.exec(s)
  if (frac) {
    const b = Number(frac[2])
    if (b === 0) return null
    return Number(frac[1]) / b
  }
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

export function closeEnough(a: number, b: number, tolerance = 0.01) {
  return Math.abs(a - b) <= tolerance
}
