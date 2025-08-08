import { describe, expect, test } from '@jest/globals';
import { createInitialGameState } from '../src/gameState';
import { BLOCKS } from '../src/blocks';
import { rotateClockwise } from '../src/movement';
import type { GameState } from '../src/gameState';

function withCurrentAt(x: number, y: number, type: keyof typeof BLOCKS, rotation = 0): GameState {
  const s = createInitialGameState();
  return { ...s, currentBlock: { ...BLOCKS[type], rotation }, blockX: x, blockY: y };
}

describe('Rotation control - rotateClockwise', () => {
  test('rotates by +90 when there is space', () => {
    let state = withCurrentAt(4, 0, 'I', 0);
    state = rotateClockwise(state);
    expect(state.currentBlock?.rotation).toBe(1);
  });

  test('O block rotation increments but shape remains effectively same (no collision)', () => {
    let state = withCurrentAt(4, 0, 'O', 0);
    state = rotateClockwise(state);
    expect(state.currentBlock?.rotation).toBe(1);
  });

  test('does not rotate when rotation would collide with right boundary', () => {
    // Place I vertical at x=8 (cols=10). Rotating to horizontal (width 4) would overflow.
    const state = withCurrentAt(8, 0, 'I', 1);
    const after = rotateClockwise(state);
    expect(after.currentBlock?.rotation).toBe(1);
  });

  test('does not rotate when overlapping existing field cells', () => {
    let state = withCurrentAt(4, 0, 'I', 0);
    // Pre-fill a cell where rotated I would go (x=4,y=1)
    state = { ...state, field: state.field.map((row, r) => row.map((v, c) => (r === 1 && c === 4 ? 1 : v))) };
    const after = rotateClockwise(state);
    expect(after.currentBlock?.rotation).toBe(0);
  });
});
