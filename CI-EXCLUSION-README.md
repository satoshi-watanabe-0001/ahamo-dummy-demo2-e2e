# E2E統合テストのCI除外設定

## 概要

E2E統合テストはCI環境での自動実行から除外されており、ローカル環境でのみ実行可能です。

## CI除外の理由

- E2E統合テストは環境依存性が高く、CI環境での安定した実行が困難
- テスト実行時間が長く、CI/CDパイプラインの効率性に影響
- ローカル開発環境での品質保証を重視

## ローカルでのテスト実行方法

### 1. 環境セットアップ

```bash
# 依存関係のインストール
npm install

# Playwrightブラウザのインストール
npx playwright install
```

### 2. Docker環境の起動

```bash
# E2E環境の起動
docker compose -f docker-compose.e2e.yml up -d

# サービスの起動確認（60秒程度待機）
sleep 60
```

### 3. テストの実行

```bash
# 全E2Eテストの実行
npm run test:e2e

# 個別APIテストの実行
npm run test:content-api          # content-service API テスト
npm run test:application-api      # application-service API テスト
npm run test:gateway-integration  # API Gateway 統合テスト

# クロスサービステストの実行
npm run test:cross-service

# ヘッドレスモードでの実行
npm run test:headed

# デバッグモードでの実行
npm run test:debug
```

### 4. 環境のクリーンアップ

```bash
# Docker環境の停止・削除
docker compose -f docker-compose.e2e.yml down -v
```

## CI設定の詳細

### 修正されたワークフローファイル

1. **`.github/workflows/e2e-pr-ci.yaml`**
   - テスト実行ステップをスキップに変更
   - 環境セットアップは維持（設定検証のため）

2. **`.github/workflows/e2e-integration.yaml`**
   - マトリックステスト実行をスキップに変更
   - ダミー結果ファイルを生成

3. **`.github/workflows/e2e-caller.yaml`**
   - 自動実行トリガーを手動実行のみに変更
   - `workflow_dispatch`で強制実行オプションを追加

## 手動でのCI実行

必要に応じて、GitHub Actionsの「Actions」タブから手動でE2Eテストを実行できます：

1. `E2E Testing Pipeline`ワークフローを選択
2. 「Run workflow」をクリック
3. `force_run`を`true`に設定して実行

## 注意事項

- ローカル環境でのテスト実行前に、必ずDocker環境が正常に起動していることを確認してください
- テスト実行中はDocker環境を停止しないでください
- テスト完了後は環境のクリーンアップを忘れずに実行してください
