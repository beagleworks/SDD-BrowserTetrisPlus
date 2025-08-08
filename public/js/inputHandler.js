import { moveLeft, moveRight, moveDown, rotateClockwise } from './movement.js';
import { skipCurrentBlock } from './skipAction.js';
import { resetGameState } from './gameStatus.js';
export function handleKeyDown(key, state) {
    switch (key) {
        case 'ArrowLeft':
            return moveLeft(state);
        case 'ArrowRight':
            return moveRight(state);
        case 'ArrowDown':
            return moveDown(state);
        case 'ArrowUp':
        case ' ': // Space
            return rotateClockwise(state);
        case 's':
        case 'S':
            return skipCurrentBlock(state);
        case 'p':
        case 'P':
        case 'Escape': {
            const nextStatus = state.gameStatus === 'paused' ? 'playing' : 'paused';
            return { ...state, gameStatus: nextStatus };
        }
        case 'Enter':
            return state.gameStatus === 'gameOver' ? resetGameState() : state;
        default:
            return state;
    }
}
//# sourceMappingURL=inputHandler.js.map