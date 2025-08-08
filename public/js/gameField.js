import { rotateShapeTimes } from './rotation.js';
export function createGameField(width, height) {
    return Array.from({ length: height }, () => Array(width).fill(0));
}
export function placeBlock(field, block, x, y) {
    const shape = rotateShapeTimes(block.shape, block.rotation);
    const height = field.length;
    const width = field[0]?.length ?? 0;
    // Bounds and overlap check
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c])
                continue;
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
            if (!shape[r][c])
                continue;
            next[y + r][x + c] = 1;
        }
    }
    return next;
}
export function checkLines(field) {
    const lines = [];
    for (let r = 0; r < field.length; r++) {
        if (field[r].every(v => v !== 0)) {
            lines.push(r);
        }
    }
    return lines;
}
export function clearLines(field, lines) {
    if (lines.length === 0)
        return field;
    const width = field[0]?.length ?? 0;
    const height = field.length;
    const toRemove = new Set(lines);
    const remainingRows = [];
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
export function isGameOver(field, block) {
    const width = field[0]?.length ?? 0;
    const shape = rotateShapeTimes(block.shape, 0);
    const shapeWidth = shape[0]?.length ?? 0;
    const spawnX = Math.floor((width - shapeWidth) / 2);
    const spawnY = 0;
    // Collision at spawn means game over
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c])
                continue;
            const x = spawnX + c;
            const y = spawnY + r;
            if (y < 0 || y >= field.length || x < 0 || x >= width) {
                return true;
            }
            if (field[y][x])
                return true;
        }
    }
    return false;
}
//# sourceMappingURL=gameField.js.map