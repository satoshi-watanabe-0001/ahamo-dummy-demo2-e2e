# API結合テスト指針

## 概要

このドキュメントでは、ahamo-dummy-demo2-frontend-workspaceプロジェクトにおけるAPI結合テストの実装指針とベストプラクティスを説明します。

## テスト基盤アーキテクチャ

### MSW (Mock Service Worker) の活用

- **本番環境**: 実際のAPIエンドポイント
- **開発環境**: MSWによるモックAPI
- **テスト環境**: MSWによる制御されたモックレスポンス
- **Storybook**: MSWによるコンポーネント単体テスト

### ディレクトリ構造

```
src/
├── mocks/
│   ├── handlers.ts          # MSWハンドラー定義
│   ├── server.ts           # Node.js環境用MSWサーバー
│   └── browser.ts          # ブラウザ環境用MSWワーカー
├── __tests__/
│   └── integration/
│       ├── api/            # APIサービス層のテスト
│       ├── hooks/          # カスタムフックのテスト
│       └── pages/          # ページコンポーネントのテスト
└── services/
    └── api.ts              # APIサービス層
```

## テスト分類

### 1. APIサービス層テスト (`src/__tests__/integration/api/`)

**目的**: APIサービスクラスの動作確認

**テスト対象**:

- API呼び出しの成功パターン
- エラーハンドリング
- パラメータの正しい処理
- レスポンスデータの構造検証

**例**:

```typescript
describe('SmartphoneApiService', () => {
  it('should fetch smartphones successfully', async () => {
    const response = await SmartphoneApiService.getSmartphones(1, 10)
    expect(response.status).toBe('success')
    expect(response.data.smartphones).toHaveLength(9)
  })
})
```

### 2. カスタムフックテスト (`src/__tests__/integration/hooks/`)

**目的**: React hooksとAPIの統合動作確認

**テスト対象**:

- ローディング状態の管理
- エラー状態の処理
- データの正しい更新
- 再取得機能

**例**:

```typescript
describe('useSmartphones', () => {
  it('should load smartphones successfully', async () => {
    const { result } = renderHook(() => useSmartphones())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.smartphones).toHaveLength(9)
  })
})
```

### 3. ページコンポーネントテスト (`src/__tests__/integration/pages/`)

**目的**: ページ全体の統合動作確認

**テスト対象**:

- ページの正しいレンダリング
- ローディング・エラー状態の表示
- ユーザーインタラクション
- ナビゲーション機能

## テストシナリオ設計

### 基本シナリオ

1. **正常系**
   - データの正常取得
   - 正しいUI表示
   - 期待される動作

2. **異常系**
   - ネットワークエラー
   - APIエラーレスポンス
   - データ不整合

3. **境界値**
   - 空データ
   - 大量データ
   - 不正パラメータ

### エラーハンドリングテスト

```typescript
import { errorHandlers } from '@/mocks/handlers'

it('should handle API errors gracefully', async () => {
  server.use(...errorHandlers)
  const response = await SmartphoneApiService.getSmartphones(1, 10)
  expect(response.status).toBe('error')
})
```

## MSWハンドラー実装パターン

### 基本的なハンドラー

```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/smartphones', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')

    return HttpResponse.json({
      data: { smartphones: mockData, total: 10, page, limit: 10 },
      status: 'success',
    })
  }),
]
```

### エラーシミュレーション

```typescript
export const errorHandlers = [
  http.get('/api/smartphones', () => {
    return HttpResponse.json({ status: 'error', message: 'Network error' }, { status: 500 })
  }),
]
```

## テスト実行

### コマンド

```bash
# 全テスト実行
npm test

# 統合テストのみ実行
npm run test:integration

# 特定のテストファイル実行
npm test -- smartphone-api.test.ts

# カバレッジ付きテスト実行
npm run test:ci
```

### CI/CD統合

- GitHub Actionsでの自動テスト実行
- プルリクエスト時の必須チェック
- カバレッジレポートの生成

## ベストプラクティス

### 1. テストデータ管理

- `src/lib/mockData.ts`の既存データを活用
- テスト専用のモックデータは最小限に
- 実際のAPIレスポンス構造に準拠

### 2. テストの独立性

- 各テストは独立して実行可能
- `beforeEach`でのクリーンアップ
- MSWハンドラーのリセット

### 3. 非同期処理

- `waitFor`を使用した適切な待機
- タイムアウト設定の調整
- Promise解決の確実な待機

### 4. エラーテスト

- 様々なエラーパターンの網羅
- ユーザーフレンドリーなエラーメッセージの確認
- 復旧可能なエラーの処理

## 今後の拡張

### 新しいAPIエンドポイントの追加

1. `src/mocks/handlers.ts`にハンドラー追加
2. `src/services/api.ts`にサービスメソッド追加
3. 対応する統合テストの作成
4. エラーハンドラーの実装

### パフォーマンステスト

- レスポンス時間の測定
- 大量データでの動作確認
- メモリリークの検出

### E2Eテストとの連携

- Playwrightとの統合
- 実際のブラウザでの動作確認
- ユーザーシナリオの自動化

## 参考資料

- [MSW公式ドキュメント](https://mswjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest公式ドキュメント](https://jestjs.io/)
