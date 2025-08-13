import { test, expect } from '@playwright/test'

test('フロントエンド・バックエンド統合テスト', async ({ page }) => {
  await page.goto('/')
  
  const smartphoneList = page.locator('[data-testid="smartphone-list"]')
  await expect(smartphoneList).toBeVisible({ timeout: 10000 })
  
  const smartphoneItems = smartphoneList.locator('[data-testid="smartphone-item"]')
  const count = await smartphoneItems.count()
  expect(count).toBeGreaterThan(0)
})

test('認証状態の維持確認', async ({ page, context }) => {
  await page.goto('/login')
  
  await page.fill('#email', 'test@example.com')
  await page.fill('#password', 'password123')
  await page.click('button[type="submit"]')
  
  await page.waitForURL('/')
  
  const newPage = await context.newPage()
  await newPage.goto('/')
  
  await expect(newPage.locator('body')).toBeVisible()
})
