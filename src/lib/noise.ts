export function createNoisePosition() {
  let seed = Math.random() * 1000;
  return (i: number, t: number, max: number) => {
    const x = Math.sin(i * 1000 + t * 1000) * 1000;
    const y = Math.cos(i * 1000 + t * 1000) * 1000;
    return (Math.sin(x + y + seed) + 1) * (max / 2);
  };
} 