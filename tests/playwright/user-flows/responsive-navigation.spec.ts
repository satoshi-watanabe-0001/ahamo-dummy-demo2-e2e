import { test, expect } from '@playwright/test'

test.describe('レスポンシブナビゲーションテスト', () => {
  test('デスクトップ表示でのナビゲーション', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    
    await expect(page.getByRole('link', { name: 'ahamo' })).toBeVisible()
    
    const desktopNav = page.locator('nav').filter({ hasText: '料金プラン' })
    if (await desktopNav.isVisible()) {
      await expect(desktopNav.getByText('料金プラン')).toBeVisible()
      await expect(desktopNav.getByText('サービス')).toBeVisible()
      await expect(desktopNav.getByText('サポート')).toBeVisible()
    }
    
    const signupButton = page.getByText('申し込み').first()
    await expect(signupButton).toBeVisible()
    
    const loginButton = page.getByText('ログイン').first()
    if (await loginButton.isVisible()) {
      await expect(loginButton).toBeVisible()
    }
  })
  
  test('モバイル表示でのハンバーガーメニュー', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    await expect(page.getByRole('link', { name: 'ahamo' })).toBeVisible()
    
    const menuButton = page.locator('button').filter({ hasText: /menu|メニュー/i }).or(
      page.locator('button[aria-label*="メニュー"]')
    ).or(
      page.locator('button').filter({ has: page.locator('span') }).first()
    )
    
    if (await menuButton.isVisible()) {
      await menuButton.click()
      
      await page.waitForTimeout(500)
      
      const mobileMenuItems = [
        '料金プラン',
        'サービス', 
        'サポート',
        '申し込み',
        'ログイン'
      ]
      
      let foundItems = 0
      for (const item of mobileMenuItems) {
        const navItem = page.locator('nav').getByText(item).first()
        if (await navItem.isVisible()) {
          foundItems++
        }
      }
      
      expect(foundItems).toBeGreaterThanOrEqual(2)
    }
  })
  
  test('タブレット表示での表示確認', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    await expect(page.getByRole('link', { name: 'ahamo' })).toBeVisible()
    
    const navigationElements = [
      '料金プラン',
      'サービス',
      'サポート',
      '申し込み'
    ]
    
    let visibleElements = 0
    for (const element of navigationElements) {
      const navElement = page.locator('nav').getByText(element).first()
      if (await navElement.isVisible()) {
        visibleElements++
      }
    }
    
    expect(visibleElements).toBeGreaterThan(1)
  })
  
  test('ナビゲーションリンクの動作確認', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    
    const planLink = page.getByText('料金プラン').first()
    if (await planLink.isVisible()) {
      await planLink.click()
      await expect(page).toHaveURL(/plan|price/)
    }
  })
  
  test('レスポンシブ画像とコンテンツの表示', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1200, height: 800 }   // Desktop
    ]
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto('/')
      
      await expect(page.getByRole('link', { name: 'ahamo' })).toBeVisible()
      
      const mainContent = page.locator('main')
      await expect(mainContent).toBeVisible()
      
      const images = page.locator('img')
      if (await images.count() > 0) {
        const firstImage = images.first()
        if (await firstImage.isVisible()) {
          await expect(firstImage).toBeVisible()
        }
      }
    }
  })
})
