import { createInitialGameState } from './gameState.js';
import { handleKeyDown } from './inputHandler.js';
import { drawGameField, drawCurrentBlock, drawNextBlock, drawPauseScreen, drawGameOver } from './renderer.js';
import { updateUiText } from './uiDisplay.js';
import { stepGame } from './gameIntegration.js';
import { advanceToNextBlock } from './blockSystem.js';
const GRID_COLS = 10;
const GRID_ROWS = 20;
function getCanvas() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas)
        throw new Error('Canvas element #game-canvas not found');
    return canvas;
}
function getPreviewCanvas() {
    return document.getElementById('preview-canvas');
}
function sizeCanvasForGrid(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const desiredWidthCss = rect.width;
    const cellSizeCss = Math.floor(desiredWidthCss / GRID_COLS);
    const widthCss = cellSizeCss * GRID_COLS;
    const heightCss = cellSizeCss * GRID_ROWS;
    canvas.style.width = `${widthCss}px`;
    canvas.style.height = `${heightCss}px`;
    canvas.width = Math.floor(widthCss * dpr);
    canvas.height = Math.floor(heightCss * dpr);
}
function render(state) {
    const canvas = getCanvas();
    sizeCanvasForGrid(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    drawGameField(ctx, state.field);
    if (state.currentBlock) {
        drawCurrentBlock(ctx, GRID_ROWS, GRID_COLS, state.currentBlock, state.blockX, state.blockY);
    }
    if (state.gameStatus === 'paused') {
        drawPauseScreen(ctx);
    }
    if (state.gameStatus === 'gameOver') {
        drawGameOver(ctx, state.score);
    }
    const preview = getPreviewCanvas();
    if (preview && state.nextBlock) {
        const pctx = preview.getContext('2d');
        if (pctx)
            drawNextBlock(pctx, state.nextBlock);
    }
    updateUiText(document, {
        score: state.score,
        level: state.level,
        lines: state.linesCleared,
        skipStacks: state.skipStacks
    });
}
function setupInput(getState, setState) {
    window.addEventListener('keydown', (e) => {
        // prevent page scroll for arrow keys and space on desktop/mobile
        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
            e.preventDefault();
        }
        const next = handleKeyDown(e.key, getState());
        setState(next);
        render(next);
    }, { passive: false });
}
function ensureSpawn(state) {
    if (!state.currentBlock || !state.nextBlock) {
        return advanceToNextBlock({ ...state });
    }
    return state;
}
function main() {
    let state = createInitialGameState();
    state = ensureSpawn(state);
    const getState = () => state;
    const setState = (s) => { state = s; };
    const tick = (timeMs) => {
        // Integrate game step (drop, lock, clear). Then spawn if needed.
        let next = stepGame(16.67, state);
        next = ensureSpawn(next);
        setState(next);
        render(next);
        requestAnimationFrame(tick);
    };
    setupInput(getState, setState);
    render(state);
    requestAnimationFrame(tick);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
}
else {
    main();
}
//# sourceMappingURL=main.js.map