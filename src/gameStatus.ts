import type { GameState } from './gameState.js';
import { createInitialGameState } from './gameState.js';

export function handleGameOver(state: GameState): GameState {
  return { ...state, gameStatus: 'gameOver' };
}

export function resetGameState(): GameState {
  return createInitialGameState();
}
