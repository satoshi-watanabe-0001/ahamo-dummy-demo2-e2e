# Playwright MCPサーバーテスト方針

## 概要

このドキュメントでは、ahamo-dummy-demo2-frontend-workspaceプロジェクトにおけるPlaywright E2EテストでのMCPサーバー活用方針とベストプラクティスを説明します。

## MCPサーバーとは

MCP (Model Context Protocol) サーバーは、外部ツールとの統合を可能にするプロトコルです。Playwrightテストにおいて、標準機能を超えた高度なブラウザ操作や検証機能を提供します。

## 利用可能なMCPサーバー

### Playwrightサーバー

- **サーバー名**: `playwright`
- **主要機能**: ブラウザ自動化、スクリーンショット撮影、アクセシビリティスナップショット

## MCPサーバーを使用すべき場面

### 1. 視覚的検証が重要な場合

**使用すべき場面**:

- レスポンシブデザインのテスト
- UI/UXの視覚的回帰テスト
- 複雑なレイアウトの確認
- ブラウザ間の表示差異確認

**実装例**:

```typescript
// レスポンシブテストでのスクリーンショット撮影
test('モバイルビューでのヘッダーメニュー操作', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')

  const menuButton = page.getByRole('button', { name: 'メニューを開く' })
  await menuButton.click()

  // MCPサーバーによるスクリーンショット撮影
  await mcpTakeScreenshot('mobile-menu-open.png')
})
```

### 2. アクセシビリティ検証

**使用すべき場面**:

- WCAG準拠の確認
- キーボードナビゲーションのテスト
- スクリーンリーダー対応の検証
- 色彩コントラストの確認

**実装例**:

```typescript
// アクセシビリティスナップショット
test('色彩コントラストとアクセシビリティスナップショット', async ({ page }) => {
  await page.goto('/sim-check')

  // MCPサーバーによる詳細なアクセシビリティ情報取得
  await mcpSnapshot()

  await expect(page.getByRole('heading', { name: '申し込み前に準備してください' })).toBeVisible()
})
```

### 3. 複雑なユーザーフローの記録

**使用すべき場面**:

- 多段階の申し込みフロー
- 条件分岐が多い画面遷移
- エラー状態の視覚的確認
- ユーザビリティテストの記録

**実装例**:

```typescript
// 申し込みフロー全体の記録
test('新規電話番号での申し込みフロー', async ({ page }) => {
  await page.goto('/signup')
  await page.getByText('新しい電話番号を発行する').click()
  await page.getByText('スマートフォンを一緒に買う').click()

  // 重要な状態でのスクリーンショット撮影
  await mcpTakeScreenshot('signup-new-phone-flow.png')
})
```

## 標準Playwrightを使用すべき場面

### 1. 基本的な機能テスト

**使用すべき場面**:

- 要素の存在確認
- テキスト内容の検証
- フォーム入力の動作確認
- 基本的なナビゲーション

**実装例**:

```typescript
// 標準Playwrightで十分な基本テスト
test('申し込みページの基本要素確認', async ({ page }) => {
  await page.goto('/signup')

  // 標準のPlaywright機能で十分
  await expect(page.getByText('ahamo お申し込み手続き')).toBeVisible()
  await expect(page.getByText('新しい電話番号を発行する')).toBeVisible()
  await expect(page.getByText('今の電話番号をそのまま使う')).toBeVisible()
})
```

### 2. パフォーマンステスト

**使用すべき場面**:

- ページロード時間の測定
- API応答時間の確認
- メモリ使用量の監視

### 3. 単純なインタラクション

**使用すべき場面**:

- ボタンクリック
- フォーム送信
- 基本的なページ遷移

## MCPサーバー統合パターン

### 基本的なヘルパー関数

