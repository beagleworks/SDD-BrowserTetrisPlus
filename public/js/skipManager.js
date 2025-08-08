export function canUseSkip(skipStacks) {
    return skipStacks > 0;
}
export function useSkipStack(skipStacks) {
    return Math.max(0, skipStacks - 1);
}
export function recoverSkipStacks(skipStacks, linesClearedNow) {
    const recovered = Math.floor(linesClearedNow / 2);
    return Math.min(4, skipStacks + recovered);
}
//# sourceMappingURL=skipManager.js.map