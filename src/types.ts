export interface Block {
  type: BlockType;
  shape: number[][];
  color: string;
  rotation: number;
}

export type BlockType =
  | 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'
  | 'MONO' | 'DOMINO' | 'TRIO_L' | 'TRIO_I';
