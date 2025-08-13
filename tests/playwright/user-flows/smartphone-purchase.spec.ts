import { test, expect } from '@playwright/test'

test('スマートフォン購入フロー', async ({ page }) => {
  await page.goto('/')
  
  await expect(page.getByText('特別キャンペーン実施中')).toBeVisible()
  
  await page.goto('/smartphone-selection')
  await expect(page.getByText('スマホの選択')).toBeVisible()
  
  await page.click('text=iPhone')
  
  await expect(page).toHaveURL(/\/smartphones\/iphone/)
})

test('認証フロー', async ({ page }) => {
  await page.goto('/login')
  
  await expect(page.getByText('ログイン')).toBeVisible()
  await expect(page.getByText('ahamoアカウントにログインしてください')).toBeVisible()
  
  await page.fill('#email', 'test@example.com')
  await page.fill('#password', 'password123')
  
  await page.click('button[type="submit"]')
  
  await page.waitForURL('/')
  await expect(page.getByText('特別キャンペーン実施中')).toBeVisible()
})
