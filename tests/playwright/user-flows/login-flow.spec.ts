/**
 * @fileoverview ログインE2E統合テスト
 * @module tests/playwright/user-flows/login-flow.spec
 *
 * EC-275: ログイン画面E2E
 * フロントエンド（EC-273）とバックエンド（EC-274）の統合テスト
 */

import { test, expect } from '@playwright/test'
import { TestHelpers } from '../helpers/test-helpers'

test.describe('ログインE2E統合テスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await TestHelpers.waitForPageLoad(page)
  })

  test('正常ログインフローでマイページにリダイレクト', async ({ page }) => {
    await page.fill('#email', 'test@docomo.ne.jp')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')

    await page.waitForURL('/mypage', { timeout: 10000 })
    expect(page.url()).toContain('/mypage')
  })

  test('無効な認証情報でログイン失敗エラーが表示される', async ({ page }) => {
    await page.fill('#email', 'invalid@docomo.ne.jp')
    await page.fill('#password', 'wrongpassword')
    await page.click('button[type="submit"]')

    await expect(page.locator('[role="alert"]').first()).toBeVisible({ timeout: 10000 })
    const errorMessage = await page.locator('[role="alert"]').first().textContent()
    expect(errorMessage).toContain('メールアドレスまたはパスワードが正しくありません')
  })

  test('ログイン後ヘッダーにマイページボタンが表示される', async ({ page }) => {
    await TestHelpers.loginUser(page, 'test@docomo.ne.jp', 'password123')
    await page.waitForURL('/mypage', { timeout: 10000 })

    const myPageButton = page.locator('a[href="/mypage"]')
    await expect(myPageButton).toBeVisible()
  })

  test('パスワード表示切替機能が動作する', async ({ page }) => {
    const passwordField = page.locator('#password')
    const toggleButton = page.locator('button[aria-label*="パスワード"]')

    await expect(passwordField).toHaveAttribute('type', 'password')
    await toggleButton.click()
    await expect(passwordField).toHaveAttribute('type', 'text')
    await toggleButton.click()
    await expect(passwordField).toHaveAttribute('type', 'password')
  })

  test('メールアドレスのバリデーションエラーが表示される', async ({ page }) => {
    await page.fill('#email', 'invalid-email')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')

    await expect(page.getByText('有効なメールアドレスを入力してください')).toBeVisible()
  })

  test('パスワード未入力でバリデーションエラーが表示される', async ({ page }) => {
    await page.fill('#email', 'test@docomo.ne.jp')
    await page.click('button[type="submit"]')

    await expect(page.getByText('パスワードを入力してください')).toBeVisible()
  })

  test('ログイン状態を保持するチェックボックスが機能する', async ({ page }) => {
    const rememberMeCheckbox = page.locator('#rememberMe')

    await expect(rememberMeCheckbox).not.toBeChecked()
    await rememberMeCheckbox.click()
    await expect(rememberMeCheckbox).toBeChecked()
  })

  test('新規登録リンクが正しく機能する', async ({ page }) => {
    const signupLink = page.locator('a[href="/signup"]')
    await expect(signupLink).toBeVisible()
    await signupLink.click()

    await page.waitForURL('/signup', { timeout: 10000 })
    expect(page.url()).toContain('/signup')
  })

  test('パスワードを忘れた方リンクが正しく機能する', async ({ page }) => {
    const forgotPasswordLink = page.locator('a[href="/forgot-password"]')
    await expect(forgotPasswordLink).toBeVisible()
    await forgotPasswordLink.click()

    await page.waitForURL('/forgot-password', { timeout: 10000 })
    expect(page.url()).toContain('/forgot-password')
  })

  test('ログインページのアクセシビリティ確認', async ({ page }) => {
    await TestHelpers.verifyAccessibility(page)

    const emailLabel = page.locator('label[for="email"]')
    const passwordLabel = page.locator('label[for="password"]')

    await expect(emailLabel).toBeVisible()
    await expect(passwordLabel).toBeVisible()
  })
})
