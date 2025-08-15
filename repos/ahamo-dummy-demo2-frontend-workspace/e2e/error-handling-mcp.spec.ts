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

test.describe('エラーハンドリングとローディング状態（MCPサーバー使用）', () => {
  test('スマートフォン選択ページの表示確認', async ({ page }) => {
    await page.goto('/smartphone-selection')

    await expect(page.getByText('スマホの選択')).toBeVisible()
    await expect(page.getByText('iPhone')).toBeVisible()
    await expect(page.getByText('Android')).toBeVisible()
    await expect(page.getByText('ドコモ認定リユース品')).toBeVisible()

    await mcpTakeScreenshot('smartphone-selection-page.png')
  })

  test('iPhoneページでのエラー状態確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')

    await expect(page.getByText('エラーが発生しました')).toBeVisible()

    await mcpTakeScreenshot('iphone-error-state.png')
  })

  test('申し込みページのナビゲーション確認', async ({ page }) => {
    await page.goto('/signup')

    await expect(page.getByText('ahamo お申し込み手続き')).toBeVisible()
    await expect(page.getByText('新しい電話番号を発行する')).toBeVisible()
    await expect(page.getByText('今の電話番号をそのまま使う')).toBeVisible()

    await mcpTakeScreenshot('signup-page-navigation.png')
  })

  test('SIMチェックページの表示確認', async ({ page }) => {
    await page.goto('/sim-check')

    await expect(page.getByRole('heading', { name: '申し込み前に準備してください' })).toBeVisible()
    await expect(page.getByRole('heading', { name: '本人確認書類' }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'お支払い方法をご準備ください' })).toBeVisible()

    await mcpTakeScreenshot('sim-check-page-display.png')
  })
})
