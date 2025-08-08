import { describe, expect, test } from '@jest/globals';
import { createGameField } from '../src/gameField';
import type { Block } from '../src/types';
import { BLOCKS } from '../src/blocks';
import { checkCollision } from '../src/collision';

describe('Collision detection', () => {
  test('detects boundary collisions (left, right, bottom)', () => {
    const field = createGameField(10, 20);
    const block: Block = { ...BLOCKS.I, rotation: 0 };

    expect(checkCollision(block, -1, 0, field)).toBe(true);  // left
    expect(checkCollision(block, 10, 0, field)).toBe(true);  // right
    expect(checkCollision(block, 0, 20, field)).toBe(true);  // bottom
  });

  test('detects overlap collisions with existing field cells', () => {
    let field = createGameField(10, 20);
    // Pre-fill cell (4,0)
    field = field.map((row, r) => row.map((v, c) => (r === 0 && c === 4 ? 1 : v)));

    const block: Block = { ...BLOCKS.O, rotation: 0 };
    expect(checkCollision(block, 4, 0, field)).toBe(true);
  });

  test('no collision in a valid empty position', () => {
    const field = createGameField(10, 20);
    const block: Block = { ...BLOCKS.O, rotation: 0 };

    expect(checkCollision(block, 4, 0, field)).toBe(false);
  });
});
