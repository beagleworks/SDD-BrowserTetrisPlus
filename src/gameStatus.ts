import type { GameState } from './gameState';
import { createInitialGameState } from './gameState';

export function handleGameOver(state: GameState): GameState {
  return { ...state, gameStatus: 'gameOver' };
}

export function resetGameState(): GameState {
  return createInitialGameState();
}
