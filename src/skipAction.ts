import type { GameState } from './gameState';
import { canUseSkip, useSkipStack } from './skipManager';
import { generateRandomBlock } from './blockSystem';

export function skipCurrentBlock(state: GameState): GameState {
  if (!canUseSkip(state.skipStacks)) return state;
  return {
    ...state,
    skipStacks: useSkipStack(state.skipStacks),
    nextBlock: generateRandomBlock()
  };
}