```typescript
// スクリーンショット撮影ヘルパー
async function mcpTakeScreenshot(filename: string) {
  try {
    const { execSync } = require('child_process')
    const command = `mcp-cli tool call browser_take_screenshot --server playwright --input '{"filename": "${filename}"}'`
    return execSync(command, { encoding: 'utf-8' })
  } catch (error) {
    console.log(`MCP screenshot failed for ${filename}:`, (error as Error).message)
    return null
  }
}

// アクセシビリティスナップショットヘルパー
async function mcpSnapshot() {
  try {
    const { execSync } = require('child_process')
    const command = `mcp-cli tool call browser_snapshot --server playwright --input '{}'`
    return execSync(command, { encoding: 'utf-8' })
  } catch (error) {
    console.log('MCP snapshot failed:', (error as Error).message)
    return null
  }
}
```

### エラーハンドリング戦略

**重要な設計原則**: MCPサーバーが利用できない環境でもテストは継続実行される

```typescript
// 失敗時のフォールバック処理
async function mcpTakeScreenshot(filename: string) {
  try {
    // MCP機能を試行
    return execSync(command, { encoding: 'utf-8' })
  } catch (error) {
    // エラー時はログ出力のみ、テストは継続
    console.log(`MCP screenshot failed for ${filename}:`, (error as Error).message)
    return null
  }
}
```

## テストファイル命名規則

### MCPサーバー使用テスト

- ファイル名に `-mcp` サフィックスを付与
- 例: `signup-flow-mcp.spec.ts`, `responsive-accessibility-mcp.spec.ts`

### 標準Playwrightテスト

- 通常の命名規則を使用
- 例: `basic-navigation.spec.ts`, `form-validation.spec.ts`

## 環境依存性管理

### MCPサーバー利用可能環境

- **開発環境**: MCPサーバーが設定済み
- **CI/CD環境**: MCPサーバーの設定が必要
- **ローカル環境**: 開発者による個別設定

### MCPサーバー非対応環境

- **テスト継続**: エラーハンドリングによりテストは継続実行
- **機能制限**: スクリーンショット・スナップショット機能のみ無効
- **ログ出力**: エラー内容がコンソールに出力

## ベストプラクティス

### 1. 適切な使い分け

```typescript
// ❌ 悪い例: 単純な要素確認にMCPを使用
test('ボタンの存在確認', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('申し込み')).toBeVisible()
  await mcpTakeScreenshot('button-check.png') // 不要
})

// ✅ 良い例: 視覚的検証が重要な場面でMCPを使用
test('レスポンシブレイアウトの確認', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  await page.getByRole('button', { name: 'メニューを開く' }).click()

  // 視覚的な確認が重要なのでMCPを使用
  await mcpTakeScreenshot('mobile-layout.png')
})
```

### 2. エラーハンドリングの実装

```typescript
// 必ずtry-catch文でエラーハンドリング
async function mcpTakeScreenshot(filename: string) {
  try {
    const command = `mcp-cli tool call browser_take_screenshot --server playwright --input '{"filename": "${filename}"}'`
    return execSync(command, { encoding: 'utf-8' })
  } catch (error) {
    // テストを停止せず、ログ出力のみ
    console.log(`MCP screenshot failed for ${filename}:`, (error as Error).message)
    return null
  }
}
```

### 3. ファイル名の管理

```typescript
// 意味のあるファイル名を使用
await mcpTakeScreenshot('signup-new-phone-flow.png') // ✅ 良い
await mcpTakeScreenshot('signup-docomo-plan-change.png') // ✅ 良い
await mcpTakeScreenshot('test-screenshot.png') // ❌ 悪い
```

### 4. テストの独立性

```typescript
// 各テストは独立して実行可能
test.describe('申し込みフロー（MCPサーバー使用）', () => {
  test('新規電話番号での申し込みフロー', async ({ page }) => {
    // 独立したテストケース
    await page.goto('/signup')
    // ... テスト実装
    await mcpTakeScreenshot('signup-new-phone.png')
  })

  test('電話番号継続での申し込みフロー', async ({ page }) => {
    // 前のテストに依存しない独立したテスト
    await page.goto('/signup')
    // ... テスト実装
    await mcpTakeScreenshot('signup-keep-phone.png')
  })
})
```

