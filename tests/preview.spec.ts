import { describe, expect, test, jest } from '@jest/globals';
import { drawNextBlock } from '../src/renderer';
import { BLOCKS } from '../src/blocks';

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
    clearRect: jest.fn(fn('clearRect')),
    strokeRect: jest.fn(fn('strokeRect')),
  };
  return { ctx, calls } as const;
}

describe('Preview - drawNextBlock', () => {
  test('draws each occupied cell of O block', () => {
    const { ctx, calls } = createMockCtx(100, 100);
    drawNextBlock(ctx as any, { ...BLOCKS.O });
    // 4 cells for 2x2
    expect(calls.fillRect?.length ?? 0).toBe(4);
  });

  test('centers the block in the preview canvas', () => {
    const { ctx, calls } = createMockCtx(100, 100);
    drawNextBlock(ctx as any, { ...BLOCKS.I });
    // I horizontal by default -> y should be centered row
    const ys = (calls.fillRect ?? []).map(args => args[1]);
    const uniqueY = Array.from(new Set(ys));
    expect(uniqueY.length).toBe(1);
  });
});
