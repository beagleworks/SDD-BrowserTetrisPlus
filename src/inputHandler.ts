import type { GameState } from './gameState';
import { moveLeft, moveRight, moveDown, rotateClockwise } from './movement';
import { skipCurrentBlock } from './skipAction';
import { resetGameState } from './gameStatus';

export function handleKeyDown(key: string, state: GameState): GameState {
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
