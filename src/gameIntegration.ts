import type { GameState } from './gameState.js';
import { updateGameState } from './gameLoop.js';
import { placeBlock, checkLines, clearLines } from './gameField.js';
import { addScore, addLinesCleared, updateLevel } from './scoreManager.js';
import { canUseSkip, recoverSkipStacks } from './skipManager.js';

export function stepGame(deltaMs: number, state: GameState): GameState {
  // Update timers and attempt to drop
  let next = updateGameState(deltaMs, state);

  if (next.currentBlock) {
    // Try to drop by one cell; if that would collide, lock the block into field
    const placedIfPossible = placeBlock(next.field, next.currentBlock, next.blockX, next.blockY + 1);
    const canDrop = placedIfPossible !== next.field;
    if (!canDrop) {
      // Attempt to lock at current position
      const lockedField = placeBlock(next.field, next.currentBlock, next.blockX, next.blockY);
      if (lockedField === next.field) {
        // Cannot place at current position -> game over
        return { ...next, gameStatus: 'gameOver' };
      }
      const lines = checkLines(lockedField);
      const clearedField = clearLines(lockedField, lines);

      const linesClearedNow = lines.length;
      const newScore = addScore(next.score, linesClearedNow);
      const newTotalLines = addLinesCleared(next.linesCleared, linesClearedNow);
      const newLevel = updateLevel(next.level, newTotalLines);
      const newSkip = recoverSkipStacks(next.skipStacks, linesClearedNow);

      next = {
        ...next,
        field: clearedField,
        currentBlock: null,
        blockX: 0,
        blockY: 0,
        score: newScore,
        linesCleared: newTotalLines,
        level: newLevel,
        skipStacks: newSkip,
        dropTimer: 0
      };
    }
  }

  return next;
}
