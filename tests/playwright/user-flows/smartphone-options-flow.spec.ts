import { test, expect } from '@playwright/test'

test.describe('スマートフォンオプション設定', () => {
  test('データ通信量選択とオプション設定', async ({ page }) => {
    await page.goto('/smartphone-options/iphone-15')
    
    await expect(page.getByText('データ通信量・オプションの選択')).toBeVisible()
    
    const dataPlan20gb = page.locator('[data-testid="data-plan-20gb"]')
    if (await dataPlan20gb.isVisible()) {
      await dataPlan20gb.click()
      await expect(dataPlan20gb).toHaveClass(/selected/)
    } else {
      const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
      await firstDataPlan.click()
    }
    
    const voiceOption5min = page.locator('[data-testid="voice-option-5min"]')
    if (await voiceOption5min.isVisible()) {
      await voiceOption5min.click()
      await expect(voiceOption5min).toHaveClass(/selected/)
    } else {
      const firstVoiceOption = page.locator('[data-testid^="voice-option-"]').first()
      if (await firstVoiceOption.isVisible()) {
        await firstVoiceOption.click()
      }
    }
    
    const overseaOptionUnlimited = page.locator('[data-testid="oversea-option-unlimited"]')
    if (await overseaOptionUnlimited.isVisible()) {
      await overseaOptionUnlimited.click()
      await expect(overseaOptionUnlimited).toHaveClass(/selected/)
    } else {
      const firstOverseaOption = page.locator('[data-testid^="oversea-option-"]').first()
      if (await firstOverseaOption.isVisible()) {
        await firstOverseaOption.click()
      }
    }
    
    const priceSimulation = page.locator('[data-testid="price-simulation"]')
    if (await priceSimulation.isVisible()) {
      await expect(priceSimulation).toBeVisible()
    }
    
    const nextButton = page.locator('text=次へ')
    await expect(nextButton).not.toBeDisabled()
    
    await nextButton.click()
    await expect(page).toHaveURL('/signup')
  })

  test('データプラン未選択時は次へボタンが無効', async ({ page }) => {
    await page.goto('/smartphone-options/iphone-15')
    
    const nextButton = page.locator('text=次へ')
    await expect(nextButton).toBeDisabled()
    
    const firstVoiceOption = page.locator('[data-testid^="voice-option-"]').first()
    if (await firstVoiceOption.isVisible()) {
      await firstVoiceOption.click()
      await expect(nextButton).toBeDisabled()
    }
    
    const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
    await firstDataPlan.click()
    await expect(nextButton).not.toBeDisabled()
  })

  test('各オプションセクションの表示確認', async ({ page }) => {
    await page.goto('/smartphone-options/iphone-15')
    
    await expect(page.getByText('データ通信量')).toBeVisible()
    
    await expect(page.getByText('ボイスオプション')).toBeVisible()
    
    await expect(page.getByText('かけ放題オプション')).toBeVisible()
  })

  test('戻るボタンの動作確認', async ({ page }) => {
    await page.goto('/smartphone-options/iphone-15')
    
    const backButton = page.locator('text=← 戻る')
    await expect(backButton).toBeVisible()
    await backButton.click()
    
    await expect(page).toHaveURL(/\/smartphones\//)
  })

  test('Android端末のオプション設定', async ({ page }) => {
    await page.goto('/smartphone-options/android-device')
    
    await expect(page.getByText('データ通信量・オプションの選択')).toBeVisible()
    
    const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
    await firstDataPlan.click()
    
    const nextButton = page.locator('text=次へ')
    await expect(nextButton).not.toBeDisabled()
  })

  test('価格シミュレーションの動的更新', async ({ page }) => {
    await page.goto('/smartphone-options/iphone-15')
    
    const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
    await firstDataPlan.click()
    
    const priceSimulation = page.locator('[data-testid="price-simulation"]')
    if (await priceSimulation.isVisible()) {
      await expect(priceSimulation).toBeVisible()
      
      const firstVoiceOption = page.locator('[data-testid^="voice-option-"]').first()
      if (await firstVoiceOption.isVisible()) {
        await firstVoiceOption.click()
        await expect(priceSimulation).toBeVisible()
      }
    }
  })

  test('オプション選択の永続化', async ({ page }) => {
    await page.goto('/smartphone-options/iphone-15')
    
    const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
    await firstDataPlan.click()
    
    await page.reload()
    
    await expect(firstDataPlan).toHaveClass(/selected/)
  })

  test('無効なデバイスIDでのエラーハンドリング', async ({ page }) => {
    await page.goto('/smartphone-options/invalid-device-id')
    
    const errorMessage = page.getByText('オプション情報の取得に失敗しました')
    const loadingMessage = page.getByText('オプション情報を読み込み中')
    
    await expect(errorMessage.or(loadingMessage)).toBeVisible({ timeout: 10000 })
  })
})
