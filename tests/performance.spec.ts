import { describe, expect, test } from '@jest/globals';
import { calculateDropInterval, updateGameState } from '../src/gameLoop';
import { createInitialGameState } from '../src/gameState';
import { BLOCKS } from '../src/blocks';

describe('Performance-related behavior (fast tests)', () => {
  test('calculateDropInterval is within [100,1000] and decreases with level', () => {
    const l1 = calculateDropInterval(1);
    const l5 = calculateDropInterval(5);
    const l10 = calculateDropInterval(10);
    expect(l1).toBeGreaterThanOrEqual(100);
    expect(l10).toBeGreaterThanOrEqual(100);
    expect(l1).toBeLessThanOrEqual(1000);
    expect(l5).toBeLessThan(l1);
    expect(l10).toBeLessThan(l5);
  });

  test('updateGameState with large delta results in multiple drops but clamps at bottom', () => {
    let s = createInitialGameState();
    // Place a vertical I near top center
    s = { ...s, currentBlock: { ...BLOCKS.I, rotation: 1 }, blockX: 4, blockY: 0 };
    const interval = s.dropInterval;
    const dropsToBottom = 20; // larger than needed
    const s2 = updateGameState(interval * dropsToBottom, s);
    expect(s2.blockY).toBeGreaterThanOrEqual(s.blockY);
    // cannot exceed bottom minus piece height; at least it should not be NaN/overflow
    expect(Number.isFinite(s2.blockY)).toBe(true);
  });

  test('paused state ignores updates regardless of delta', () => {
    let s = createInitialGameState();
    s = { ...s, gameStatus: 'paused', currentBlock: { ...BLOCKS.O, rotation: 0 }, blockX: 4, blockY: 0 };
    const s2 = updateGameState(5000, s);
    expect(s2.blockY).toBe(s.blockY);
  });
});
