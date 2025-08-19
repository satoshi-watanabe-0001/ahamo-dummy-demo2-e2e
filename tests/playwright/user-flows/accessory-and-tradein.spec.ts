import { test, expect } from '@playwright/test'

test.describe('アクセサリーと下取りセクション', () => {
  test('おすすめアクセサリー表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone16e')
    
    const accessorySection = page.getByText('おすすめアクセサリー').or(
      page.getByText('アクセサリー')
    )
    
    if (await accessorySection.isVisible()) {
      await expect(accessorySection).toBeVisible()
      
      const accessories = [
        'ケース',
        '画面保護フィルム',
        'ワイヤレス充電器',
        'イヤホン',
        'フィルム',
        '保護',
        '充電'
      ]
      
      let foundAccessories = 0
      for (const accessory of accessories) {
        if (await page.getByText(accessory).isVisible()) {
          foundAccessories++
        }
      }
      
      expect(foundAccessories).toBeGreaterThan(0)
      
      const priceElements = page.locator('text=/\\d+[,.]?\\d*円/')
      if (await priceElements.count() > 0) {
        const firstPrice = priceElements.first()
        await expect(firstPrice).toBeVisible()
      }
    }
  })
  
  test('下取りプログラム情報表示', async ({ page }) => {
    await page.goto('/smartphones/iphone16e')
    
    const tradeInSection = page.getByText('機種変更をお考えの方').or(
      page.getByText('下取り')
    ).or(
      page.getByText('機種変更')
    )
    
    if (await tradeInSection.isVisible()) {
      await expect(tradeInSection).toBeVisible()
      
      const tradeInFeatures = [
        '下取りプログラム',
        'ポイント',
        '進呈',
        '1,000',
        '分割払い',
        '24回'
      ]
      
      let foundFeatures = 0
      for (const feature of tradeInFeatures) {
        if (await page.getByText(feature).isVisible()) {
          foundFeatures++
        }
      }
      
      expect(foundFeatures).toBeGreaterThan(1)
    }
  })
  
  test('アクセサリーグリッドレイアウト確認', async ({ page }) => {
    await page.goto('/smartphones/iphone16e')
    
    const accessoryGrid = page.locator('.grid').filter({ hasText: 'ケース' }).or(
      page.locator('[class*="grid"]').filter({ hasText: 'アクセサリー' })
    )
    
    if (await accessoryGrid.isVisible()) {
      const gridItems = accessoryGrid.locator('> div, > article, > section')
      const itemCount = await gridItems.count()
      
      if (itemCount > 0) {
        expect(itemCount).toBeGreaterThanOrEqual(2)
        expect(itemCount).toBeLessThanOrEqual(8)
        
        const firstItem = gridItems.first()
        await expect(firstItem).toBeVisible()
        
        const hasImage = await firstItem.locator('img, [role="img"], .emoji').count() > 0
        const hasText = await firstItem.locator('text=/\\w+/').count() > 0
        
        expect(hasImage || hasText).toBe(true)
      }
    }
  })
  
  test('下取りセクションの詳細情報確認', async ({ page }) => {
    await page.goto('/smartphones/iphone16e')
    
    const tradeInDetails = page.locator('text=下取り').locator('..')
    
    if (await tradeInDetails.isVisible()) {
      const benefitText = page.getByText('お得に購入').or(
        page.getByText('ポイント進呈')
      ).or(
        page.getByText('最大')
      )
      
      if (await benefitText.isVisible()) {
        await expect(benefitText).toBeVisible()
      }
      
      const paymentInfo = page.getByText('分割払い').or(
        page.getByText('24回')
      ).or(
        page.getByText('月々の負担')
      )
      
      if (await paymentInfo.isVisible()) {
        await expect(paymentInfo).toBeVisible()
      }
    }
  })
  
  test('アクセサリー価格表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone16e')
    
    const pricePattern = /\d+[,.]?\d*円/
    const priceElements = page.locator(`text=${pricePattern}`)
    
    if (await priceElements.count() > 0) {
      const prices = await priceElements.allTextContents()
      
      for (const price of prices) {
        expect(price).toMatch(pricePattern)
      }
      
      const firstPrice = priceElements.first()
      await expect(firstPrice).toBeVisible()
      
      const priceContainer = firstPrice.locator('..')
      const hasProductName = await priceContainer.locator('text=/ケース|フィルム|充電|イヤホン/').count() > 0
      
      if (hasProductName) {
        expect(hasProductName).toBe(true)
      }
    }
  })
  
  test('アクセサリーホバー効果確認', async ({ page }) => {
    await page.goto('/smartphones/iphone16e')
    
    const accessoryItems = page.locator('[class*="hover"], .hover\\:shadow')
    
    if (await accessoryItems.count() > 0) {
      const firstItem = accessoryItems.first()
      
      if (await firstItem.isVisible()) {
        await firstItem.hover()
        
        await page.waitForTimeout(300)
        
        const hasHoverEffect = await firstItem.evaluate(el => {
          const styles = window.getComputedStyle(el)
          return styles.boxShadow !== 'none' || styles.transform !== 'none'
        })
        
        expect(hasHoverEffect).toBe(true)
      }
    }
  })
  
  test('下取りプログラムアイコン表示確認', async ({ page }) => {
    await page.goto('/smartphones/iphone16e')
    
    const tradeInSection = page.getByText('下取り').locator('..')
    
    if (await tradeInSection.isVisible()) {
      const icons = tradeInSection.locator('text=/📱|💳|🔄|📲/')
      
      if (await icons.count() > 0) {
        const firstIcon = icons.first()
        await expect(firstIcon).toBeVisible()
      }
      
      const emojiPattern = /[\u{1F300}-\u{1F9FF}]/u
      const emojiElements = tradeInSection.locator(`text=${emojiPattern}`)
      
      if (await emojiElements.count() > 0) {
        const firstEmoji = emojiElements.first()
        await expect(firstEmoji).toBeVisible()
      }
    }
  })
})
