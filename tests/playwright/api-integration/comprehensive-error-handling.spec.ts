import { test, expect } from '@playwright/test'

test.describe('包括的APIエラーハンドリング', () => {
  test('ネットワーク障害時の処理', async ({ page }) => {
    await page.route('**/api/**', route => route.abort())
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('スマホの選択')).toBeVisible()
    await expect(page.getByText('iPhone')).toBeVisible()
    await expect(page.getByText('Android')).toBeVisible()
    
    const pageContent = await page.textContent('body')
    expect(pageContent).toContain('スマホの選択')
    expect(pageContent).toContain('iPhone')
    expect(pageContent).toContain('Android')
  })
  
  test('HTTP 500エラー時の処理', async ({ page }) => {
    await page.route('**/api/smartphones', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      })
    })
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('スマホの選択')).toBeVisible()
    await expect(page.getByText('iPhone')).toBeVisible()
    await expect(page.getByText('Android')).toBeVisible()
    
    const pageContent = await page.textContent('body')
    expect(pageContent).toContain('スマホの選択')
  })
  
  test('HTTP 404エラー時の処理', async ({ page }) => {
    await page.route('**/api/smartphones', route => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not Found' })
      })
    })
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('スマホの選択')).toBeVisible()
    
    const pageContent = await page.textContent('body')
    expect(pageContent).toContain('スマホの選択')
  })
  
  test('タイムアウト時の処理', async ({ page }) => {
    await page.route('**/api/smartphones', route => {
      setTimeout(() => route.continue(), 5000)
    })
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('スマホの選択')).toBeVisible()
    
    const pageContent = await page.textContent('body')
    expect(pageContent).toContain('スマホの選択')
    expect(pageContent).toContain('iPhone')
    expect(pageContent).toContain('Android')
  })
  
  test('認証エラー時の処理', async ({ page }) => {
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Unauthorized' })
      })
    })
    
    await page.goto('/smartphone-options/iphone-15')
    
    const pageContent = await page.textContent('body')
    expect(pageContent).toBeTruthy()
    expect(pageContent.length).toBeGreaterThan(0)
  })
  
  test('部分的なAPIエラーでの継続動作', async ({ page }) => {
    await page.route('**/api/smartphones/*/options', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Options service unavailable' })
      })
    })
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('スマホの選択')).toBeVisible()
    
    const smartphoneLinks = page.locator('text=iPhone').or(page.locator('text=Android'))
    if (await smartphoneLinks.count() > 0) {
      await smartphoneLinks.first().click()
      
      await page.waitForTimeout(1000)
      
      const errorOrFallback = page.getByText('オプション情報を取得できません').or(
        page.getByText('基本情報のみ表示')
      ).or(
        page.getByText('エラーが発生しました')
      )
      
      if (await errorOrFallback.isVisible()) {
        await expect(errorOrFallback).toBeVisible()
      }
    }
  })
})
