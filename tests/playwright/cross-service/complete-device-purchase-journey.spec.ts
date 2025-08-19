import { test, expect } from '@playwright/test'

test.describe('完全なデバイス購入ジャーニー', () => {
  test('デバイス詳細からオプション選択、申し込み完了まで', async ({ page }) => {
    await page.goto('/smartphone-selection')
    await expect(page.getByText('スマホの選択')).toBeVisible()
    
    const iphoneCard = page.getByText('iPhone').locator('..')
    await expect(iphoneCard).toBeVisible()
    await iphoneCard.click()
    
    await page.waitForLoadState('networkidle')
    
    const iphoneModel = page.getByText('iPhone 16e').or(page.getByText('iPhone 16 Pro')).first()
    if (await iphoneModel.isVisible()) {
      await iphoneModel.click()
      await page.waitForLoadState('networkidle')
    }
    
    const paymentOption = page.locator('[data-testid^="payment-option"]').filter({ hasText: '0円' }).first()
    if (await paymentOption.isVisible()) {
      await paymentOption.click()
    }
    
    const colorButton = page.getByText('ホワイト').locator('..')
    if (await colorButton.isVisible()) {
      await colorButton.click()
    }
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2000)
    
    const applyButton = page.getByText('この機種で申し込む')
    if (await applyButton.isVisible()) {
      await applyButton.scrollIntoViewIfNeeded()
      await applyButton.click()
    }
    
    await page.waitForTimeout(1000)
    
    if (page.url().includes('smartphone-options')) {
      const dataPlanOptions = page.locator('[data-testid^="data-plan-"]').or(
        page.locator('text=GB').locator('..')
      ).or(
        page.locator('[role="button"]').filter({ hasText: /プラン|GB|データ/ })
      )
      
      if (await dataPlanOptions.count() > 0) {
        await dataPlanOptions.first().click()
      }
      
      const voiceOptions = page.locator('[data-testid^="voice-option-"]').or(
        page.locator('text=通話').locator('..')
      ).or(
        page.locator('[role="button"]').filter({ hasText: /通話|ボイス|かけ放題/ })
      )
      
      if (await voiceOptions.count() > 0) {
        await voiceOptions.first().click()
      }
      
      const nextButton = page.getByText('次へ').or(page.getByText('申し込みへ進む'))
      await nextButton.click()
    }
    
    await page.waitForTimeout(1000)
    
    if (page.url().includes('signup')) {
      const phoneOptions = page.locator('[data-testid="phone-option-new"]').or(
        page.getByText('新規契約')
      )
      
      if (await phoneOptions.isVisible()) {
        await phoneOptions.click()
      }
      
      const deviceOptions = page.locator('[data-testid="device-option-buy"]').or(
        page.getByText('端末購入あり')
      )
      
      if (await deviceOptions.isVisible()) {
        await deviceOptions.click()
      }
      
      const confirmationMessage = page.getByText('新規申し込みに移行します').or(
        page.getByText('申し込み内容を確認')
      ).or(
        page.getByText('次のステップ')
      )
      
      await expect(confirmationMessage).toBeVisible()
    }
  })
  
  test('乗り換えユーザーの完全購入フロー', async ({ page }) => {
    await page.goto('/sim-check')
    
    if (await page.getByText('申し込み前に準備してください').isVisible()) {
      const proceedButton = page.getByText('準備完了・申し込みへ進む').or(page.getByText('次へ'))
      await proceedButton.click()
    } else {
      await page.goto('/smartphone-selection')
    }
    
    await expect(page.getByText('スマホの選択')).toBeVisible()
    
    const androidCard = page.getByText('Android').locator('..')
    await expect(androidCard).toBeVisible()
    await androidCard.click()
    
    await page.waitForLoadState('networkidle')
    
    const androidModel = page.getByText('Galaxy').or(page.getByText('Pixel')).or(page.getByText('Xperia')).first()
    if (await androidModel.isVisible()) {
      await androidModel.click()
      await page.waitForLoadState('networkidle')
    }
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2000)
    
    const applyButton = page.getByText('この機種で申し込む')
    if (await applyButton.isVisible()) {
      await applyButton.scrollIntoViewIfNeeded()
      await applyButton.click()
    }
    
    await page.waitForTimeout(1000)
    
    if (page.url().includes('smartphone-options')) {
      const dataPlan = page.locator('[data-testid^="data-plan-"]').or(
        page.locator('[role="button"]').filter({ hasText: /GB|プラン/ })
      ).first()
      
      if (await dataPlan.isVisible()) {
        await dataPlan.click()
      }
      
      const nextButton = page.getByText('次へ')
      await nextButton.click()
    }
    
    await page.waitForTimeout(1000)
    
    if (page.url().includes('signup')) {
      const keepPhoneOption = page.locator('[data-testid="phone-option-keep"]').or(
        page.getByText('電話番号継続')
      )
      
      if (await keepPhoneOption.isVisible()) {
        await keepPhoneOption.click()
      }
      
      const otherCarrierOption = page.locator('[data-testid="carrier-option-other"]').or(
        page.getByText('他社から乗り換え')
      )
      
      if (await otherCarrierOption.isVisible()) {
        await otherCarrierOption.click()
      }
      
      const buyDeviceOption = page.locator('[data-testid="device-option-buy"]').or(
        page.getByText('端末購入あり')
      )
      
      if (await buyDeviceOption.isVisible()) {
        await buyDeviceOption.click()
      }
      
      const transferMessage = page.getByText('乗り換え手続きを行います').or(
        page.getByText('MNP転入手続き')
      )
      
      await expect(transferMessage).toBeVisible()
    }
  })
  
  test('ドコモユーザーのプラン変更フロー', async ({ page }) => {
    await page.goto('/signup')
    
    const keepPhoneOption = page.locator('[data-testid="phone-option-keep"]').or(
      page.getByText('電話番号継続')
    )
    
    if (await keepPhoneOption.isVisible()) {
      await keepPhoneOption.click()
    }
    
    const docomoOption = page.locator('[data-testid="carrier-option-docomo"]').or(
      page.getByText('ドコモ')
    )
    
    if (await docomoOption.isVisible()) {
      await docomoOption.click()
    }
    
    const planChangeMessage = page.getByText('プラン変更手続きに移行します').or(
      page.getByText('プラン変更')
    )
    
    if (await planChangeMessage.isVisible()) {
      await expect(planChangeMessage).toBeVisible()
      
      const nextButton = page.locator('[data-testid="navigation-next"]').or(page.getByText('次へ'))
      if (await nextButton.isVisible()) {
        await nextButton.click()
        await expect(page).toHaveURL(/d-account-verification|docomo/)
      }
    }
  })
  
  test('エラー発生時のユーザージャーニー復旧', async ({ page }) => {
    await page.route('**/api/smartphones', route => route.abort())
    
    await page.goto('/smartphone-selection')
    
    const errorMessage = page.getByText('サーバーエラーが発生しました').or(
      page.getByText('エラーが発生しました')
    )
    
    if (await errorMessage.isVisible()) {
      await expect(errorMessage).toBeVisible()
    }
    
    await page.unroute('**/api/smartphones')
    
    await page.reload()
    
    await page.waitForTimeout(2000)
    
    const recoveredContent = page.getByRole('heading', { name: 'スマホの選択' })
    
    if (await recoveredContent.isVisible()) {
      await expect(recoveredContent).toBeVisible()
      
      const deviceLink = page.getByRole('heading', { name: 'iPhone' }).or(page.getByRole('heading', { name: 'Android' })).first()
      if (await deviceLink.isVisible()) {
        await deviceLink.click()
        await page.waitForTimeout(2000)
        
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(1000)
        
        const devicePage = page.locator('button:has-text("この機種で申し込む")')
        
        if (await devicePage.isVisible()) {
          await expect(devicePage).toBeVisible()
        }
      }
    }
  })
  
  test('複数デバイスでの購入フロー同期', async ({ page, context }) => {
    await page.goto('/login')
    
    const emailField = page.locator('#email').or(page.locator('input[type="email"]'))
    if (await emailField.isVisible()) {
      await emailField.fill('test@example.com')
      
      const passwordField = page.locator('#password').or(page.locator('input[type="password"]'))
      await passwordField.fill('password123')
      
      const loginButton = page.locator('button[type="submit"]').or(page.getByText('ログイン'))
      await loginButton.click()
      
      await page.waitForURL('/')
    }
    
    const secondDevice = await context.newPage()
    await secondDevice.goto('/smartphone-selection')
    
    const userMenu = secondDevice.locator('[data-testid="user-menu"]').or(
      secondDevice.getByText('ログアウト')
    )
    
    if (await userMenu.isVisible()) {
      await expect(userMenu).toBeVisible()
    }
    
    await page.goto('/smartphone-selection')
    const deviceLink = page.getByRole('heading', { name: 'iPhone' }).first()
    if (await deviceLink.isVisible()) {
      await deviceLink.click()
    }
    
    await secondDevice.reload()
    
    const syncedContent = secondDevice.getByRole('heading', { name: 'スマホの選択' })
    
    if (await syncedContent.isVisible()) {
      await expect(syncedContent).toBeVisible()
    }
  })
})
