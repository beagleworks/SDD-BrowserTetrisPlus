import { rotateShapeTimes } from './rotation.js';
export function drawGameField(ctx, field) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const rows = field.length;
    const cols = field[0]?.length ?? 0;
    if (rows === 0 || cols === 0)
        return;
    const cellW = width / cols;
    const cellH = height / rows;
    // background
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, width, height);
    // draw filled cells
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!field[r][c])
                continue;
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
export function drawCurrentBlock(ctx, fieldRows, fieldCols, block, x, y) {
    const { width, height } = ctx.canvas;
    const cellW = width / fieldCols;
    const cellH = height / fieldRows;
    const shape = rotateShapeTimes(block.shape, (block.rotation ?? 0) % 4);
    ctx.fillStyle = block.color ?? '#9ca3af';
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c])
                continue;
            const px = (x + c) * cellW;
            const py = (y + r) * cellH;
            ctx.fillRect(px, py, cellW, cellH);
        }
    }
}
export function drawNextBlock(ctx, block) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    // clear background (no border)
    ctx.clearRect(0, 0, width, height);
    // Use a fixed preview grid (4x4) so all pieces share the same cell size
    const gridCols = 4;
    const gridRows = 4;
    const pad = 4;
    const cell = Math.min(Math.floor((width - pad * 2) / gridCols), Math.floor((height - pad * 2) / gridRows));
    // Center the 4x4 grid in the canvas
    const contentW = cell * gridCols;
    const contentH = cell * gridRows;
    const gridOffsetX = Math.floor((width - contentW) / 2);
    const gridOffsetY = Math.floor((height - contentH) / 2);
    // Center the shape within the 4x4 grid
    const shape = block.shape;
    const rows = shape.length;
    const cols = shape[0]?.length ?? 0;
    const offsetCols = Math.floor((gridCols - cols) / 2);
    const offsetRows = Math.floor((gridRows - rows) / 2);
    const originX = gridOffsetX + offsetCols * cell;
    const originY = gridOffsetY + offsetRows * cell;
    ctx.fillStyle = block.color ?? '#9ca3af';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!shape[r][c])
                continue;
            const x = originX + c * cell;
            const y = originY + r * cell;
            ctx.fillRect(x, y, cell, cell);
        }
    }
}
export function drawPauseScreen(ctx) {
    const { width, height } = ctx.canvas;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, width, height);
}
export function drawGameOver(ctx, finalScore) {
    const { width, height } = ctx.canvas;
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, width, height);
}
//# sourceMappingURL=renderer.js.map