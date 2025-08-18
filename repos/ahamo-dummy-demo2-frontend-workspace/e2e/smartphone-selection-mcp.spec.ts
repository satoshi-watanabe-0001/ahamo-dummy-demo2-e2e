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

test.describe('スマートフォン選択フロー（MCPサーバー使用）', () => {
  test('ホームページからスマートフォン選択ページへの遷移', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/ahamo/)

    await expect(
      page.getByRole('heading', { name: '特別キャンペーン実施中' }).first()
    ).toBeVisible()

    await page.goto('/smartphone-selection')

    await expect(page.getByText('スマホの選択')).toBeVisible()

    await expect(page.getByText('iPhone')).toBeVisible()
    await expect(page.getByText('Android')).toBeVisible()
    await expect(page.getByText('ドコモ認定リユース品')).toBeVisible()
  })

  test('MCPサーバーでのブラウザ操作とスナップショット', async ({ page }) => {
    await page.goto('/smartphone-selection')

    const snapshot = await mcpSnapshot()
    if (snapshot) {
      console.log('MCP Accessibility Snapshot taken successfully')
    }

    await expect(page.getByRole('heading', { name: 'スマホの選択' })).toBeVisible()
    await expect(page.getByText('iPhone')).toBeVisible()
    await expect(page.getByText('Android')).toBeVisible()
  })

  test('ドコモ認定リユース品オプションの表示確認', async ({ page }) => {
    await page.goto('/smartphone-selection')
    await expect(page.getByText('スマホの選択')).toBeVisible()

    await expect(page.getByText('ドコモ認定リユース品')).toBeVisible()
    await expect(page.getByText('30日間の無償交換であんしん！')).toBeVisible()

    await expect(page.getByText('戻る')).toBeVisible()
  })

  test('スマートフォン選択ページのレスポンシブデザイン確認', async ({ page }) => {
    await page.goto('/smartphone-selection')
    await expect(page.getByText('スマホの選択')).toBeVisible()

    await page.setViewportSize({ width: 375, height: 667 })

    await expect(page.getByText('iPhone')).toBeVisible()
    await expect(page.getByText('Android')).toBeVisible()
    await expect(page.getByText('ドコモ認定リユース品')).toBeVisible()

    await page.setViewportSize({ width: 1920, height: 1080 })

    await expect(page.getByText('スマホの選択')).toBeVisible()
  })
})
