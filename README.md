# Browser Tetris Plus (Spec駆動/TDD)

ブラウザで動作する拡張版テトリスです。
Spec駆動開発（.kiro 配下の仕様）とTDDで実装しています。

## 要件・設計・タスク
- 仕様一式: `.kiro/specs/browser-tetris/`
  - 要件: `requirements.md`
  - 設計: `design.md`
  - タスク: `tasks.md`
- コーディング指針: `.kiro/steering/guide.md`

## 依存関係
- Node.js (推奨: v18以降)
- npm

## セットアップ
```bash
npm install --no-fund --no-audit
```

## ビルド
TypeScript を `public/js` に出力します。
```bash
npm run build
# 変更監視
npm run watch
```

## 実行（静的サーバ）
- Python
  ```bash
  python3 -m http.server 3000 -d public
  ```
- npx http-server
  ```bash
  npx http-server public -p 3000 -c-1
  ```
- 起動後: `http://localhost:3000` をブラウザで開くとプレイできます。

## 操作
- 矢印キー: 左右/下移動
- Space / ↑: 回転
- S: スキップ（スタック消費、2ライン毎に回復）
- P / Esc: ポーズ/再開
- Enter: ゲームオーバー時の再スタート

## ディレクトリ構成（抜粋）
```
public/
  index.html       # エントリ
  styles.css       # スタイル
  js/              # tsc出力（ESM）
src/
  *.ts             # ビジネスロジック/描画/入力
.kiro/
  specs/browser-tetris/  # 要件/設計/タスク
  steering/guide.md      # 開発方針
```

## 開発（TDD）
- テスト実行
  ```bash
  npm test
  # 監視
  npm run test:watch
  ```
- t-wadaさんの推奨するTDDで開発しています。
- 本プロジェクトは Outside-In で統合しつつ、各モジュールを Red→Green→Refactor で進めます。

## ライセンス
- 本リポジトリ内のコードはプロジェクト用途に限り利用可能です（必要に応じて追記してください）。
