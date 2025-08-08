export function drawGameField(ctx: CanvasRenderingContext2D, field: number[][]): void {
  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;
  const rows = field.length;
  const cols = field[0]?.length ?? 0;
  if (rows === 0 || cols === 0) return;

  const cellW = width / cols;
  const cellH = height / rows;

  // background
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, width, height);

  // draw filled cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!field[r][c]) continue;
      const x = c * cellW;
      const y = r * cellH;
      ctx.fillStyle = '#4b5563';
      ctx.fillRect(x, y, cellW, cellH);
    }
  }

  // grid border (optional minimal)
  ctx.strokeStyle = '#2a2f3a';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
}
