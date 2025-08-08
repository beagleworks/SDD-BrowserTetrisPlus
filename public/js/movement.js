import { checkCollision } from './collision.js';
function canPlace(state, x, y, block) {
    return !checkCollision(block, x, y, state.field);
}
export function moveLeft(state) {
    if (!state.currentBlock)
        return state;
    const nx = state.blockX - 1;
    return canPlace(state, nx, state.blockY, state.currentBlock)
        ? { ...state, blockX: nx }
        : state;
}
export function moveRight(state) {
    if (!state.currentBlock)
        return state;
    const nx = state.blockX + 1;
    return canPlace(state, nx, state.blockY, state.currentBlock)
        ? { ...state, blockX: nx }
        : state;
}
export function moveDown(state) {
    if (!state.currentBlock)
        return state;
    const ny = state.blockY + 1;
    return canPlace(state, state.blockX, ny, state.currentBlock)
        ? { ...state, blockY: ny }
        : state;
}
export function rotateClockwise(state) {
    if (!state.currentBlock)
        return state;
    const rotated = { ...state.currentBlock, rotation: (state.currentBlock.rotation + 1) % 4 };
    if (checkCollision(rotated, state.blockX, state.blockY, state.field)) {
        return state;
    }
    return { ...state, currentBlock: rotated };
}
//# sourceMappingURL=movement.js.map