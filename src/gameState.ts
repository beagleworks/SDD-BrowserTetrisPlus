import type { Block } from './types';

export interface GameState {
  field: number[][];
  currentBlock: Block | null;
  nextBlock: Block | null;
  blockX: number;
  blockY: number;
  score: number;
  level: number;
  linesCleared: number;
  skipStacks: number;
  gameStatus: 'playing' | 'paused' | 'gameOver';
  dropTimer: number;
  dropInterval: number;
}

export function createInitialGameState(): GameState {
  return {
    field: Array.from({ length: 20 }, () => Array(10).fill(0)),
    currentBlock: null,
    nextBlock: null,
    blockX: 0,
    blockY: 0,
    score: 0,
    level: 1,
    linesCleared: 0,
    skipStacks: 4,
    gameStatus: 'playing',
    dropTimer: 0,
    dropInterval: 1000
  };
}
