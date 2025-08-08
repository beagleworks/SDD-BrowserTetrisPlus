import { canUseSkip, useSkipStack } from './skipManager.js';
import { generateRandomBlock } from './blockSystem.js';
export function skipCurrentBlock(state) {
    if (!canUseSkip(state.skipStacks))
        return state;
    return {
        ...state,
        skipStacks: useSkipStack(state.skipStacks),
        nextBlock: generateRandomBlock()
    };
}
//# sourceMappingURL=skipAction.js.map