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

test.describe('SIMチェック準備フロー（MCPサーバー使用）', () => {
  test('本人確認書類の準備確認', async ({ page }) => {
    await page.goto('/sim-check')
    await expect(page.getByRole('heading', { name: '申し込み前に準備してください' })).toBeVisible()

    await expect(page.getByRole('heading', { name: '本人確認書類' }).first()).toBeVisible()
    await expect(
      page.getByText('申し込み時に本人確認書類が必要です。不備がないよう、事前にご確認ください。')
    ).toBeVisible()

    await expect(page.getByText('運転免許証').first()).toBeVisible()
    await expect(page.getByText('マイナンバーカード').first()).toBeVisible()

    await mcpTakeScreenshot('sim-check-documents.png')
  })

  test('現住所確認セクションの表示', async ({ page }) => {
    await page.goto('/sim-check')

    await expect(page.getByText('現住所と同じ住所ですか？')).toBeVisible()

    await mcpTakeScreenshot('sim-check-address.png')
  })

  test('支払い方法準備セクションの確認', async ({ page }) => {
    await page.goto('/sim-check')

    await expect(page.getByRole('heading', { name: 'お支払い方法をご準備ください' })).toBeVisible()
    await expect(page.getByText('ご利用可能なお支払い方法')).toBeVisible()
    await expect(
      page.getByText('クレジットカード（VISA、Mastercard、JCB、American Express）')
    ).toBeVisible()
    await expect(page.getByText('口座振替（金融機関のキャッシュカード）')).toBeVisible()

    await mcpTakeScreenshot('sim-check-payment.png')
  })

  test('MNP予約番号についての説明確認', async ({ page }) => {
    await page.goto('/sim-check')

    await expect(page.getByText('他社からお乗り換えの方')).toBeVisible()
    await expect(page.getByText('MNP予約番号について')).toBeVisible()
    await expect(page.getByText('現在お使いの電話番号をそのままご利用になる場合')).toBeVisible()

    await mcpTakeScreenshot('sim-check-mnp.png')
  })

  test('ナビゲーションボタンの動作確認', async ({ page }) => {
    await page.goto('/sim-check')

    const backButton = page.getByText('戻る')
    await expect(backButton).toBeVisible()

    const proceedButton = page.getByText('準備完了・申し込みへ進む')
    await expect(proceedButton).toBeVisible()

    await proceedButton.click()
    await expect(page).toHaveURL('/smartphone-selection')
  })
})
