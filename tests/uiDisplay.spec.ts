import { describe, expect, test } from '@jest/globals';
import { updateUiText } from '../src/uiDisplay';

describe('UI Display - updateUiText', () => {
  test('sets score, level, lines, and skip text contents', () => {
    const nodes: Record<string, { textContent: string | null }> = {
      'ui-score': { textContent: null },
      'ui-level': { textContent: null },
      'ui-lines': { textContent: null },
      'ui-skip': { textContent: null },
    };
    const mockDoc = {
      getElementById: (id: string) => nodes[id] ?? null
    } as any;

    updateUiText(mockDoc, { score: 123, level: 4, lines: 9, skipStacks: 2 });

    expect(nodes['ui-score'].textContent).toBe('123');
    expect(nodes['ui-level'].textContent).toBe('4');
    expect(nodes['ui-lines'].textContent).toBe('9');
    expect(nodes['ui-skip'].textContent).toBe('2');
  });
});
