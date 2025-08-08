export function addScore(currentScore: number, linesClearedNow: number): number {
  const award = linesClearedNow === 1 ? 100
    : linesClearedNow === 2 ? 300
    : linesClearedNow === 3 ? 500
    : linesClearedNow === 4 ? 800
    : 0;
  return currentScore + award;
}

export function addLinesCleared(totalLines: number, linesClearedNow: number): number {
  return totalLines + Math.max(0, linesClearedNow);
}

export function updateLevel(currentLevel: number, totalLines: number): number {
  const newLevel = Math.floor(totalLines / 10) + 1;
  return Math.max(currentLevel, newLevel);
}
