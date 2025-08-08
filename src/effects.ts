export interface LineEffectFrame {
  rowIndex: number;
  intensity: number; // 0..1
}

export interface EffectPlanOptions {
  durationMs: number;
  fps: number;
}

export function planLineClearEffect(totalRows: number, clearedRows: number[], opts: EffectPlanOptions): LineEffectFrame[][] {
  const frames: LineEffectFrame[][] = [];
  const frameCount = Math.max(1, Math.floor((opts.durationMs / 1000) * opts.fps));
  for (let i = 0; i < frameCount; i++) {
    const t = i / (frameCount - 1 || 1);
    const intensity = 1 - t; // simple linear fade
    frames.push(clearedRows.map(rowIndex => ({ rowIndex, intensity })));
  }
  return frames;
}

export function drawLineClearOverlay(
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  frame: LineEffectFrame[]
): void {
  const { width, height } = ctx.canvas;
  const cellH = height / rows;
  // overlay color with alpha based on intensity
  frame.forEach(({ rowIndex, intensity }) => {
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, intensity)) * 0.6})`;
    ctx.fillRect(0, rowIndex * cellH, width, cellH);
  });
}
