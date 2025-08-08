import { describe, expect, test } from '@jest/globals';
import { rotateShapeClockwise, rotateShapeTimes } from '../src/rotation';

describe('rotateShapeClockwise', () => {
  test('rotates a non-square shape (I piece) 90 degrees clockwise', () => {
    const I = [[1,1,1,1]];
    const rotated = rotateShapeClockwise(I);
    expect(rotated).toEqual([[1],[1],[1],[1]]);
  });

  test('O piece remains a 2x2 square after rotation', () => {
    const O = [[1,1],[1,1]];
    const r1 = rotateShapeClockwise(O);
    expect(r1).toEqual([[1,1],[1,1]]);
  });

  test('four 90-degree rotations returns to original', () => {
    const T = [
      [0,1,0],
      [1,1,1]
    ];
    const r4 = rotateShapeTimes(T, 4);
    expect(r4).toEqual(T);
  });
});
