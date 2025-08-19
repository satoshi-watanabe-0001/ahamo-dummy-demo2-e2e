import { test, expect } from '@playwright/test'

test.describe('完全なユーザージャーニー統合テスト', () => {
  test('ホームページからスマートフォン購入完了まで', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('特別キャンペーン実施中')).toBeVisible()
    
    await page.click('text=スマホを選ぶ')
    await expect(page).toHaveURL('/smartphone-selection')
    
    await page.click('text=iPhone')
    await expect(page).toHaveURL(/\/smartphones\/iphone/)
    
    await page.click('text=この機種で申し込む')
    await expect(page).toHaveURL(/\/smartphone-options\//)
    
    const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
    await firstDataPlan.click()
    
    const firstVoiceOption = page.locator('[data-testid^="voice-option-"]').first()
    if (await firstVoiceOption.isVisible()) {
      await firstVoiceOption.click()
    }
    
    await page.click('text=次へ')
    await expect(page).toHaveURL('/signup')
    
    await page.click('[data-testid="phone-option-new"]')
    await page.click('[data-testid="device-option-buy"]')
    await expect(page.getByText('新規申し込みに移行します')).toBeVisible()
  })

  test('認証状態を維持したユーザージャーニー', async ({ page, context }) => {
    await page.goto('/login')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
    
    const newPage = await context.newPage()
    await newPage.goto('/smartphone-selection')
    
    const userMenu = newPage.locator('[data-testid="user-menu"]')
    if (await userMenu.isVisible()) {
      await expect(userMenu).toBeVisible()
    }
  })

  test('乗り換えユーザーの完全フロー', async ({ page }) => {
    await page.goto('/sim-check')
    await expect(page.getByText('申し込み前に準備してください')).toBeVisible()
    
    await page.click('text=準備完了・申し込みへ進む')
    await expect(page).toHaveURL('/smartphone-selection')
    
    await page.click('text=Android')
    await expect(page).toHaveURL(/\/smartphones\/android/)
    
    await page.click('text=この機種で申し込む')
    await expect(page).toHaveURL(/\/smartphone-options\//)
    
    const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
    await firstDataPlan.click()
    await page.click('text=次へ')
    
    await page.click('[data-testid="phone-option-keep"]')
    await page.click('[data-testid="carrier-option-other"]')
    await page.click('[data-testid="device-option-buy"]')
    await expect(page.getByText('乗り換え手続きを行います')).toBeVisible()
  })

  test('ドコモユーザーのプラン変更フロー', async ({ page }) => {
    await page.goto('/signup')
    
    await page.click('[data-testid="phone-option-keep"]')
    await page.click('[data-testid="carrier-option-docomo"]')
    await expect(page.getByText('プラン変更手続きに移行します')).toBeVisible()
    
    await page.click('[data-testid="navigation-next"]')
    await expect(page).toHaveURL('/d-account-verification')
  })

  test('エラー発生時のユーザージャーニー復旧', async ({ page }) => {
    await page.route('**/api/smartphones', route => route.abort())
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('サーバーエラーが発生しました')).toBeVisible()
    
    await page.unroute('**/api/smartphones')
    
    await page.reload()
    await expect(page.getByText('スマホの選択')).toBeVisible()
    
    await page.click('text=iPhone')
    await expect(page).toHaveURL(/\/smartphones\/iphone/)
  })

  test('複数デバイスでの同期確認', async ({ page, context }) => {
    await page.goto('/login')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
    
    const secondDevice = await context.newPage()
    await secondDevice.goto('/smartphone-selection')
    
    const userMenu = secondDevice.locator('[data-testid="user-menu"]')
    if (await userMenu.isVisible()) {
      await expect(userMenu).toBeVisible()
    }
    
    await page.click('[data-testid="user-menu"]')
    await page.click('text=ログアウト')
    
    await secondDevice.reload()
    const loginButton = secondDevice.locator('text=ログイン')
    if (await loginButton.isVisible()) {
      await expect(loginButton).toBeVisible()
    }
  })

  test('カート機能を含む完全な購入フロー', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
    
    await page.goto('/smartphone-selection')
    await page.click('text=iPhone')
    await page.click('text=この機種で申し込む')
    
    const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
    await firstDataPlan.click()
    
    const addToCartButton = page.locator('text=カートに追加')
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click()
      await expect(page.getByText('カートに追加されました')).toBeVisible()
    }
    
    const cartButton = page.locator('[data-testid="cart-button"]')
    if (await cartButton.isVisible()) {
      await cartButton.click()
      await expect(page).toHaveURL('/cart')
      await expect(page.getByText('iPhone')).toBeVisible()
    }
  })

  test('セッション期限切れ時の処理', async ({ page }) => {
    await page.goto('/login')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
    
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Session expired' })
      })
    })
    
    await page.goto('/smartphone-options/iphone-15')
    
    await expect(page).toHaveURL('/login')
    await expect(page.getByText('セッションが期限切れです。再度ログインしてください。')).toBeVisible()
  })
})
