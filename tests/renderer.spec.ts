import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { drawGameField } from '../src/renderer';

function createMockCtx(width: number, height: number) {
  const calls: Record<string, any[]> = {};
  const fn = (name: string) => (...args: any[]) => {
    calls[name] = calls[name] || [];
    calls[name].push(args);
  };
  const ctx: any = {
    canvas: { width, height },
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    fillRect: jest.fn(fn('fillRect')),
    strokeRect: jest.fn(fn('strokeRect')),
    beginPath: jest.fn(fn('beginPath')),
    moveTo: jest.fn(fn('moveTo')),
    lineTo: jest.fn(fn('lineTo')),
    stroke: jest.fn(fn('stroke')),
    clearRect: jest.fn(fn('clearRect')),
  };
  return { ctx, calls } as const;
}

describe('Renderer - drawGameField', () => {
  let field: number[][];

  beforeEach(() => {
    field = Array.from({ length: 4 }, () => Array(4).fill(0));
    // fill top-left 2x2
    field[0][0] = 1; field[0][1] = 1;
    field[1][0] = 1; field[1][1] = 1;
  });

  test('fills background once and draws filled cells', () => {
    const { ctx, calls } = createMockCtx(200, 200);
    drawGameField(ctx as any, field);

    // background fill once
    expect(ctx.fillRect).toHaveBeenCalled();
    const bgCall = calls.fillRect?.[0];
    expect(bgCall).toEqual([0, 0, 200, 200]);

    // 4 filled cells
    const cellFills = calls.fillRect?.slice(1) ?? [];
    expect(cellFills.length).toBe(4);
  });

  test('computes cell size from canvas and field dimensions', () => {
    const { ctx, calls } = createMockCtx(120, 80); // 4x4 grid -> cell 30x20
    drawGameField(ctx as any, field);

    const cellFills = calls.fillRect?.slice(1) ?? [];
    // one of the calls should be at (30,0) with size (30,20) for (1,0)
    expect(cellFills).toContainEqual([30, 0, 30, 20]);
  });
});
