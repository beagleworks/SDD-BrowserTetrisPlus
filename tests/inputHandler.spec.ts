import { describe, expect, test } from '@jest/globals';
import { createInitialGameState } from '../src/gameState';
import { BLOCKS } from '../src/blocks';
import { handleKeyDown } from '../src/inputHandler';

function withCurrentAt(x: number, y: number, type: keyof typeof BLOCKS, rotation = 0) {
  const s = createInitialGameState();
  return { ...s, currentBlock: { ...BLOCKS[type], rotation }, blockX: x, blockY: y };
}

describe('InputHandler - handleKeyDown', () => {
  test('ArrowLeft moves left', () => {
    const state = withCurrentAt(4, 0, 'O');
    const after = handleKeyDown('ArrowLeft', state);
    expect(after.blockX).toBe(3);
  });

  test('ArrowRight moves right', () => {
    const state = withCurrentAt(4, 0, 'O');
    const after = handleKeyDown('ArrowRight', state);
    expect(after.blockX).toBe(5);
  });

  test('ArrowDown moves down', () => {
    const state = withCurrentAt(4, 0, 'O');
    const after = handleKeyDown('ArrowDown', state);
    expect(after.blockY).toBe(1);
  });

  test('ArrowUp rotates clockwise', () => {
    const state = withCurrentAt(4, 0, 'I', 0);
    const after = handleKeyDown('ArrowUp', state);
    expect(after.currentBlock?.rotation).toBe(1);
  });

  test('Space also rotates clockwise', () => {
    const state = withCurrentAt(4, 0, 'I', 0);
    const after = handleKeyDown(' ', state);
    expect(after.currentBlock?.rotation).toBe(1);
  });

  test('unknown key does nothing', () => {
    const state = withCurrentAt(4, 0, 'O');
    const after = handleKeyDown('KeyX', state);
    expect(after).toBe(state);
  });
});
