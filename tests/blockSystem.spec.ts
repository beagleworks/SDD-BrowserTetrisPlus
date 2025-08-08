import { describe, expect, test } from '@jest/globals';
import { generateRandomBlock, advanceToNextBlock, getCurrentBlock, getNextBlock } from '../src/blockSystem';
import { createInitialGameState } from '../src/gameState';

const validTypes = ['I','O','T','S','Z','J','L','MONO','DOMINO','TRIO_L','TRIO_I'];

describe('BlockSystem - random generation and next management', () => {
  test('generateRandomBlock returns a valid block with rotation 0', () => {
    const b = generateRandomBlock();
    expect(validTypes).toContain(b.type);
    expect(Array.isArray(b.shape)).toBe(true);
    expect(typeof b.color).toBe('string');
    expect(b.rotation).toBe(0);
  });

  test('advanceToNextBlock initializes current and next when empty, then advances', () => {
    let state = createInitialGameState();
    expect(getCurrentBlock(state)).toBeNull();
    expect(getNextBlock(state)).toBeNull();

    state = advanceToNextBlock(state);
    const firstCurrent = getCurrentBlock(state);
    const firstNext = getNextBlock(state);
    expect(firstCurrent).not.toBeNull();
    expect(firstNext).not.toBeNull();

    state = advanceToNextBlock(state);
    const secondCurrent = getCurrentBlock(state);
    const secondNext = getNextBlock(state);

    // New current should equal previous next (by value)
    expect(JSON.stringify(secondCurrent)).toBe(JSON.stringify(firstNext));
    // And we should have a next block again
    expect(secondNext).not.toBeNull();
  });
});
