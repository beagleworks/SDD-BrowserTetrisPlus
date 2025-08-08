function easeOutDecay(t) {
    // Ease-out curve for a smoother, lingering highlight then quick fade
    const clamped = Math.max(0, Math.min(1, t));
    const inv = 1 - clamped;
    // cubic ease-out decay of intensity
    return inv * inv * inv; // (1 - t)^3
}
export function planLineClearEffect(totalRows, clearedRows, opts) {
    const frames = [];
    const frameCount = Math.max(1, Math.floor((opts.durationMs / 1000) * opts.fps));
    for (let i = 0; i < frameCount; i++) {
        const t = i / (frameCount - 1 || 1);
        const intensity = easeOutDecay(t);
        frames.push(clearedRows.map(rowIndex => ({ rowIndex, intensity })));
    }
    return frames;
}
function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}
export function drawLineClearOverlay(ctx, rows, cols, frame, options) {
    const { width, height } = ctx.canvas;
    const cellH = height / rows;
    const color = options?.colorHex ?? '#22d3ee'; // accent cyan
    const rgb = hexToRgb(color) ?? { r: 255, g: 255, b: 255 };
    const maxAlpha = options?.maxAlpha ?? 0.6;
    frame.forEach(({ rowIndex, intensity }) => {
        const alpha = Math.max(0, Math.min(1, intensity)) * maxAlpha;
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.fillRect(0, rowIndex * cellH, width, cellH);
    });
}
//# sourceMappingURL=effects.js.map