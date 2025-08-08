import { BLOCKS } from './blocks.js';
const TYPES = Object.keys(BLOCKS);
export function generateRandomBlock() {
    const t = TYPES[Math.floor(Math.random() * TYPES.length)];
    const def = BLOCKS[t];
    return {
        type: def.type,
        shape: def.shape,
        color: def.color,
        rotation: 0
    };
}
export function getCurrentBlock(state) {
    return state.currentBlock;
}
export function getNextBlock(state) {
    return state.nextBlock;
}
export function advanceToNextBlock(state) {
    // If no current and no next, create both
    if (!state.currentBlock && !state.nextBlock) {
        const current = generateRandomBlock();
        const next = generateRandomBlock();
        return { ...state, currentBlock: current, nextBlock: next };
    }
    // If there is next, move it to current and generate a fresh next
    if (state.nextBlock) {
        return { ...state, currentBlock: state.nextBlock, nextBlock: generateRandomBlock() };
    }
    // Fallback: only current exists, create next
    return { ...state, nextBlock: generateRandomBlock() };
}
//# sourceMappingURL=blockSystem.js.map