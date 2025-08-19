import { test, expect } from '@playwright/test'

test.describe('デバイス詳細ページの詳細機能テスト', () => {
  test('支払いオプション選択機能', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    await expect(page.getByText('料金プラン')).toBeVisible()
    
    const paymentOptions = page.locator('[role="button"]').filter({ hasText: '円' })
    if (await paymentOptions.count() > 0) {
      const firstOption = paymentOptions.first()
      await firstOption.click()
      await expect(firstOption).toHaveClass(/border-blue-600|bg-blue-50/)
    }
  })
  
  test('カラー選択機能', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const colorSection = page.locator('text=カラー').locator('..')
    if (await colorSection.isVisible()) {
      const colorButtons = colorSection.locator('button')
      if (await colorButtons.count() > 0) {
        const firstColor = colorButtons.first()
        await firstColor.click()
        await expect(firstColor).toHaveClass(/ring-2|border-blue-600/)
      }
    }
  })
  
  test('eSIMセクション表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    await expect(page.getByText('eSIM').or(page.getByText('即日開通'))).toBeVisible()
    
    const esimFeatures = [
      '即日開通',
      'セキュア',
      '便利',
      'オンライン',
      '安全'
    ]
    
    let foundFeatures = 0
    for (const feature of esimFeatures) {
      if (await page.getByText(feature).isVisible()) {
        foundFeatures++
      }
    }
    
    expect(foundFeatures).toBeGreaterThan(0)
  })
  
  test('機能リスト表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const deviceFeatures = [
      'カメラ',
      'バッテリー',
      'ディスプレイ',
      'プロセッサ',
      'ストレージ',
      '防水',
      'Face ID',
      'Touch ID'
    ]
    
    let foundFeatures = 0
    for (const feature of deviceFeatures) {
      if (await page.getByText(feature).isVisible()) {
        foundFeatures++
      }
    }
    
    expect(foundFeatures).toBeGreaterThan(0)
  })
  
  test('申し込みボタン機能確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const applyButton = page.getByText('この機種で申し込む').or(page.getByText('申し込む'))
    await expect(applyButton).toBeVisible()
    
    await applyButton.click()
    await expect(page).toHaveURL(/smartphone-options|signup/)
  })
  
  test('戻るボタン機能確認', async ({ page }) => {
    await page.goto('/smartphones/iphone')
    
    const backButton = page.getByText('戻る').or(page.locator('button').filter({ hasText: '←' }))
    if (await backButton.isVisible()) {
      await backButton.click()
      await expect(page).toHaveURL(/smartphone-selection|\//)
    }
  })
})
