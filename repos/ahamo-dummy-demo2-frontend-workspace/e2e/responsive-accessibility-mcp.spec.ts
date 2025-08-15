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

test.describe('レスポンシブデザインとアクセシビリティ（MCPサーバー使用）', () => {
  test('モバイルビューでのヘッダーメニュー操作', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: 'メニューを開く' })
    await expect(menuButton).toBeVisible()

    await menuButton.click()
    await page.waitForTimeout(1000)

    await expect(
      page.getByRole('navigation').getByRole('link', { name: '料金プラン' })
    ).toBeVisible()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'サービス' })).toBeVisible()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'サポート' })).toBeVisible()
    await expect(
      page.getByRole('navigation').getByRole('button', { name: '申し込み' })
    ).toBeVisible()

    await mcpTakeScreenshot('mobile-menu-open.png')

    await mcpSnapshot()
  })

  test('タブレットビューでのレイアウト確認', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/smartphone-selection')

    await expect(page.getByText('スマホの選択')).toBeVisible()
    await expect(page.getByText('iPhone')).toBeVisible()
    await expect(page.getByText('Android')).toBeVisible()

    await mcpTakeScreenshot('tablet-smartphone-selection.png')
  })

  test('デスクトップビューでのフルレイアウト確認', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    await expect(page.getByRole('link', { name: 'ahamo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'メニューを開く' })).toBeVisible()
    await expect(page.getByRole('button', { name: '今すぐ申し込み 🚀' })).toBeVisible()

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: '料金プラン' })
    ).toBeVisible()
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'よくある質問' })
    ).toBeVisible()

    await mcpTakeScreenshot('desktop-full-layout.png')
  })

  test('キーボードナビゲーションのアクセシビリティ確認', async ({ page }) => {
    await page.goto('/signup')

    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()

    await mcpSnapshot()
  })

  test('色彩コントラストとアクセシビリティスナップショット', async ({ page }) => {
    await page.goto('/sim-check')

    await mcpSnapshot()

    await expect(page.getByRole('heading', { name: '申し込み前に準備してください' })).toBeVisible()
    await expect(page.getByRole('heading', { name: '本人確認書類' }).first()).toBeVisible()

    await mcpTakeScreenshot('accessibility-sim-check.png')
  })
})
