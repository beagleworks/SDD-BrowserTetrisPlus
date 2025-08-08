const GRID_COLS = 10;
const GRID_ROWS = 20;

const FIELD_BG = "#111827"; // dark background (8.3)
const GRID_COLOR = "#2a2f3a"; // subtle grid/border (8.2)

function getCanvas(): HTMLCanvasElement {
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error("Canvas element #game-canvas not found");
  }
  return canvas;
}

function sizeCanvasForGrid(canvas: HTMLCanvasElement) {
  // Make the internal pixel buffer match the CSS size to keep crisp lines
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  const desiredWidthCss = rect.width; // preserve CSS-defined width
  const cellSizeCss = Math.floor(desiredWidthCss / GRID_COLS);
  const widthCss = cellSizeCss * GRID_COLS;
  const heightCss = cellSizeCss * GRID_ROWS;

  canvas.style.width = `${widthCss}px`;
  canvas.style.height = `${heightCss}px`;

  canvas.width = Math.floor(widthCss * dpr);
  canvas.height = Math.floor(heightCss * dpr);
}

function drawPlayfieldGrid(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  ctx.reset();
  ctx.scale(dpr, dpr);

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Background (8.3)
  ctx.fillStyle = FIELD_BG;
  ctx.fillRect(0, 0, width, height);

  // Grid and border (8.2)
  const cellW = width / GRID_COLS;
  const cellH = height / GRID_ROWS;

  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;

  // Outer border
  ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

  // Inner grid lines
  ctx.beginPath();
  for (let c = 1; c < GRID_COLS; c++) {
    const x = Math.round(c * cellW) + 0.5;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let r = 1; r < GRID_ROWS; r++) {
    const y = Math.round(r * cellH) + 0.5;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

function updateUI() {
  const score = document.getElementById("ui-score");
  const level = document.getElementById("ui-level");
  const lines = document.getElementById("ui-lines");
  const skip = document.getElementById("ui-skip");
  if (score) score.textContent = "0";
  if (level) level.textContent = "1";
  if (lines) lines.textContent = "0";
  if (skip) skip.textContent = "4";
}

function render() {
  const canvas = getCanvas();
  sizeCanvasForGrid(canvas);
  drawPlayfieldGrid(canvas);
}

function setupResponsiveRedraw() {
  let raf = 0;
  const onResize = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(render);
  };
  window.addEventListener("resize", onResize);
}

function main() {
  updateUI();
  render();
  setupResponsiveRedraw();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
