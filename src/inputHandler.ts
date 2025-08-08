import type { GameState } from './gameState';
import { moveLeft, moveRight, moveDown, rotateClockwise } from './movement';

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
    default:
      return state;
  }
}
