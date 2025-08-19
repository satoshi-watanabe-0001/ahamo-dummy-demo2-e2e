import { test, expect } from '@playwright/test'

test.describe('新規登録フロー', () => {
  test('電話番号継続 + ドコモ契約者のプラン変更フロー', async ({ page }) => {
    await page.goto('/signup')
    
    await page.click('[data-testid="phone-option-keep"]')
    
    await page.click('[data-testid="carrier-option-docomo"]')
    
    await expect(page.getByText('プラン変更手続きに移行します')).toBeVisible()
    
    await page.click('[data-testid="navigation-next"]')
    await expect(page).toHaveURL('/d-account-verification')
  })

  test('電話番号継続 + 他社契約者 + 端末購入ありフロー', async ({ page }) => {
    await page.goto('/signup')
    
    await page.click('[data-testid="phone-option-keep"]')
    await page.click('[data-testid="carrier-option-other"]')
    await page.click('[data-testid="device-option-buy"]')
    
    await expect(page.getByText('乗り換え手続きを行います')).toBeVisible()
    
    await page.click('[data-testid="navigation-next"]')
    await expect(page).toHaveURL('/sim-check')
  })

  test('新規契約 + 端末購入なし + SIM選択フロー', async ({ page }) => {
    await page.goto('/signup')
    
    await page.click('[data-testid="phone-option-new"]')
    await page.click('[data-testid="device-option-no-buy"]')
    await page.click('[data-testid="sim-option-esim"]')
    
    await expect(page.getByText('新規申し込みに移行します')).toBeVisible()
    
    await page.click('[data-testid="navigation-next"]')
    await expect(page).toHaveURL('/sim-check')
  })

  test('新規契約 + 端末購入ありフロー', async ({ page }) => {
    await page.goto('/signup')
    
    await page.click('[data-testid="phone-option-new"]')
    await page.click('[data-testid="device-option-buy"]')
    
    await expect(page.getByText('新規申し込みに移行します')).toBeVisible()
    
    await page.click('[data-testid="navigation-next"]')
    await expect(page).toHaveURL('/sim-check')
  })

  test('電話番号継続 + 他社契約者 + 端末購入なし + 物理SIMフロー', async ({ page }) => {
    await page.goto('/signup')
    
    await page.click('[data-testid="phone-option-keep"]')
    await page.click('[data-testid="carrier-option-other"]')
    await page.click('[data-testid="device-option-no-buy"]')
    await page.click('[data-testid="sim-option-physical"]')
    
    await expect(page.getByText('乗り換え手続きを行います')).toBeVisible()
    
    await page.click('[data-testid="navigation-next"]')
    await expect(page).toHaveURL('/sim-check')
  })

  test('不完全な選択状態では次へボタンが無効', async ({ page }) => {
    await page.goto('/signup')
    
    await page.click('[data-testid="phone-option-keep"]')
    
    const nextButton = page.locator('[data-testid="navigation-next"]')
    await expect(nextButton).toBeDisabled()
    
    await page.click('[data-testid="carrier-option-other"]')
    await expect(nextButton).toBeDisabled()
  })
})
