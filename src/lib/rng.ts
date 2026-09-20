export type Rng = {
  float: () => number
  int: (min: number, max: number) => number
  pick: <T>(items: readonly T[]) => T
}

export function makeRng(seed = Date.now()): Rng {
  let s = (seed >>> 0) || 1
  const float = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 0x100000000
  }
  return {
    float,
    int: (min, max) => min + Math.floor(float() * (max - min + 1)),
    pick: (items) => items[Math.floor(float() * items.length)]!,
  }
}
