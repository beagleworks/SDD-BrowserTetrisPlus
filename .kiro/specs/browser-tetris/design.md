# 設計書

## 概要

ブラウザテトリスは、HTML5 CanvasとTypeScriptを使用して実装される、クラシックなテトリスゲームの拡張版です。標準的な7種類のテトロミノに加えて、モノミノ、ドミノ、トリオミノを含む11種類のブロックタイプを提供し、プレビューブロックのスキップ機能を備えています。関数型プログラミングのアプローチを採用し、Classを使用せずに純粋関数とモジュールパターンで実装します。

## アーキテクチャ

### 全体構成
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HTML/CSS      │    │   Game Engine   │    │   Rendering     │
│   - Canvas      │◄──►│   - Game Loop   │◄──►│   - Canvas API  │
│   - UI Elements │    │   - State Mgmt  │    │   - Animation   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                        ▲                        ▲
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Input Handler │    │   Block System  │    │   Audio System  │
│   - Keyboard    │    │   - Tetrominos  │    │   - Sound FX    │
│   - Touch       │    │   - Collision   │    │   - Background  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### レイヤー構造
1. **プレゼンテーション層**: HTML/CSS/Canvas描画
2. **ゲームロジック層**: ゲームルール、状態管理
3. **データ層**: ブロック定義、ゲームフィールド

## コンポーネントとインターフェース

### 1. GameEngine モジュール
```typescript
// types.ts
interface GameState {
    field: number[][];
    currentBlock: Block | null;
    nextBlock: Block | null;
    blockX: number;
    blockY: number;
    score: number;
    level: number;
    linesCleared: number;
    skipStacks: number;
    gameStatus: 'playing' | 'paused' | 'gameOver';
    dropTimer: number;
    dropInterval: number;
}

// gameEngine.ts
export const createGameEngine = (canvas: HTMLCanvasElement) => ({
    start: () => void,
    pause: () => void,
    resume: () => void,
    gameLoop: () => void,
    update: (deltaTime: number) => void,
    render: () => void,
    handleGameOver: () => void
});
```

### 2. BlockSystem モジュール
```typescript
// blockSystem.ts
export const generateRandomBlock = (): Block => Block;
export const getCurrentBlock = (state: GameState): Block | null => Block | null;
export const getNextBlock = (state: GameState): Block | null => Block | null;
export const skipCurrentBlock = (state: GameState): GameState => GameState;
export const rotateBlock = (block: Block): Block => Block;
export const moveBlock = (block: Block, direction: Direction): Block => Block;
export const checkCollision = (block: Block, x: number, y: number, field: number[][]): boolean => boolean;
```

### 3. GameField モジュール
```typescript
// gameField.ts
export const createGameField = (width: number, height: number): number[][] => number[][];
export const placeBlock = (field: number[][], block: Block, x: number, y: number): number[][] => number[][];
export const checkLines = (field: number[][]): number[] => number[];
export const clearLines = (field: number[][], lines: number[]): number[][] => number[][];
export const isGameOver = (field: number[][], block: Block): boolean => boolean;
export const getFieldState = (field: number[][]): number[][] => number[][];
```

### 4. ScoreManager モジュール
```typescript
// scoreManager.ts
export const addScore = (currentScore: number, lines: number): number => number;
export const updateLevel = (currentLevel: number, totalLines: number): number => number;
export const calculateSkipStacks = (currentStacks: number, linesCleared: number): number => number;
export const canUseSkip = (skipStacks: number): boolean => boolean;
export const useSkipStack = (skipStacks: number): number => number;
```

### 5. InputHandler モジュール
```typescript
// inputHandler.ts
export const bindEvents = (canvas: HTMLCanvasElement, handlers: InputHandlers): void => void;
export const handleKeyDown = (event: KeyboardEvent, state: GameState): GameState => GameState;
export const handleKeyUp = (event: KeyboardEvent, state: GameState): GameState => GameState;
export const handleTouchEvents = (event: TouchEvent, state: GameState): GameState => GameState;
```

### 6. Renderer モジュール
```typescript
// renderer.ts
export const drawGameField = (ctx: CanvasRenderingContext2D, field: number[][]): void => void;
export const drawCurrentBlock = (ctx: CanvasRenderingContext2D, block: Block, x: number, y: number): void => void;
export const drawNextBlock = (ctx: CanvasRenderingContext2D, block: Block): void => void;
export const drawUI = (ctx: CanvasRenderingContext2D, score: number, level: number, lines: number, skipStacks: number): void => void;
export const drawGameOver = (ctx: CanvasRenderingContext2D, finalScore: number): void => void;
export const drawPauseScreen = (ctx: CanvasRenderingContext2D): void => void;
```

