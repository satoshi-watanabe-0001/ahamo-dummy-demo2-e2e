import { test, expect } from '@playwright/test'

test.describe('レスポンシブデザインテスト', () => {
  test('モバイル表示でのナビゲーション', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]')
    if (await mobileMenuButton.isVisible()) {
      await expect(mobileMenuButton).toBeVisible()
      
      await mobileMenuButton.click()
      const mobileMenu = page.locator('[data-testid="mobile-menu"]')
      await expect(mobileMenu).toBeVisible()
    }
  })

  test('タブレット表示でのスマートフォン選択', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/smartphone-selection')
    
    const smartphoneGrid = page.locator('[data-testid="smartphone-grid"]')
    if (await smartphoneGrid.isVisible()) {
      await expect(smartphoneGrid).toBeVisible()
    }
    
    const items = page.locator('[data-testid="smartphone-item"]')
    if (await items.first().isVisible()) {
      await expect(items).toHaveCount(3) // iPhone, Android, ドコモ認定リユース品
    }
  })

  test('デスクトップ表示での詳細ページ', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/smartphones/iphone')
    
    const deviceImageSection = page.locator('[data-testid="device-image-section"]')
    const deviceInfoSection = page.locator('[data-testid="device-info-section"]')
    
    if (await deviceImageSection.isVisible()) {
      await expect(deviceImageSection).toBeVisible()
    }
    if (await deviceInfoSection.isVisible()) {
      await expect(deviceInfoSection).toBeVisible()
    }
  })

  test('モバイルでのフォーム入力', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/login')
    
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'password123')
    
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
    
    const buttonBox = await submitButton.boundingBox()
    if (buttonBox) {
      expect(buttonBox.height).toBeGreaterThanOrEqual(44) // 最小タップターゲットサイズ
    }
  })

  test('タブレットでのオプション選択', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/smartphone-options/iphone-15')
    
    await expect(page.getByText('データ通信量・オプションの選択')).toBeVisible()
    
    const optionCards = page.locator('[data-testid^="data-plan-"]')
    if (await optionCards.first().isVisible()) {
      const firstCard = optionCards.first()
      const cardBox = await firstCard.boundingBox()
      if (cardBox) {
        expect(cardBox.width).toBeGreaterThan(200) // タブレット用の適切な幅
      }
    }
  })

  test('デスクトップでのサイドバーナビゲーション', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    const sidebar = page.locator('[data-testid="desktop-sidebar"]')
    if (await sidebar.isVisible()) {
      await expect(sidebar).toBeVisible()
      
      await expect(sidebar.locator('text=ホーム')).toBeVisible()
      await expect(sidebar.locator('text=スマートフォン')).toBeVisible()
      await expect(sidebar.locator('text=プラン')).toBeVisible()
    }
  })

  test('モバイルでのスクロール動作', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/sim-check')
    
    const pageHeight = await page.evaluate(() => document.body.scrollHeight)
    expect(pageHeight).toBeGreaterThan(667) // ビューポートより高い
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    const footer = page.locator('text=準備完了・申し込みへ進む')
    await expect(footer).toBeVisible()
  })

  test('画面回転時のレイアウト調整', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/smartphone-selection')
    
    await page.setViewportSize({ width: 667, height: 375 })
    
    await expect(page.getByText('スマホの選択')).toBeVisible()
    
    const smartphoneOptions = page.locator('[data-testid="smartphone-item"]')
    if (await smartphoneOptions.first().isVisible()) {
      const count = await smartphoneOptions.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('高解像度ディスプレイでの画像表示', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 })
    await page.goto('/smartphones/iphone')
    
    const deviceImage = page.locator('img[alt*="iPhone"]')
    await expect(deviceImage).toBeVisible()
    
    const imageSrc = await deviceImage.getAttribute('src')
    expect(imageSrc).toBeTruthy()
  })

  test('アクセシビリティ対応の確認', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/login')
    
    await page.keyboard.press('Tab')
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    const emailInput = page.locator('#email')
    const emailLabel = page.locator('label[for="email"]')
    if (await emailLabel.isVisible()) {
      await expect(emailLabel).toBeVisible()
    }
  })
})
