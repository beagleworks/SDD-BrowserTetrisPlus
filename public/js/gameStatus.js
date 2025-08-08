import { createInitialGameState } from './gameState.js';
export function handleGameOver(state) {
    return { ...state, gameStatus: 'gameOver' };
}
export function resetGameState() {
    return createInitialGameState();
}
//# sourceMappingURL=gameStatus.js.map