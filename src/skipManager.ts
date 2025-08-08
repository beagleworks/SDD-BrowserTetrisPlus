export function canUseSkip(skipStacks: number): boolean {
  return skipStacks > 0;
}

export function useSkipStack(skipStacks: number): number {
  return Math.max(0, skipStacks - 1);
}

export function recoverSkipStacks(skipStacks: number, linesClearedNow: number): number {
  const recovered = Math.floor(linesClearedNow / 2);
  return Math.min(4, skipStacks + recovered);
}