## テストステップ日本語化ガイドライン

### 基本方針

E2Eテストの可読性とメンテナンス性を向上させるため、テストステップには日本語での説明コメントを追加する。Playwrightレポートでの表示を考慮し、直感的で分かりやすい操作説明を心がける。

### コメント記述ルール

#### 1. ステップ番号付きコメント

各操作の前に「ステップN:」形式で日本語説明を追加する：

```typescript
test('ユーザーログインフロー', async ({ page }) => {
  // ステップ1: ログインページにアクセス
  await page.goto('/login')

  // ステップ2: ユーザー名を入力
  await page.fill('[data-testid="username"]', 'testuser')

  // ステップ3: パスワードを入力
  await page.fill('[data-testid="password"]', 'password123')

  // ステップ4: 「ログイン」ボタンをクリックしてダッシュボードに遷移
  await page.getByRole('button', { name: 'ログイン' }).click()

  // ステップ5: ダッシュボードページに正しく遷移したことを確認
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText('ようこそ')).toBeVisible()
})
```

#### 2. 操作内容の明確化

各ステップで何を行うかを具体的に説明する：

- ❌ 悪い例: `// ボタンをクリック`
- ✅ 良い例: `// 「申し込み」ボタンをクリックして次のステップに進む`
- ❌ 悪い例: `// フォームに入力`
- ✅ 良い例: `// メールアドレス入力欄に有効なメールアドレスを入力`

#### 3. 検証内容の説明

expectアサーションの前に期待する結果を説明する：

```typescript
// ステップ4: エラーメッセージが正しく表示されることを確認
await expect(page.getByText('パスワードが間違っています')).toBeVisible()

// ステップ5: ログインボタンが無効化されていることを確認
await expect(page.getByRole('button', { name: 'ログイン' })).toBeDisabled()
```

### テスト名とdescribe名の日本語化

#### テストスイート名

```typescript
test.describe('ユーザー認証フロー', () => {
  // テストケース群
})

test.describe('スマートフォンオプション選択フロー', () => {
  // テストケース群
})
```

#### テストケース名

```typescript
test('正常なログイン情報でダッシュボードに遷移できる', async ({ page }) => {
  // テスト実装
})

test('無効なパスワードでエラーメッセージが表示される', async ({ page }) => {
  // テスト実装
})

test('データプラン選択時に価格が正しく更新される', async ({ page }) => {
  // テスト実装
})
```

### 特殊なテストケースの日本語化

#### レスポンシブテスト

```typescript
test('モバイル画面でのナビゲーション動作確認', async ({ page }) => {
  // ステップ1: モバイル画面サイズ（iPhone SE相当）に設定
  await page.setViewportSize({ width: 375, height: 667 })

  // ステップ2: ハンバーガーメニューが表示されることを確認
  await expect(page.getByRole('button', { name: 'メニュー' })).toBeVisible()

  // ステップ3: メニューボタンをクリックしてナビゲーションを展開
  await page.getByRole('button', { name: 'メニュー' }).click()
})
```

#### エラーハンドリングテスト

```typescript
test('ネットワークエラー時の適切なエラー表示', async ({ page }) => {
  // ステップ1: ネットワークエラーをシミュレート
  await page.route('**/api/**', route => route.abort())

  // ステップ2: ページにアクセスしてAPIエラーを発生させる
  await page.goto('/data-plans')

  // ステップ3: エラーメッセージが表示されることを確認
  await expect(page.getByText('通信エラーが発生しました')).toBeVisible()
})
```

#### フォーム操作テスト

```typescript
test('申し込みフォームの入力と送信', async ({ page }) => {
  // ステップ1: 申し込みページにアクセス
  await page.goto('/signup')

  // ステップ2: 必須項目（氏名）を入力
  await page.fill('[name="fullName"]', '山田太郎')

  // ステップ3: 必須項目（メールアドレス）を入力
  await page.fill('[name="email"]', 'yamada@example.com')

  // ステップ4: 「申し込み」ボタンをクリックして送信
  await page.getByRole('button', { name: '申し込み' }).click()

  // ステップ5: 完了ページに遷移したことを確認
  await expect(page).toHaveURL('/signup/complete')
})
```

