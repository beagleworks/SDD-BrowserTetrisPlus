import { describe, expect, test, jest } from '@jest/globals';
import { planLineClearEffect, drawLineClearOverlay } from '../src/effects';

function createMockCtx(width: number, height: number) {
  const calls: Record<string, any[]> = {};
  const fn = (name: string) => (...args: any[]) => {
    calls[name] = calls[name] || [];
    calls[name].push(args);
  };
  const ctx: any = {
    canvas: { width, height },
    fillStyle: '',
    fillRect: jest.fn(fn('fillRect')),
  };
  return { ctx, calls } as const;
}

describe('Effects - line clear planning and drawing', () => {
  test('planLineClearEffect returns frames with decaying intensity for specified rows', () => {
    const frames = planLineClearEffect(10, [5, 7], { durationMs: 300, fps: 30 });
    expect(frames.length).toBeGreaterThan(0);
    // First frame intensities near 1
    const first = frames[0];
    expect(first.find(f => f.rowIndex === 5)?.intensity).toBeCloseTo(1, 2);
    // Last frame near 0
    const last = frames[frames.length - 1];
    expect(last.find(f => f.rowIndex === 5)?.intensity).toBeLessThan(0.1);
  });

  test('drawLineClearOverlay draws one rect per highlighted row and positions match row', () => {
    const rows = 20, cols = 10;
    const { ctx, calls } = createMockCtx(200, 400); // cell 20x20
    const highlighted = [
      { rowIndex: 0, intensity: 1 },
      { rowIndex: 10, intensity: 0.5 },
    ];
    drawLineClearOverlay(ctx as any, rows, cols, highlighted);
    expect(calls.fillRect?.length ?? 0).toBe(2);
    // y positions should be rowIndex * cellH
    const ys = (calls.fillRect ?? []).map(args => args[1]);
    expect(ys).toContain(0);
    expect(ys).toContain(200);
  });
});
