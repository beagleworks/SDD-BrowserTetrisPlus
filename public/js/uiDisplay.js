export function updateUiText(doc, values) {
    const score = doc.getElementById('ui-score');
    const level = doc.getElementById('ui-level');
    const lines = doc.getElementById('ui-lines');
    const skip = doc.getElementById('ui-skip');
    if (score)
        score.textContent = String(values.score);
    if (level)
        level.textContent = String(values.level);
    if (lines)
        lines.textContent = String(values.lines);
    if (skip)
        skip.textContent = String(values.skipStacks);
}
//# sourceMappingURL=uiDisplay.js.map