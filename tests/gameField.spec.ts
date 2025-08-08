import { describe, expect, test } from '@jest/globals';
import { createGameField, placeBlock } from '../src/gameField';
import type { Block } from '../src/types';
import { BLOCKS } from '../src/blocks';

describe('GameField', () => {
  test('createGameField creates 20x10 zeroed field', () => {
    const field = createGameField(10, 20);
    expect(field.length).toBe(20);
    expect(field.every(row => row.length === 10)).toBe(true);
    expect(field.flat().every(v => v === 0)).toBe(true);
    // rows are not the same reference
    const uniqueRows = new Set(field.map(r => r as unknown as number));
    expect(uniqueRows.size).toBe(20);
  });

  test('placeBlock places O block at (4,0) when empty', () => {
    const field = createGameField(10, 20);
    const def = BLOCKS.O;
    const block: Block = { ...def, rotation: 0 };

    const out = placeBlock(field, block, 4, 0);
    expect(out).not.toBe(field);
    expect(out[0][4]).toBe(1);
    expect(out[0][5]).toBe(1);
    expect(out[1][4]).toBe(1);
    expect(out[1][5]).toBe(1);
  });

  test('placeBlock returns original when out of bounds', () => {
    const field = createGameField(10, 20);
    const def = BLOCKS.I;
    const block: Block = { ...def, rotation: 0 };

    const out1 = placeBlock(field, block, -1, 0);
    expect(out1).toBe(field);

    const out2 = placeBlock(field, block, 10, 0);
    expect(out2).toBe(field);

    const out3 = placeBlock(field, block, 0, 20);
    expect(out3).toBe(field);
  });

  test('placeBlock returns original when overlapping existing cells', () => {
    let field = createGameField(10, 20);
    // pre-fill a cell at (4,0)
    field = field.map((row, r) => row.map((v, c) => (r === 0 && c === 4 ? 1 : v)));

    const def = BLOCKS.O;
    const block: Block = { ...def, rotation: 0 };

    const out = placeBlock(field, block, 4, 0);
    expect(out).toBe(field);
  });
});
