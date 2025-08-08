import type { Block } from './types';
import { rotateShapeTimes } from './rotation';

export function checkCollision(block: Block, x: number, y: number, field: number[][], rotation: number = 0): boolean {
  const shape = rotateShapeTimes(block.shape, (block.rotation + rotation) % 4);
  const height = field.length;
  const width = field[0]?.length ?? 0;

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const gx = x + c;
      const gy = y + r;
      if (gx < 0 || gx >= width || gy >= height) return true; // out of bounds
      if (gy >= 0 && field[gy][gx]) return true; // overlap existing
    }
  }
  return false;
}
