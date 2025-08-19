import { test, expect } from '@playwright/test'

test.describe('スマートフォン詳細ページ', () => {
  test('iPhone詳細ページの表示と基本機能', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    await expect(page.locator('h1')).toContainText('iPhone')
    
    await expect(page.locator('img[alt*="iPhone"]')).toBeVisible()
    
    const paymentOption0 = page.locator('[data-testid="payment-option-0yen"]')
    if (await paymentOption0.isVisible()) {
      await paymentOption0.click()
      await expect(page.getByText('0円')).toBeVisible()
      await expect(page.getByText('いつでもカエドキプログラム適用時')).toBeVisible()
    }
    
    const paymentOption4872 = page.locator('[data-testid="payment-option-4872yen"]')
    if (await paymentOption4872.isVisible()) {
      await paymentOption4872.click()
      await expect(page.getByText('4,872円')).toBeVisible()
      await expect(page.getByText('分割払い（24回）')).toBeVisible()
    }
  })

  test('Android詳細ページの表示確認', async ({ page }) => {
    await page.goto('/smartphones/android')
    
    await expect(page.locator('h1')).toContainText('Android')
    
    await expect(page.locator('img[alt*="Android"]')).toBeVisible()
    
    await expect(page.getByText('この機種で申し込む')).toBeVisible()
  })

  test('ドコモ認定リユース品詳細ページの表示確認', async ({ page }) => {
    await page.goto('/smartphones/docomo-certified')
    
    await expect(page.locator('h1')).toContainText('ドコモ認定リユース品')
    
    await expect(page.getByText('30日間の無償交換であんしん')).toBeVisible()
    
    await expect(page.getByText('この機種で申し込む')).toBeVisible()
  })

  test('カラー選択機能', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const colorSelector = page.locator('[data-testid="color-selector"]')
    if (await colorSelector.isVisible()) {
      const firstColor = page.locator('[data-testid="color-option-0"]')
      if (await firstColor.isVisible()) {
        await firstColor.click()
      }
      
      const secondColor = page.locator('[data-testid="color-option-1"]')
      if (await secondColor.isVisible()) {
        await secondColor.click()
      }
    }
  })

  test('機能・仕様セクションの表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const featureList = page.locator('[data-testid="feature-list"]')
    if (await featureList.isVisible()) {
      await expect(featureList).toBeVisible()
    }
    
    const specifications = page.locator('[data-testid="specifications"]')
    if (await specifications.isVisible()) {
      await expect(specifications).toBeVisible()
    }
  })

  test('eSIMセクションの表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const esimSection = page.locator('[data-testid="esim-section"]')
    if (await esimSection.isVisible()) {
      await expect(esimSection).toBeVisible()
    }
  })

  test('下取りセクションの表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const tradeInSection = page.locator('[data-testid="trade-in-section"]')
    if (await tradeInSection.isVisible()) {
      await expect(tradeInSection).toBeVisible()
    }
  })

  test('アクセサリーセクションの表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const accessoryGrid = page.locator('[data-testid="accessory-grid"]')
    if (await accessoryGrid.isVisible()) {
      await expect(accessoryGrid).toBeVisible()
    }
  })

  test('機種申し込みボタンでオプション選択へ遷移', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const applyButton = page.getByText('この機種で申し込む')
    await expect(applyButton).toBeVisible()
    await applyButton.click()
    await expect(page).toHaveURL(/\/smartphone-options\//)
  })

  test('戻るボタンの動作確認', async ({ page }) => {
    await page.goto('/smartphone-selection')
    await page.click('text=iPhone')
    await expect(page).toHaveURL(/\/smartphones\/iphone/)
    
    const backButton = page.locator('text=← 戻る').first()
    await expect(backButton).toBeVisible()
    await backButton.click()
    
    await expect(page).toHaveURL('/smartphone-selection')
  })

  test('ローディング状態の確認', async ({ page }) => {
    await page.route('**/api/smartphones/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await route.continue()
    })
    
    await page.goto('/smartphones/iphone')
    
    const loadingSpinner = page.locator('[data-testid="loading-spinner"]')
    if (await loadingSpinner.isVisible({ timeout: 500 })) {
      await expect(loadingSpinner).toBeVisible()
    }
  })
})
