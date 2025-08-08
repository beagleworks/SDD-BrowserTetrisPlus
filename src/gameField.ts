import type { Block } from './types';
import { rotateShapeTimes } from './rotation';

export function createGameField(width: number, height: number): number[][] {
  return Array.from({ length: height }, () => Array(width).fill(0));
}

export function placeBlock(field: number[][], block: Block, x: number, y: number): number[][] {
  const shape = rotateShapeTimes(block.shape, block.rotation);
  const height = field.length;
  const width = field[0]?.length ?? 0;

  // Bounds and overlap check
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const gx = x + c;
      const gy = y + r;
      if (gx < 0 || gx >= width || gy < 0 || gy >= height) {
        return field;
      }
      if (field[gy][gx]) {
        return field;
      }
    }
  }

  // Place on a copied field
  const next = field.map(row => row.slice());
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      next[y + r][x + c] = 1;
    }
  }
  return next;
}

export function checkLines(field: number[][]): number[] {
  const lines: number[] = [];
  for (let r = 0; r < field.length; r++) {
    if (field[r].every(v => v !== 0)) {
      lines.push(r);
    }
  }
  return lines;
}

export function clearLines(field: number[][], lines: number[]): number[][] {
  if (lines.length === 0) return field;
  const width = field[0]?.length ?? 0;
  const height = field.length;

  const toRemove = new Set(lines);
  const remainingRows: number[][] = [];
  for (let r = 0; r < height; r++) {
    if (!toRemove.has(r)) {
      remainingRows.push(field[r].slice());
    }
  }
  const clearedCount = lines.length;
  const emptyRow = Array(width).fill(0);
  const newTopRows = Array.from({ length: clearedCount }, () => emptyRow.slice());
  return [...newTopRows, ...remainingRows];
}
