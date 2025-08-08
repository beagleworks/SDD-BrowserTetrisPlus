export function addScore(currentScore, linesClearedNow) {
    const award = linesClearedNow === 1 ? 100
        : linesClearedNow === 2 ? 300
            : linesClearedNow === 3 ? 500
                : linesClearedNow === 4 ? 800
                    : 0;
    return currentScore + award;
}
export function addLinesCleared(totalLines, linesClearedNow) {
    return totalLines + Math.max(0, linesClearedNow);
}
export function updateLevel(currentLevel, totalLines) {
    const newLevel = Math.floor(totalLines / 10) + 1;
    return Math.max(currentLevel, newLevel);
}
//# sourceMappingURL=scoreManager.js.map