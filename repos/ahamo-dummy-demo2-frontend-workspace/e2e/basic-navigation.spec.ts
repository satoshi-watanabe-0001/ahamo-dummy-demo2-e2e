import { test, expect } from '@playwright/test'

test.describe('基本ナビゲーション', () => {
  test('ホームページが正しく表示される', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/ahamo/)
    await expect(page.getByRole('heading', { name: 'シンプルでお得な料金プラン' })).toBeVisible()
  })

  test('申し込みページへの遷移が動作する', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: 'メニューを開く' })
    await expect(menuButton).toBeVisible()
    await menuButton.click()

    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: '申し込み' }).first().click()
    await expect(page).toHaveURL('/signup')
    await expect(page.getByText('ahamo お申し込み手続き')).toBeVisible()
  })
})
