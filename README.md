# ahamo-dummy-demo2-e2e

Next.js + Java環境でのE2E試験専用リポジトリ

## 概要

フロントエンド・バックエンド間の実際の通信を行うE2Eテストを実施するための専用リポジトリです。

## アーキテクチャ

- **フロントエンド**: Next.js (ポート3000)
- **API Gateway**: Spring Boot (ポート3001)
- **認証サービス**: Spring Boot (ポート8080)
- **データベース**: PostgreSQL (ポート5432)

## ディレクトリ構成

```
ahamo-dummy-demo2-e2e/
├── docker-compose.e2e.yml          # E2E環境統合設定
├── .github/workflows/
│   ├── e2e-caller.yaml             # 標準パイプライン呼び出し
│   └── e2e-integration.yaml        # E2E専用統合ワークフロー
├── tests/
│   ├── playwright/                 # E2Eテストスイート
│   │   ├── user-flows/             # ユーザーフローテスト
│   │   ├── api-integration/        # API統合テスト
│   │   └── cross-service/          # サービス間連携テスト
├── containers/
│   ├── frontend/                   # フロントエンドコンテナ設定
│   ├── backend/                    # バックエンドコンテナ設定
│   └── shared/                     # 共通設定・データベース
├── ci-config.yaml                  # 標準パイプライン設定
└── playwright.config.ts            # Playwright設定
```

## 実行方法

### 環境起動

```bash
# E2E環境起動
npm run docker:up

# ログ確認
npm run docker:logs

# ヘルスチェック
npm run health-check
```

### テスト実行

```bash
# 全E2Eテスト実行
npm run test:e2e

# ユーザーフローテストのみ
npm run test:user-flows

# API統合テストのみ
npm run test:api-integration

# サービス間連携テストのみ
npm run test:cross-service

# UIモードでテスト実行
npm run test:e2e:ui

# デバッグモードでテスト実行
npm run test:e2e:debug
```

### 環境停止

```bash
# E2E環境停止・クリーンアップ
npm run docker:down
```

## CI/CD統合

このリポジトリは`sample001`の標準パイプラインパターンを活用しています：

- **e2e-caller.yaml**: 標準パイプラインの呼び出し
- **e2e-integration.yaml**: E2E専用の統合テストワークフロー
- **ci-config.yaml**: 標準パイプライン設定

## テスト戦略

### 個別リポジトリとの分離

- **フロントエンド・バックエンド各リポジトリ**: モック通信でのテスト
- **E2E専用リポジトリ**: コンテナ化された実環境での通信テスト

### テストカテゴリ

1. **ユーザーフローテスト** (`user-flows/`)
   - スマートフォン購入フロー
   - 認証フロー
   - エラーハンドリング

2. **API統合テスト** (`api-integration/`)
   - 認証API統合テスト
   - スマートフォンAPI統合テスト
   - エラーレスポンステスト

3. **サービス間連携テスト** (`cross-service/`)
   - フロントエンド・バックエンド統合
   - 認証状態の維持確認
   - セッション管理テスト

## 品質基準

| メトリクス | 目標値 | 監視方法 |
|-----------|--------|----------|
| E2Eテスト成功率 | ≥95% | GitHub Actions |
| API応答時間 | ≤500ms | Playwright監視 |
| ブラウザ互換性 | Chrome/Firefox/Safari | マトリックス実行 |
| コンテナ起動時間 | ≤60秒 | Docker Compose |

## 開発ガイドライン

### 新しいテストの追加

1. 適切なカテゴリディレクトリにテストファイルを作成
2. `playwright.config.ts`の設定に従ってテストを記述
3. データベース初期化が必要な場合は`containers/shared/init.sql`を更新

### Docker設定の変更

1. `docker-compose.e2e.yml`でサービス設定を更新
2. 必要に応じて`containers/`以下のDockerfileを修正
3. 環境変数は`ci-config.yaml`で管理

## トラブルシューティング

### よくある問題

1. **コンテナ起動失敗**
   ```bash
   docker-compose -f docker-compose.e2e.yml logs
   ```

2. **テスト実行失敗**
   ```bash
   npm run test:e2e:debug
   ```

3. **ポート競合**
   ```bash
   docker-compose -f docker-compose.e2e.yml down -v
   ```

### ログ確認

```bash
# 全サービスのログ
npm run docker:logs

# 特定サービスのログ
docker-compose -f docker-compose.e2e.yml logs frontend
docker-compose -f docker-compose.e2e.yml logs auth-service
```

## マルチリポジトリビルド

このE2E環境は、CI実行時に別リポジトリのソースコードを動的にチェックアウトしてコンテナをビルドします：

- **フロントエンド**: `ahamo-dummy-demo2-frontend-workspace` (Next.js standalone build)
- **API Gateway**: `ahamo-dummy-demo2-api-gateway-service` (プレースホルダー実装)
- **認証サービス**: `-satoshi-watanabe-0001-ahamo-dummy-demo2-auth-service` (Spring Boot)

### ローカル実行

```bash
# リポジトリディレクトリを作成
mkdir -p repos

# 各リポジトリをクローン
git clone https://github.com/satoshi-watanabe-0001/ahamo-dummy-demo2-frontend-workspace.git repos/ahamo-dummy-demo2-frontend-workspace
git clone https://github.com/satoshi-watanabe-0001/ahamo-dummy-demo2-api-gateway-service.git repos/ahamo-dummy-demo2-api-gateway-service
git clone https://github.com/satoshi-watanabe-0001/-satoshi-watanabe-0001-ahamo-dummy-demo2-auth-service.git repos/-satoshi-watanabe-0001-ahamo-dummy-demo2-auth-service

# E2E環境起動
docker-compose -f docker-compose.e2e.yml up -d
```

### 前提条件

各リポジトリにDockerfileが存在している必要があります。フロントエンドリポジトリには`Dockerfile.e2e`を配置してください。

## 関連リポジトリ

- [ahamo-dummy-demo2-frontend-workspace](https://github.com/satoshi-watanabe-0001/ahamo-dummy-demo2-frontend-workspace)
- [ahamo-dummy-demo2-auth-service](https://github.com/satoshi-watanabe-0001/-satoshi-watanabe-0001-ahamo-dummy-demo2-auth-service)
- [ahamo-dummy-demo2-system-design-docs](https://github.com/satoshi-watanabe-0001/ahamo-dummy-demo2-system-design-docs)
- [sample001](https://github.com/satoshi-watanabe-0001/sample001)
# CI test after organization setting fix
# Additional CI test - Tue Aug 19 07:59:11 UTC 2025
