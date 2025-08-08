import { describe, expect, test } from '@jest/globals';
import { createInitialGameState } from '../src/gameState';
import { BLOCKS } from '../src/blocks';
import { updateGameState, calculateDropInterval } from '../src/gameLoop';

function withCurrentAt(x: number, y: number, type: keyof typeof BLOCKS, rotation = 0) {
  const s = createInitialGameState();
  return { ...s, currentBlock: { ...BLOCKS[type], rotation }, blockX: x, blockY: y };
}

describe('GameLoop - updateGameState and auto drop', () => {
  test('updateGameState increments dropTimer by deltaTime', () => {
    const s0 = withCurrentAt(4, 0, 'O');
    const s1 = updateGameState(16, s0);
    expect(s1.dropTimer).toBeGreaterThan(s0.dropTimer);
  });

  test('auto drop moves block down when dropTimer exceeds dropInterval', () => {
    const s0 = withCurrentAt(4, 0, 'O');
    const s1 = updateGameState(1000, s0); // default interval 1000ms
    expect(s1.blockY).toBe(s0.blockY + 1);
    // timer is reduced (not necessarily zero due to carry)
    expect(s1.dropTimer).toBeLessThan(1000);
  });

  test('auto drop does not move below bottom boundary', () => {
    const nearBottom = withCurrentAt(4, 18, 'O'); // O height 2 -> bottom
    const s1 = updateGameState(1000, nearBottom);
    expect(s1.blockY).toBe(18);
  });

  test('level-based drop interval makes higher level drop at smaller interval', () => {
    const level3Interval = calculateDropInterval(3);
    expect(level3Interval).toBeLessThan(calculateDropInterval(1));

    let s = withCurrentAt(4, 0, 'O');
    s = { ...s, level: 3, dropInterval: level3Interval };
    const s1 = updateGameState(level3Interval, s);
    expect(s1.blockY).toBe(s.blockY + 1);
  });
});
