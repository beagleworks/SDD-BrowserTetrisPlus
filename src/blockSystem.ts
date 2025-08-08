import type { Block } from './types';
import { BLOCKS } from './blocks.js';

const TYPES = Object.keys(BLOCKS) as (keyof typeof BLOCKS)[];

export function generateRandomBlock(): Block {
  const t = TYPES[Math.floor(Math.random() * TYPES.length)];
  const def = BLOCKS[t];
  return {
    type: def.type,
    shape: def.shape,
    color: def.color,
    rotation: 0
  };
}

export function getCurrentBlock(state: { currentBlock: Block | null }): Block | null {
  return state.currentBlock;
}

export function getNextBlock(state: { nextBlock: Block | null }): Block | null {
  return state.nextBlock;
}

export function advanceToNextBlock<T extends { currentBlock: Block | null; nextBlock: Block | null }>(state: T): T {
  // If no current and no next, create both
  if (!state.currentBlock && !state.nextBlock) {
    const current = generateRandomBlock();
    const next = generateRandomBlock();
    return { ...state, currentBlock: current, nextBlock: next } as T;
  }
  // If there is next, move it to current and generate a fresh next
  if (state.nextBlock) {
    return { ...state, currentBlock: state.nextBlock, nextBlock: generateRandomBlock() } as T;
  }
  // Fallback: only current exists, create next
  return { ...state, nextBlock: generateRandomBlock() } as T;
}
