import { test, expect } from '@playwright/test'

test.describe('SIM確認・準備フロー', () => {
  test('本人確認書類セクションの表示確認', async ({ page }) => {
    await page.goto('/sim-check')
    
    await expect(page.getByText('申し込み前に準備してください')).toBeVisible()
    await expect(page.getByText('本人確認書類')).toBeVisible()
    await expect(page.getByText('運転免許証')).toBeVisible()
    await expect(page.getByText('マイナンバーカード')).toBeVisible()
    
    await expect(page.getByText('ICチップ読み取りによる、本人確認を行います')).toBeVisible()
    await expect(page.getByText('マイナンバーカードをご利用した本人確認がおすすめです')).toBeVisible()
  })

  test('現住所確認セクションの表示確認', async ({ page }) => {
    await page.goto('/sim-check')
    
    await expect(page.getByText('現住所と同じ住所ですか？')).toBeVisible()
    await expect(page.getByText('現住所の本人確認に')).toBeVisible()
    await expect(page.getByText('利用可能な書類')).toBeVisible()
    
    const licenseImages = page.locator('text=運転免許証')
    await expect(licenseImages).toHaveCount(2) // 契約者用と現住所用
    
    const mynumberImages = page.locator('text=マイナンバーカード')
    await expect(mynumberImages).toHaveCount(2) // 契約者用と現住所用
  })

  test('支払い方法セクションの表示確認', async ({ page }) => {
    await page.goto('/sim-check')
    
    await expect(page.getByText('お支払い方法をご準備ください')).toBeVisible()
    await expect(page.getByText('ご利用可能なお支払い方法')).toBeVisible()
    await expect(page.getByText('クレジットカード（VISA、Mastercard、JCB、American Express）')).toBeVisible()
    await expect(page.getByText('口座振替（金融機関のキャッシュカード）')).toBeVisible()
  })

  test('MNP予約番号セクションの表示確認', async ({ page }) => {
    await page.goto('/sim-check')
    
    await expect(page.getByText('他社からお乗り換えの方')).toBeVisible()
    await expect(page.getByText('MNP予約番号について')).toBeVisible()
    await expect(page.getByText('現在お使いの電話番号をそのままご利用になる場合は')).toBeVisible()
    await expect(page.getByText('MNP予約番号の有効期限は取得日を含めて15日間です')).toBeVisible()
    await expect(page.getByText('お申し込み時点で有効期限が10日以上残っている必要があります')).toBeVisible()
  })

  test('ナビゲーションボタンの動作確認', async ({ page }) => {
    await page.goto('/sim-check')
    
    const backButton = page.locator('text=戻る')
    await expect(backButton).toBeVisible()
    await backButton.click()
    await expect(page).toHaveURL('/')
    
    await page.goto('/sim-check')
    
    const proceedButton = page.locator('text=準備完了・申し込みへ進む')
    await expect(proceedButton).toBeVisible()
    await proceedButton.click()
    await expect(page).toHaveURL('/smartphone-selection')
  })

  test('ページ全体のレイアウト確認', async ({ page }) => {
    await page.goto('/sim-check')
    
    await expect(page.locator('h1')).toContainText('申し込み前に準備してください')
    
    const sections = page.locator('[data-testid="selection-step"], .space-y-4').first()
    await expect(sections).toBeVisible()
    
    const footer = page.locator('.flex.justify-between.items-center')
    await expect(footer).toBeVisible()
  })
})
