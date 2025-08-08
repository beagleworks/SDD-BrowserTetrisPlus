import { describe, expect, test } from '@jest/globals';
import { createInitialGameState } from '../src/gameState';
import { handleKeyDown } from '../src/inputHandler';
import { updateGameState } from '../src/gameLoop';
import { handleGameOver, resetGameState } from '../src/gameStatus';

function withPlaying() {
  return createInitialGameState();
}

describe('GameStatus - pause and game over', () => {
  test('P toggles pause/resume and stops auto drop while paused', () => {
    let s = withPlaying();
    const before = s;
    s = handleKeyDown('P', s);
    expect(s.gameStatus).toBe('paused');
    const s2 = updateGameState(2000, s);
    expect(s2.blockY).toBe(s.blockY);
    // resume
    const s3 = handleKeyDown('P', s2);
    expect(s3.gameStatus).toBe('playing');
  });

  test('Escape also toggles pause', () => {
    let s = withPlaying();
    s = handleKeyDown('Escape', s);
    expect(s.gameStatus).toBe('paused');
  });

  test('handleGameOver sets status and update ignores movement', () => {
    let s = withPlaying();
    s = handleGameOver(s);
    expect(s.gameStatus).toBe('gameOver');
    const s2 = updateGameState(2000, s);
    expect(s2.blockY).toBe(s.blockY);
  });

  test('resetGameState resets to initial playing state', () => {
    let s = withPlaying();
    s = handleGameOver(s);
    const r = resetGameState();
    expect(r.gameStatus).toBe('playing');
    expect(r.score).toBe(0);
    expect(r.level).toBe(1);
  });
});
