import { describe, expect, test } from '@jest/globals';
import { createGameField, isGameOver } from '../src/gameField';
import { BLOCKS } from '../src/blocks';
import { createInitialGameState } from '../src/gameState';
import { handleKeyDown } from '../src/inputHandler';
import { handleGameOver } from '../src/gameStatus';

describe('Game Over detection and reset', () => {
  test('isGameOver true when top spawn is blocked', () => {
    const field = createGameField(10, 20);
    // Block the spawn area around x=4..5,y=0..1 for an O piece at center (x=4)
    const blocked = field.map((row, r) => row.map((v, c) => (r <= 1 && c >= 4 && c <= 5 ? 1 : v)));
    const gameOver = isGameOver(blocked, { ...BLOCKS.O, rotation: 0 });
    expect(gameOver).toBe(true);
  });

  test('Enter resets when gameStatus is gameOver', () => {
    let s = createInitialGameState();
    s = handleGameOver(s);
    const s2 = handleKeyDown('Enter', s);
    expect(s2.gameStatus).toBe('playing');
    expect(s2.score).toBe(0);
    expect(s2.level).toBe(1);
  });
});
