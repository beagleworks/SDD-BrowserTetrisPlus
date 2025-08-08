import { describe, expect, test } from '@jest/globals';
import { createGameField, checkLines, clearLines } from '../src/gameField';

function fillRow(field: number[][], rowIndex: number): number[][] {
  const width = field[0].length;
  return field.map((row, r) => (r === rowIndex ? Array(width).fill(1) : row.slice()));
}

function setCell(field: number[][], x: number, y: number, val: number): number[][] {
  return field.map((row, r) => row.map((v, c) => (r === y && c === x ? val : v)));
}

describe('Line System - detection and clearing', () => {
  test('checkLines returns indices of fully filled rows', () => {
    let field = createGameField(10, 4);
    field = fillRow(field, 1);
    field = fillRow(field, 3);
    const lines = checkLines(field);
    expect(lines.sort((a,b)=>a-b)).toEqual([1,3]);
  });

  test('clearLines removes filled rows and adds empty rows at top', () => {
    let field = createGameField(5, 4);
    // Prepare: rows [0..3], fill rows 1 and 2
    field = fillRow(field, 1);
    field = fillRow(field, 2);
    // Put a block at (0,0) and (1,3) to test drop behavior
    field = setCell(field, 0, 0, 1);
    field = setCell(field, 1, 3, 1);

    const lines = checkLines(field);
    expect(lines).toEqual([1,2]);

    const out = clearLines(field, lines);
    // After removing 2 lines from middle, we should get 2 empty rows at top
    // And original row 3 content should drop to bottom
    // Original (1,3)=1 should now be at bottom row y=3 (unchanged because we removed middle and packed)
    expect(out[3][1]).toBe(1);

    // The top two rows are empty
    expect(out[0].every(v => v === 0)).toBe(true);
    expect(out[1].every(v => v === 0)).toBe(true);

    // The cell (0,0) which was at top should have moved down by number of cleared rows below it? No, since cleared rows were 1 and 2 (below row 0), its relative position becomes row 0 + 2 = 2 in the new field
    expect(out[2][0]).toBe(1);
  });
});
