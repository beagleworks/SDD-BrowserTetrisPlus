interface UiNumbers { score: number; level: number; lines: number; skipStacks: number }

export function updateUiText(doc: { getElementById(id: string): { textContent: string | null } | null }, values: UiNumbers): void {
  const score = doc.getElementById('ui-score');
  const level = doc.getElementById('ui-level');
  const lines = doc.getElementById('ui-lines');
  const skip = doc.getElementById('ui-skip');
  if (score) score.textContent = String(values.score);
  if (level) level.textContent = String(values.level);
  if (lines) lines.textContent = String(values.lines);
  if (skip) skip.textContent = String(values.skipStacks);
}
