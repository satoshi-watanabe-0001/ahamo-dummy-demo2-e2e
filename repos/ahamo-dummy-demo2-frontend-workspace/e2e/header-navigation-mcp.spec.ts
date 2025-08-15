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

test.describe('ヘッダーナビゲーション（MCPサーバー使用）', () => {
  test('ホームページの基本要素確認', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('link', { name: 'ahamo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'メニューを開く' })).toBeVisible()
    await expect(page.getByRole('button', { name: '今すぐ申し込み 🚀' })).toBeVisible()

    await mcpTakeScreenshot('homepage-elements.png')
  })

  test('モバイルメニューから申し込みページ遷移', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: 'メニューを開く' })
    await expect(menuButton).toBeVisible()
    await menuButton.click()

    await page.waitForTimeout(1000)

    await page.getByRole('navigation').getByRole('button', { name: '申し込み' }).click()
    await expect(page).toHaveURL('/signup')
    await expect(page.getByText('ahamo お申し込み手続き')).toBeVisible()

    await mcpTakeScreenshot('mobile-signup-navigation.png')
  })

  test('フッターナビゲーションの確認', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: '料金プラン' })
    ).toBeVisible()
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'よくある質問' })
    ).toBeVisible()

    await mcpTakeScreenshot('footer-navigation.png')
  })

  test('モバイルハンバーガーメニューの動作', async ({ page }) => {
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

    await mcpTakeScreenshot('mobile-hamburger-menu.png')
  })
})