## データモデル

### 型定義
```typescript
// types.ts
export interface Block {
    type: BlockType;
    shape: number[][];
    color: string;
    rotation: number;
}

export type BlockType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L' | 'MONO' | 'DOMINO' | 'TRIO_L' | 'TRIO_I';

export type Direction = 'left' | 'right' | 'down';

export type GameStatus = 'playing' | 'paused' | 'gameOver';

export interface InputHandlers {
    onMoveLeft: () => void;
    onMoveRight: () => void;
    onMoveDown: () => void;
    onRotate: () => void;
    onSkip: () => void;
    onPause: () => void;
}
```

### ブロック定義
```typescript
// blocks.ts
export const BLOCKS: Record<BlockType, Omit<Block, 'rotation'>> = {
    I: { type: 'I', shape: [[1,1,1,1]], color: '#00FFFF' },
    O: { type: 'O', shape: [[1,1],[1,1]], color: '#FFFF00' },
    T: { type: 'T', shape: [[0,1,0],[1,1,1]], color: '#800080' },
    S: { type: 'S', shape: [[0,1,1],[1,1,0]], color: '#00FF00' },
    Z: { type: 'Z', shape: [[1,1,0],[0,1,1]], color: '#FF0000' },
    J: { type: 'J', shape: [[1,0,0],[1,1,1]], color: '#0000FF' },
    L: { type: 'L', shape: [[0,0,1],[1,1,1]], color: '#FFA500' },
    MONO: { type: 'MONO', shape: [[1]], color: '#FFFFFF' },
    DOMINO: { type: 'DOMINO', shape: [[1,1]], color: '#FFB6C1' },
    TRIO_L: { type: 'TRIO_L', shape: [[1,0],[1,1]], color: '#DDA0DD' },
    TRIO_I: { type: 'TRIO_I', shape: [[1,1,1]], color: '#98FB98' }
} as const;
```

### ゲーム状態
```typescript
// gameState.ts
export const createInitialGameState = (): GameState => ({
    field: Array(20).fill(null).map(() => Array(10).fill(0)),
    currentBlock: null,
    nextBlock: null,
    blockX: 0,
    blockY: 0,
    score: 0,
    level: 1,
    linesCleared: 0,
    skipStacks: 4,
    gameStatus: 'playing',
    dropTimer: 0,
    dropInterval: 1000
});
```

## エラーハンドリング

### 1. 入力エラー
- 無効なキー入力の無視
- 境界外移動の防止
- 衝突時の操作キャンセル

### 2. ゲーム状態エラー
- 不正な状態遷移の防止
- ゲームフィールド境界チェック
- ブロック生成失敗時の処理

### 3. レンダリングエラー
- Canvas描画エラーのキャッチ
- フレームレート低下時の対応
- リサイズ時の再描画

### エラー処理パターン
```typescript
// エラーハンドリング関数型アプローチ
export const safeBlockMove = (state: GameState, direction: Direction): GameState => {
    try {
        const newState = moveBlockInDirection(state, direction);
        return validateGameState(newState) ? newState : state;
    } catch (error) {
        console.warn('Block movement failed:', error);
        return state; // 前の状態を維持
    }
};

export const validateGameState = (state: GameState): boolean => {
    return state.field.length === 20 && 
           state.field.every(row => row.length === 10) &&
           state.score >= 0 &&
           state.level >= 1;
};
```

## テスト戦略

### 1. 単体テスト
- **BlockSystem**: ブロック生成、回転、衝突検出
- **GameField**: ライン消去、ゲームオーバー判定
- **ScoreManager**: スコア計算、レベル更新
- **InputHandler**: キー入力処理

### 2. 統合テスト
- ゲームループ全体の動作
- ブロック配置からライン消去までの流れ
- スキップ機能とスタック管理の連携

### 3. ユーザビリティテスト
- キー操作の応答性
- 視覚的フィードバックの適切性
- モバイルデバイスでの操作性

### 4. パフォーマンステスト
- 60FPSでの安定動作
- メモリリークの検証
- 長時間プレイでの安定性

