import { describe, expect, test } from '@jest/globals';
import { addScore, addLinesCleared, updateLevel } from '../src/scoreManager';

describe('ScoreManager', () => {
  test('addScore awards points based on lines cleared', () => {
    expect(addScore(0, 0)).toBe(0);
    expect(addScore(0, 1)).toBe(100);
    expect(addScore(0, 2)).toBe(300);
    expect(addScore(0, 3)).toBe(500);
    expect(addScore(0, 4)).toBe(800);
  });

  test('addLinesCleared accumulates total lines', () => {
    expect(addLinesCleared(0, 0)).toBe(0);
    expect(addLinesCleared(0, 1)).toBe(1);
    expect(addLinesCleared(5, 2)).toBe(7);
  });

  test('updateLevel increases every 10 total lines', () => {
    expect(updateLevel(1, 0)).toBe(1);
    expect(updateLevel(1, 9)).toBe(1);
    expect(updateLevel(1, 10)).toBe(2);
    expect(updateLevel(2, 19)).toBe(2);
    expect(updateLevel(2, 20)).toBe(3);
  });
});
