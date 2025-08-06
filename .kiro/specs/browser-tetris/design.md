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

## テスト駆動開発（TDD）戦略

### TDD基本原則（t-wada氏推奨）
1. **Red**: 失敗するテストを書く
2. **Green**: テストを通す最小限のコードを書く
3. **Refactor**: コードを改善する

### TDDサイクルの適用

#### 1. 単体テスト（Red-Green-Refactor）
各モジュールに対してTDDサイクルを適用：

**BlockSystem**:
- Red: ブロック生成の失敗テストを書く
- Green: 最小限のブロック生成機能を実装
- Refactor: コードを改善し、次の機能（回転、衝突検出）へ

**GameField**:
- Red: フィールド作成の失敗テストを書く
- Green: 基本的なフィールド作成機能を実装
- Refactor: ライン消去、ゲームオーバー判定へと段階的に発展

**ScoreManager**:
- Red: スコア計算の失敗テストを書く
- Green: 基本的なスコア計算を実装
- Refactor: レベル更新、複雑なスコア計算へ

**InputHandler**:
- Red: キー入力処理の失敗テストを書く
- Green: 基本的な入力処理を実装
- Refactor: 複雑な入力パターンへ対応

#### 2. 統合テスト（Outside-In TDD）
- ユーザーの視点から始めるアプローチ
- ゲーム全体の動作から個別機能へ分解
- モックを使用して外部依存を分離

#### 3. テスト分類

**Fast Tests（高速テスト）**:
- 純粋関数のテスト
- ビジネスロジックのテスト
- 外部依存のないテスト

**Slow Tests（低速テスト）**:
- DOM操作を含むテスト
- Canvas描画のテスト
- 統合テスト

#### 4. テスト構造（AAA Pattern）
```typescript
// Arrange（準備）
// Act（実行）
// Assert（検証）
```

### TDD実装例

#### Red-Green-Refactorサイクル例
```typescript
// RED: 失敗するテストを書く
describe('BlockSystem - generateRandomBlock', () => {
    test('should generate a block with valid type', () => {
        // Arrange
        const validTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L', 'MONO', 'DOMINO', 'TRIO_L', 'TRIO_I'];
        
        // Act
        const block = generateRandomBlock();
        
        // Assert
        expect(validTypes).toContain(block.type);
        expect(block.shape).toBeDefined();
        expect(block.color).toBeDefined();
        expect(block.rotation).toBe(0);
    });
});

// GREEN: テストを通す最小限のコード
export const generateRandomBlock = (): Block => {
    const types: BlockType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L', 'MONO', 'DOMINO', 'TRIO_L', 'TRIO_I'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const blockDef = BLOCKS[randomType];
    
    return {
        type: randomType,
        shape: blockDef.shape,
        color: blockDef.color,
        rotation: 0
    };
};

// REFACTOR: 次のテストケースを追加
describe('BlockSystem - collision detection', () => {
    test('should detect boundary collision', () => {
        // Arrange
        const field = createGameField(10, 20);
        const block: Block = { type: 'I', shape: [[1,1,1,1]], color: '#00FFFF', rotation: 0 };
        
        // Act & Assert
        expect(checkCollision(block, -1, 0, field)).toBe(true); // 左境界
        expect(checkCollision(block, 10, 0, field)).toBe(true); // 右境界
        expect(checkCollision(block, 0, 20, field)).toBe(true); // 下境界
    });
    
    test('should not detect collision in valid position', () => {
        // Arrange
        const field = createGameField(10, 20);
        const block: Block = { type: 'O', shape: [[1,1],[1,1]], color: '#FFFF00', rotation: 0 };
        
        // Act & Assert
        expect(checkCollision(block, 4, 0, field)).toBe(false);
    });
});
```

#### Outside-In TDD例
```typescript
// 最上位レベルから開始
describe('Tetris Game Integration', () => {
    test('should complete a full game cycle', () => {
        // Arrange
        const gameState = createInitialGameState();
        
        // Act - ブロックを配置してラインを完成させる
        const stateWithBlock = placeBlockAtBottom(gameState);
        const stateAfterLineClear = processLineClear(stateWithBlock);
        
        // Assert
        expect(stateAfterLineClear.score).toBeGreaterThan(0);
        expect(stateAfterLineClear.linesCleared).toBeGreaterThan(0);
    });
});

// モックを使用した分離テスト
describe('GameEngine with mocked dependencies', () => {
    test('should update game state on timer tick', () => {
        // Arrange
        const mockRenderer = jest.fn();
        const mockInputHandler = jest.fn();
        const initialState = createInitialGameState();
        
        // Act
        const updatedState = updateGameState(initialState, 16.67);
        
        // Assert
        expect(updatedState.dropTimer).toBeGreaterThan(initialState.dropTimer);
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