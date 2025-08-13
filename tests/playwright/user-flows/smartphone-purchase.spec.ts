import { test, expect } from '@playwright/test'

test('スマートフォン購入フロー', async ({ page }) => {
  await page.goto('/')
  
  await page.click('[data-testid="smartphone-select"]')
  
  const response = await page.waitForResponse('**/api/smartphones/**')
  expect(response.status()).toBe(200)
  
  await page.click('[data-testid="purchase-button"]')
  await expect(page.getByText('購入完了')).toBeVisible()
})

test('認証フロー', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('[data-testid="username"]', 'testuser')
  await page.fill('[data-testid="password"]', 'password')
  await page.click('[data-testid="login-button"]')
  
  const response = await page.waitForResponse('**/api/auth/login')
  expect(response.status()).toBe(200)
  
  await expect(page.getByText('ログイン成功')).toBeVisible()
})
