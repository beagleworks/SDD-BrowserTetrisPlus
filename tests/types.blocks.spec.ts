import { describe, expect, test } from '@jest/globals';
import type { Block, BlockType } from '../src/types';
import { BLOCKS } from '../src/blocks';

const expectedTypes: BlockType[] = [
  'I','O','T','S','Z','J','L','MONO','DOMINO','TRIO_L','TRIO_I'
];

describe('Type definitions and block catalog', () => {
  test('BlockType includes all 11 types', () => {
    // This intentionally relies on compile-time types and runtime check via keys
    const keys = Object.keys(BLOCKS);
    expectedTypes.forEach(t => expect(keys).toContain(t));
  });

  test('BLOCKS entries are well-formed', () => {
    for (const type of expectedTypes) {
      const def = BLOCKS[type as keyof typeof BLOCKS] as Omit<Block, 'rotation'>;
      expect(def).toBeDefined();
      expect(def.type).toBe(type);
      expect(Array.isArray(def.shape)).toBe(true);
      expect(typeof def.color).toBe('string');
    }
  });
});
