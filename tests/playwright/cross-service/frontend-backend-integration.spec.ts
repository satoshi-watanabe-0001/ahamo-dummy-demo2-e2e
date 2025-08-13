import { test, expect } from '@playwright/test'

test('フロントエンド・バックエンド統合テスト', async ({ page }) => {
  await page.goto('/')
  
  await page.route('**/api/smartphones', async route => {
    const response = await page.request.get('http://localhost:3001/api/smartphones')
    route.fulfill({
      status: response.status(),
      body: await response.body()
    })
  })
  
  await page.reload()
  
  const smartphoneList = page.locator('[data-testid="smartphone-list"]')
  await expect(smartphoneList).toBeVisible()
  
  const smartphoneItems = smartphoneList.locator('[data-testid="smartphone-item"]')
  await expect(smartphoneItems).toHaveCountGreaterThan(0)
})

test('認証状態の維持確認', async ({ page, context }) => {
  await page.goto('/login')
  
  await page.fill('[data-testid="username"]', 'testuser')
  await page.fill('[data-testid="password"]', 'password')
  await page.click('[data-testid="login-button"]')
  
  await page.waitForURL('/')
  
  const newPage = await context.newPage()
  await newPage.goto('/')
  
  await expect(newPage.getByText('ログイン済み')).toBeVisible()
})
