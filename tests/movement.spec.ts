import { describe, expect, test } from '@jest/globals';
import { createInitialGameState } from '../src/gameState';
import { BLOCKS } from '../src/blocks';
import { moveLeft, moveRight, moveDown } from '../src/movement';
import type { GameState } from '../src/gameState';

function withCurrentAt(x: number, y: number, type: keyof typeof BLOCKS): GameState {
  const s = createInitialGameState();
  return { ...s, currentBlock: { ...BLOCKS[type], rotation: 0 }, blockX: x, blockY: y };
}

describe('Movement - left/right/down', () => {
  test('moveLeft moves current block left when no collision', () => {
    let state = withCurrentAt(4, 0, 'O');
    state = moveLeft(state);
    expect(state.blockX).toBe(3);
  });

  test('moveLeft stops at left boundary', () => {
    let state = withCurrentAt(0, 0, 'O');
    const after = moveLeft(state);
    expect(after.blockX).toBe(0);
  });

  test('moveRight moves current block right when no collision', () => {
    let state = withCurrentAt(4, 0, 'O');
    state = moveRight(state);
    expect(state.blockX).toBe(5);
  });

  test('moveRight stops at right boundary considering block width', () => {
    // O block width 2, field width 10 -> max x = 8
    let state = withCurrentAt(8, 0, 'O');
    const after = moveRight(state);
    expect(after.blockX).toBe(8);
  });

  test('moveDown moves current block down when no collision', () => {
    let state = withCurrentAt(4, 0, 'O');
    state = moveDown(state);
    expect(state.blockY).toBe(1);
  });

  test('moveDown stops at bottom boundary considering block height', () => {
    // O block height 2, field height 20 -> max y = 18
    let state = withCurrentAt(4, 18, 'O');
    const after = moveDown(state);
    expect(after.blockY).toBe(18);
  });

  test('moveDown stops when overlapping existing field', () => {
    let state = withCurrentAt(3, 0, 'O');
    // Pre-fill (3,1)
    state = { ...state, field: state.field.map((row, r) => row.map((v, c) => (r === 1 && c === 3 ? 1 : v))) };
    const after = moveDown(state);
    expect(after.blockY).toBe(0);
  });
});
