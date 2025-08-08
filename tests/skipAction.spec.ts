import { describe, expect, test } from '@jest/globals';
import { createInitialGameState } from '../src/gameState';
import { BLOCKS } from '../src/blocks';
import { skipCurrentBlock } from '../src/skipAction';

function baseState() {
  const s = createInitialGameState();
  return { ...s, currentBlock: { ...BLOCKS.O, rotation: 0 }, nextBlock: { ...BLOCKS.I, rotation: 0 }, skipStacks: 2 };
}

describe('Skip action', () => {
  test('consumes one stack and ensures next block exists', () => {
    const s0 = baseState();
    const s1 = skipCurrentBlock(s0);
    expect(s1.skipStacks).toBe(1);
    expect(s1.nextBlock).toBeTruthy();
  });

  test('does nothing when stacks are 0', () => {
    const s0 = { ...baseState(), skipStacks: 0 };
    const s1 = skipCurrentBlock(s0);
    expect(s1).toEqual(s0);
  });
});
