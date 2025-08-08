import { describe, expect, test } from '@jest/globals';
import { canUseSkip, useSkipStack, recoverSkipStacks } from '../src/skipManager';

describe('SkipManager - stacks and recovery', () => {
  test('canUseSkip returns false at 0 and true when >0', () => {
    expect(canUseSkip(0)).toBe(false);
    expect(canUseSkip(1)).toBe(true);
  });

  test('useSkipStack decrements down to minimum 0', () => {
    expect(useSkipStack(2)).toBe(1);
    expect(useSkipStack(1)).toBe(0);
    expect(useSkipStack(0)).toBe(0);
  });

  test('recoverSkipStacks adds 1 per 2 lines cleared up to max 4', () => {
    expect(recoverSkipStacks(0, 2)).toBe(1);
    expect(recoverSkipStacks(3, 2)).toBe(4);
    expect(recoverSkipStacks(4, 4)).toBe(4);
  });
});
