import { updateGameState } from './gameLoop.js';
import { placeBlock, checkLines, clearLines } from './gameField.js';
import { addScore, addLinesCleared, updateLevel } from './scoreManager.js';
import { recoverSkipStacks } from './skipManager.js';
export function stepGame(deltaMs, state) {
    // Update timers and attempt to drop
    let next = updateGameState(deltaMs, state);
    // If after update, the block cannot move further down (moveDown already attempted),
    // we detect "locked" when dropTimer cycled but blockY unchanged. For simplicity,
    // we lock when the next auto-drop would cause collision: simulate by moving one more and if unchanged, then lock.
    // Here we derive lock by trying to place current block onto field at current position when next drop would collide.
    if (next.currentBlock) {
        // Try to drop by one cell; if that would collide, lock the block into field
        const droppedOnce = { ...next, blockY: next.blockY + 1 };
        // We reuse placeBlock on a temp field to check viability by comparing reference
        const placedIfPossible = placeBlock(next.field, next.currentBlock, next.blockX, next.blockY + 1);
        const canDrop = placedIfPossible !== next.field;
        if (!canDrop) {
            // Lock current block at current position
            const lockedField = placeBlock(next.field, next.currentBlock, next.blockX, next.blockY);
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
//# sourceMappingURL=gameIntegration.js.map