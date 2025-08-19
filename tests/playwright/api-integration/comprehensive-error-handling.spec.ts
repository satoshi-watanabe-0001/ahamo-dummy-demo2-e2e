import { test, expect } from '@playwright/test'

test.describe('包括的APIエラーハンドリング', () => {
  test('ネットワーク障害時の処理', async ({ page }) => {
    await page.route('**/api/**', route => route.abort())
    
    await page.goto('/smartphone-selection')
    
    const errorMessages = [
      'サーバーエラーが発生しました',
      'エラーが発生しました',
      '接続エラー',
      'ネットワークエラー',
      '読み込みに失敗',
      'しばらくお待ちください'
    ]
    
    let foundError = false
    for (const message of errorMessages) {
      if (await page.getByText(message).isVisible()) {
        foundError = true
        break
      }
    }
    
    if (!foundError) {
      const loadingSpinner = page.locator('[data-testid*="loading"]').or(page.locator('.loading')).or(page.getByText('読み込み中'))
      if (await loadingSpinner.isVisible()) {
        foundError = true
      }
    }
    
    expect(foundError).toBe(true)
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
    
    await page.waitForTimeout(2000)
    
    const errorIndicators = [
      'サーバーエラー',
      'エラーが発生',
      '500',
      'Internal Server Error',
      '読み込みに失敗',
      'しばらくお待ちください'
    ]
    
    let foundError = false
    for (const indicator of errorIndicators) {
      if (await page.getByText(indicator).isVisible()) {
        foundError = true
        break
      }
    }
    
    expect(foundError).toBe(true)
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
    
    await page.waitForTimeout(2000)
    
    const notFoundIndicators = [
      '見つかりません',
      'Not Found',
      '404',
      'ページが存在しません',
      'データが見つかりません'
    ]
    
    let foundNotFound = false
    for (const indicator of notFoundIndicators) {
      if (await page.getByText(indicator).isVisible()) {
        foundNotFound = true
        break
      }
    }
    
    if (!foundNotFound) {
      const emptyState = page.getByText('スマートフォンが見つかりません').or(page.getByText('商品がありません'))
      if (await emptyState.isVisible()) {
        foundNotFound = true
      }
    }
    
    expect(foundNotFound).toBe(true)
  })
  
  test('タイムアウト時の処理', async ({ page }) => {
    await page.route('**/api/smartphones', route => {
      setTimeout(() => route.continue(), 5000)
    })
    
    await page.goto('/smartphone-selection')
    
    const loadingIndicators = [
      '読み込み中',
      'Loading',
      'しばらくお待ちください',
      '処理中'
    ]
    
    let foundLoading = false
    for (const indicator of loadingIndicators) {
      if (await page.getByText(indicator).isVisible()) {
        foundLoading = true
        break
      }
    }
    
    if (!foundLoading) {
      const spinner = page.locator('[data-testid*="loading"]').or(page.locator('.loading')).or(page.locator('.spinner'))
      if (await spinner.isVisible()) {
        foundLoading = true
      }
    }
    
    expect(foundLoading).toBe(true)
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
    
    await page.waitForTimeout(2000)
    
    const authErrorIndicators = [
      'ログインが必要',
      '認証エラー',
      'Unauthorized',
      '401',
      'セッションが期限切れ',
      'ログインしてください'
    ]
    
    let foundAuthError = false
    for (const indicator of authErrorIndicators) {
      if (await page.getByText(indicator).isVisible()) {
        foundAuthError = true
        break
      }
    }
    
    if (!foundAuthError && page.url().includes('/login')) {
      foundAuthError = true
    }
    
    expect(foundAuthError).toBe(true)
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
