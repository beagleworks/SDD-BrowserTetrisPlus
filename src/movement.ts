import type { Block } from './types';
import type { GameState } from './gameState';
import { checkCollision } from './collision';

function canPlace(state: GameState, x: number, y: number, block: Block): boolean {
  return !checkCollision(block, x, y, state.field);
}

export function moveLeft(state: GameState): GameState {
  if (!state.currentBlock) return state;
  const nx = state.blockX - 1;
  return canPlace(state, nx, state.blockY, state.currentBlock)
    ? { ...state, blockX: nx }
    : state;
}

export function moveRight(state: GameState): GameState {
  if (!state.currentBlock) return state;
  const nx = state.blockX + 1;
  return canPlace(state, nx, state.blockY, state.currentBlock)
    ? { ...state, blockX: nx }
    : state;
}

export function moveDown(state: GameState): GameState {
  if (!state.currentBlock) return state;
  const ny = state.blockY + 1;
  return canPlace(state, state.blockX, ny, state.currentBlock)
    ? { ...state, blockY: ny }
    : state;
}
