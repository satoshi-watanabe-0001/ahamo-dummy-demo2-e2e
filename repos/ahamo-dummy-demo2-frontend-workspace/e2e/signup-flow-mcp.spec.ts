import { test, expect } from '@playwright/test'

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

test.describe('申し込みフロー（MCPサーバー使用）', () => {
  test('新規電話番号での申し込みフロー', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.getByText('ahamo お申し込み手続き')).toBeVisible()

    await page.getByText('新しい電話番号を発行する').click()
    await expect(page.getByText('新規で電話番号を取得します')).toBeVisible()

    await expect(page.getByText('スマートフォンについて選択してください')).toBeVisible()

    await page.getByText('スマートフォンを一緒に買う').click()

    await expect(page.getByText('新規申し込みに移行します')).toBeVisible()

    const nextButton = page.getByText('次へ')
    await expect(nextButton).toBeVisible()

    await mcpTakeScreenshot('signup-new-phone-flow.png')
  })

  test('電話番号継続でドコモからの乗り換えフロー', async ({ page }) => {
    await page.goto('/signup')

    await page.getByText('今の電話番号をそのまま使う').click()

    await expect(page.getByText('現在のキャリアを選択してください')).toBeVisible()

    await page.getByRole('button', { name: 'docomo ドコモからのプラン変更' }).click()

    await expect(page.getByText('プラン変更手続きに移行します')).toBeVisible()

    await mcpTakeScreenshot('signup-docomo-plan-change.png')
  })

  test('他社からの乗り換えで端末購入なしフロー', async ({ page }) => {
    await page.goto('/signup')

    await page.getByText('今の電話番号をそのまま使う').click()

    await page.getByText('docomo以外').click()

    await page.getByText('スマートフォンは買わない').click()

    await expect(page.getByText('SIMの種類を選択してください')).toBeVisible()

    await page.getByRole('button', { name: 'SIMカード 物理SIMカード（郵送でお届け）' }).click()

    await expect(page.getByText('乗り換え手続きを行います')).toBeVisible()

    await mcpTakeScreenshot('signup-carrier-switch-no-device.png')
  })

  test('申し込みフローのナビゲーションテスト', async ({ page }) => {
    await page.goto('/signup')

    const backButton = page.getByText('サイトトップへ戻る')
    await expect(backButton).toBeVisible()

    await page.getByText('新しい電話番号を発行する').click()
    await page.getByText('スマートフォンを一緒に買う').click()

    await page.getByText('次へ').click()
    await expect(page).toHaveURL('/sim-check')

    await mcpSnapshot()
  })
})
