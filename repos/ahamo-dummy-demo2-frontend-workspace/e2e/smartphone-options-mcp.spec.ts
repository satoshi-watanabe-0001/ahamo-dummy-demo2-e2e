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

test.describe('スマートフォンオプション選択フロー（MCPサーバー使用）', () => {
  test('端末選択からオプション選択ページへの遷移', async ({ page }) => {
    await page.goto('/smartphones/1')

    await expect(page.getByText('iPhone 16e')).toBeVisible()
    await expect(page.getByRole('button', { name: 'この機種で申し込む' })).toBeVisible()

    await page.getByRole('button', { name: 'この機種で申し込む' }).click()

    await expect(page).toHaveURL(/\/smartphone-options\/\d+/)
    await expect(page.getByText('データ通信量・オプションの選択')).toBeVisible()

    await mcpTakeScreenshot('options-page-initial.png')
  })

  test('データプランオプションの選択と価格更新', async ({ page }) => {
    await page.goto('/smartphone-options/1')

    await expect(page.getByRole('heading', { name: 'データ通信量', exact: true })).toBeVisible()
    await expect(page.getByText('支払い金額シミュレーション')).toBeVisible()

    await page.getByRole('button', { name: '30GB' }).click()
    await expect(page.getByText('2,974円')).toBeVisible()

    await page.getByRole('button', { name: '110GB 大盛り' }).click()

    await expect(page.getByText('4,954円')).toBeVisible()

    await mcpTakeScreenshot('data-plan-selected.png')
  })

  test('ボイスオプションの選択と価格計算', async ({ page }) => {
    await page.goto('/smartphone-options/1')

    await expect(page.getByText('ボイスオプション')).toBeVisible()

    await page.getByRole('button', { name: '30GB' }).click()

    await page
      .getByText('ボイスオプション')
      .locator('..')
      .getByRole('button', { name: '申し込む' })
      .click()

    await expect(page.getByText('5,174円')).toBeVisible()

    await mcpTakeScreenshot('voice-option-selected.png')
  })

  test('かけ放題オプションの選択', async ({ page }) => {
    await page.goto('/smartphone-options/1')

    await expect(page.getByText('かけ放題オプション')).toBeVisible()

    await page.getByRole('button', { name: '30GB' }).click()

    await page
      .getByText('かけ放題オプション')
      .locator('..')
      .getByRole('button', { name: '申し込む' })
      .click()

    await expect(page.getByText('3,974円')).toBeVisible()

    await mcpTakeScreenshot('overseas-option-selected.png')
  })

  test('全オプション選択時の価格計算', async ({ page }) => {
    await page.goto('/smartphone-options/1')

    await page.getByRole('button', { name: '110GB 大盛り' }).click()

    await page
      .getByText('ボイスオプション')
      .locator('..')
      .getByRole('button', { name: '申し込む' })
      .click()

    await page
      .getByText('かけ放題オプション')
      .locator('..')
      .getByRole('button', { name: '申し込む' })
      .click()

    await expect(page.getByText('8,154円')).toBeVisible()

    const signupButton = page.getByRole('button', { name: '次へ' })
    await expect(signupButton).toBeVisible()
    await expect(signupButton).toBeEnabled()

    await mcpTakeScreenshot('all-options-selected.png')
  })

  test('申し込み手続きページへの遷移', async ({ page }) => {
    await page.goto('/smartphone-options/1')

    await page.getByRole('button', { name: '30GB' }).click()

    await page.getByRole('button', { name: '次へ' }).click()

    await expect(page).toHaveURL('/signup')
    await expect(page.getByText('ahamo お申し込み手続き')).toBeVisible()

    await mcpTakeScreenshot('signup-page-navigation.png')
  })

  test('レスポンシブデザインの確認（モバイル）', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/smartphone-options/1')

    await expect(page.getByText('データ通信量・オプションの選択')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'データ通信量', exact: true })).toBeVisible()
    await expect(page.getByText('ボイスオプション')).toBeVisible()
    await expect(page.getByText('かけ放題オプション')).toBeVisible()
    await expect(page.getByText('支払い金額シミュレーション')).toBeVisible()

    await page.getByRole('button', { name: '30GB' }).click()
    await expect(page.getByText('2,974円')).toBeVisible()

    await mcpTakeScreenshot('mobile-options-page.png')
  })

  test('エラーハンドリング：無効なdeviceId', async ({ page }) => {
    await page.goto('/smartphone-options/999')

    await page.waitForTimeout(2000)

    await mcpTakeScreenshot('invalid-device-id.png')
  })

  test('価格シミュレーション詳細の表示', async ({ page }) => {
    await page.goto('/smartphone-options/1')

    await page.getByRole('button', { name: '30GB' }).click()

    await expect(page.getByText('ユニバーサルサービス料')).toBeVisible()
    await expect(page.getByText('電話リレーサービス料')).toBeVisible()

    await expect(page.getByText('3円')).toBeVisible()
    await expect(page.getByText('1円')).toBeVisible()

    await mcpTakeScreenshot('price-simulation-details.png')
  })

  test('オプション選択状態の視覚的フィードバック', async ({ page }) => {
    await page.goto('/smartphone-options/1')

    const dataPlanButton = page.getByRole('button', { name: '30GB' })

    await dataPlanButton.click()

    await expect(dataPlanButton).toHaveClass(/border-orange-500/)

    await expect(dataPlanButton).toHaveClass(/bg-gradient-to-br/)

    await mcpTakeScreenshot('option-selection-feedback.png')
  })
})