### テスト実装例
```typescript
// 単体テストの例
describe('BlockSystem', () => {
    test('should generate valid block types', () => {
        const block = generateRandomBlock();
        expect(Object.keys(BLOCKS)).toContain(block.type);
    });
    
    test('should detect collision correctly', () => {
        const field = createGameField(10, 20);
        const block: Block = { type: 'I', shape: [[1,1,1,1]], color: '#00FFFF', rotation: 0 };
        // 境界での衝突テスト
        expect(checkCollision(block, -1, 0, field)).toBe(true);
    });
    
    test('should maintain immutability in state updates', () => {
        const initialState = createInitialGameState();
        const newState = moveBlockInDirection(initialState, 'left');
        expect(initialState).not.toBe(newState);
        expect(initialState.blockX).not.toBe(newState.blockX);
    });
});
```

## 実装の詳細設計

### ゲームループ設計
```typescript
// gameLoop.ts
interface GameLoopState {
    lastTime: number;
    accumulator: number;
    fixedTimeStep: number;
}

export const createGameLoop = (
    updateFn: (deltaTime: number, state: GameState) => GameState,
    renderFn: (state: GameState) => void
) => {
    let loopState: GameLoopState = {
        lastTime: 0,
        accumulator: 0,
        fixedTimeStep: 16.67 // 60 FPS
    };
    
    let gameState: GameState = createInitialGameState();
    
    const loop = (currentTime: number): void => {
        const deltaTime = currentTime - loopState.lastTime;
        loopState.lastTime = currentTime;
        loopState.accumulator += deltaTime;
        
        while (loopState.accumulator >= loopState.fixedTimeStep) {
            gameState = updateFn(loopState.fixedTimeStep, gameState);
            loopState.accumulator -= loopState.fixedTimeStep;
        }
        
        renderFn(gameState);
        requestAnimationFrame(loop);
    };
    
    return { start: () => requestAnimationFrame(loop), getState: () => gameState };
};
```

### 衝突検出アルゴリズム
```typescript
// collision.ts
export const checkCollision = (
    block: Block, 
    x: number, 
    y: number, 
    field: number[][], 
    rotation: number = 0
): boolean => {
    const shape = getRotatedShape(block, rotation);
    
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const newX = x + col;
                const newY = y + row;
                
                // 境界チェック
                if (newX < 0 || newX >= field[0].length || newY >= field.length) {
                    return true;
                }
                
                // ブロック衝突チェック
                if (newY >= 0 && field[newY][newX]) {
                    return true;
                }
            }
        }
    }
    return false;
};

export const getRotatedShape = (block: Block, rotation: number): number[][] => {
    let shape = block.shape;
    const rotations = rotation % 4;
    
    for (let i = 0; i < rotations; i++) {
        shape = rotateMatrix90(shape);
    }
    
    return shape;
};

const rotateMatrix90 = (matrix: number[][]): number[][] => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated: number[][] = Array(cols).fill(null).map(() => Array(rows).fill(0));
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            rotated[j][rows - 1 - i] = matrix[i][j];
        }
    }
    
    return rotated;
};
```

### スキップ機能の実装
```typescript
// skipManager.ts
interface SkipState {
    maxStacks: number;
    currentStacks: number;
    linesForRecovery: number;
    linesSinceLastRecovery: number;
}

export const createInitialSkipState = (): SkipState => ({
    maxStacks: 4,
    currentStacks: 4,
    linesForRecovery: 2,
    linesSinceLastRecovery: 0
});

export const canSkip = (skipState: SkipState): boolean => {
    return skipState.currentStacks > 0;
};

export const useSkip = (skipState: SkipState): SkipState => {
    if (!canSkip(skipState)) {
        return skipState;
    }
    
    return {
        ...skipState,
        currentStacks: skipState.currentStacks - 1
    };
};

export const updateSkipStacksOnLinesCleared = (
    skipState: SkipState, 
    linesCleared: number
): SkipState => {
    const newLinesSinceLastRecovery = skipState.linesSinceLastRecovery + linesCleared;
    let newCurrentStacks = skipState.currentStacks;
    let remainingLines = newLinesSinceLastRecovery;
    
    while (remainingLines >= skipState.linesForRecovery && 
           newCurrentStacks < skipState.maxStacks) {
        newCurrentStacks++;
        remainingLines -= skipState.linesForRecovery;
    }
    
    return {
        ...skipState,
        currentStacks: newCurrentStacks,
        linesSinceLastRecovery: remainingLines
    };
};
```