### 適用範囲

- **対象ファイル**: 全てのE2Eテストファイル（`e2e/*.spec.ts`）
- **新規作成**: 新規作成するテストケース
- **既存更新**: 既存テストの更新・修正時
- **レビュー**: プルリクエストレビュー時の確認項目

### メンテナンス指針

#### レビュー時のチェックポイント

- [ ] 各ステップに適切な日本語コメントが付与されている
- [ ] テスト名とdescribe名が日本語で記述されている
- [ ] 操作内容が直感的に理解できる説明になっている
- [ ] expectアサーションの目的が明確に説明されている

#### 更新時の注意点

- 機能変更時にコメント内容も合わせて更新する
- 新しいUIパターンに対応した説明を追加する
- 定期的にコメント内容の正確性を検証する

### 実装例

実際の実装例として、以下のファイルを参考にする：

- `e2e/smartphone-options-mcp.spec.ts` - オプション選択フローの日本語化実装
- `e2e/signup-flow-mcp.spec.ts` - 申し込みフローの日本語化実装
- `e2e/header-navigation-mcp.spec.ts` - ナビゲーションテストの日本語化実装

## 実装チェックリスト

### MCPサーバーテスト作成時

- [ ] MCPサーバーが必要な理由を明確化
- [ ] エラーハンドリングを実装
- [ ] ファイル名に `-mcp` サフィックスを付与
- [ ] 意味のあるスクリーンショットファイル名を使用
- [ ] テストの独立性を確保
- [ ] 標準Playwrightでも実行可能な部分を分離
- [ ] **日本語ステップコメントを追加**
- [ ] **テスト名を日本語で記述**

### 標準Playwrightテスト作成時

- [ ] MCPサーバーが本当に不要かを確認
- [ ] 基本的な機能テストに集中
- [ ] パフォーマンスを重視
- [ ] シンプルな実装を心がける
- [ ] **日本語ステップコメントを追加**
- [ ] **テスト名を日本語で記述**

## トラブルシューティング

### よくある問題

#### 1. MCPサーバー接続エラー

```
Error: Command failed: mcp-cli tool call browser_take_screenshot
```

**解決方法**:

- MCPサーバーの起動状態を確認
- 設定ファイルの確認
- エラーハンドリングが適切に実装されているか確認

#### 2. スクリーンショット撮影失敗

```
MCP screenshot failed for filename.png: No current snapshot available
```

**解決方法**:

- ブラウザの状態を確認
- ページロード完了を待機
- エラーハンドリングによりテストは継続実行

#### 3. 環境依存の問題

**解決方法**:

- 環境変数の設定確認
- MCPサーバーの設定確認
- フォールバック処理の実装確認

## 今後の拡張

### 新しいMCPツールの追加

1. 新しいツールの調査
2. ヘルパー関数の作成
3. エラーハンドリングの実装
4. ドキュメントの更新

### パフォーマンス最適化

- スクリーンショット撮影の最適化
- 並列実行の検討
- キャッシュ機能の活用

### CI/CD統合

- MCPサーバーの自動設定
- アーティファクトの管理
- レポート生成の自動化

## 参考資料

- [Playwright公式ドキュメント](https://playwright.dev/)
- [MCP Protocol仕様](https://modelcontextprotocol.io/)
- [既存のE2Eテスト実装例](../e2e/)

## 関連ファイル

- `e2e/signup-flow-mcp.spec.ts` - 申し込みフローのMCPテスト
- `e2e/responsive-accessibility-mcp.spec.ts` - レスポンシブ・アクセシビリティテスト
- `e2e/error-handling-mcp.spec.ts` - エラーハンドリングテスト
- `e2e/header-navigation-mcp.spec.ts` - ヘッダーナビゲーションテスト
- `e2e/sim-check-flow-mcp.spec.ts` - SIMチェックフローテスト
