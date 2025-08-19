import { test, expect } from '@playwright/test'

test.describe('エラーハンドリング', () => {
  test('存在しないデバイスIDでのエラー表示', async ({ page }) => {
    await page.goto('/smartphones/non-existent-device')
    
    await expect(page.getByText('デバイスが見つかりませんでした')).toBeVisible()
    await expect(page.getByText('戻る')).toBeVisible()
  })

  test('ネットワークエラー時のローディング状態', async ({ page }) => {
    await page.route('**/api/**', route => route.abort())
    
    await page.goto('/smartphone-options/iphone-15')
    
    await expect(page.getByText('オプション情報を読み込み中...')).toBeVisible()
    
    await expect(page.getByText('オプション情報の取得に失敗しました')).toBeVisible({ timeout: 10000 })
  })

  test('ログインフォームのバリデーションエラー', async ({ page }) => {
    await page.goto('/login')
    
    await page.click('button[type="submit"]')
    
    await expect(page.getByText('メールアドレスを入力してください')).toBeVisible()
    await expect(page.getByText('パスワードを入力してください')).toBeVisible()
  })

  test('無効なメールアドレスでのバリデーションエラー', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('#email', 'invalid-email')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')
    
    await expect(page.getByText('有効なメールアドレスを入力してください')).toBeVisible()
  })

  test('短すぎるパスワードでのバリデーションエラー', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', '123')
    await page.click('button[type="submit"]')
    
    await expect(page.getByText('パスワードは8文字以上で入力してください')).toBeVisible()
  })

  test('認証失敗時のエラーメッセージ', async ({ page }) => {
    await page.route('**/api/auth/login', route => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid credentials' })
      })
    })
    
    await page.goto('/login')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    await expect(page.getByText('メールアドレスまたはパスワードが正しくありません')).toBeVisible()
  })

  test('サーバーエラー時の汎用エラーメッセージ', async ({ page }) => {
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      })
    })
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('サーバーエラーが発生しました。しばらく時間をおいてから再度お試しください。')).toBeVisible()
  })

  test('タイムアウトエラーの処理', async ({ page }) => {
    await page.route('**/api/smartphones', route => {
      setTimeout(() => route.continue(), 30000)
    })
    
    await page.goto('/smartphone-selection')
    
    await expect(page.getByText('読み込みに時間がかかっています。ページを再読み込みしてください。')).toBeVisible({ timeout: 15000 })
  })

  test('404ページの表示確認', async ({ page }) => {
    await page.goto('/non-existent-page')
    
    await expect(page.getByText('ページが見つかりません')).toBeVisible()
    await expect(page.getByText('ホームに戻る')).toBeVisible()
    
    await page.click('text=ホームに戻る')
    await expect(page).toHaveURL('/')
  })
})
