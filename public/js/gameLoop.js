import { moveDown } from './movement.js';
export function calculateDropInterval(level) {
    // Basic curve: faster as level increases, clamp to a minimum
    const base = 1000;
    const step = Math.max(0, level - 1);
    const interval = Math.max(100, base - step * 100);
    return interval;
}
export function updateGameState(deltaMs, state) {
    if (state.gameStatus !== 'playing') {
        return state;
    }
    let next = { ...state };
    // Accumulate drop timer
    next.dropTimer += deltaMs;
    // Ensure interval reflects current level
    const interval = next.dropInterval || calculateDropInterval(next.level);
    next.dropInterval = interval;
    // Auto drop while timer exceeds interval (supports large delta)
    while (next.dropTimer >= interval) {
        const beforeY = next.blockY;
        const dropped = moveDown(next);
        const newTimer = next.dropTimer - interval;
        // apply dropped state and preserve updated timer/interval
        next = { ...dropped, dropTimer: newTimer, dropInterval: interval };
        // If could not move further down, break to avoid infinite loop
        if (next.blockY === beforeY) {
            break;
        }
    }
    return next;
}
//# sourceMappingURL=gameLoop.js.map