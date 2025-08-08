import { describe, expect, test } from '@jest/globals';
import { createInitialGameState } from '../src/gameState';
import { BLOCKS } from '../src/blocks';
import { stepGame } from '../src/gameIntegration';

function makeField(width: number, height: number, fill = 0): number[][] {
  return Array.from({ length: height }, () => Array(width).fill(fill));
}

describe('Integration - stepGame', () => {
  test('locks piece, clears completed line, updates score and totals', () => {
    // 4x4 field; only bottom row nearly full (one hole)
    const field = makeField(4, 4, 0);
    field[3][0] = 1;
    field[3][1] = 1;
    field[3][2] = 1;
    // (3,3) is empty -> will be filled by MONO lock

    let s = createInitialGameState();
    s = { ...s, field, score: 0, linesCleared: 0, skipStacks: 4 };
    // Place MONO above the empty spot so one drop will lock
    s = { ...s, currentBlock: { ...BLOCKS.MONO, rotation: 0 }, blockX: 3, blockY: 2 };

    const s1 = stepGame(1000, s);

    // One line cleared -> +100 score and totals incremented
    expect(s1.score).toBe(100);
    expect(s1.linesCleared).toBe(1);
    // Field top row becomes empty due to clearing bottom row
    expect(s1.field[0].every(v => v === 0)).toBe(true);
  });
});
