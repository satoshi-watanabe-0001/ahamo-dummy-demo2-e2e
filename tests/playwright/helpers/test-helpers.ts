import { Page, expect } from '@playwright/test'

export class TestHelpers {
  static async waitForPageLoad(page: Page, timeout = 10000) {
    await page.waitForLoadState('networkidle', { timeout })
  }

  static async takeScreenshotOnFailure(page: Page, testName: string) {
    await page.screenshot({ 
      path: `test-results/screenshots/${testName}-failure.png`,
      fullPage: true 
    })
  }

  static async selectDataPlan(page: Page, planType: '20gb' | '100gb' | 'unlimited') {
    await page.click(`[data-testid="data-plan-${planType}"]`)
    await expect(page.locator(`[data-testid="data-plan-${planType}"]`)).toHaveClass(/selected/)
  }

  static async completeBasicSignup(page: Page, options: {
    phoneOption: 'keep' | 'new'
    carrierOption?: 'docomo' | 'other'
    deviceOption?: 'buy' | 'no-buy'
    simOption?: 'esim' | 'physical'
  }) {
    await page.goto('/signup')
    await page.click(`[data-testid="phone-option-${options.phoneOption}"]`)
    
    if (options.carrierOption) {
      await page.click(`[data-testid="carrier-option-${options.carrierOption}"]`)
    }
    
    if (options.deviceOption) {
      await page.click(`[data-testid="device-option-${options.deviceOption}"]`)
    }
    
    if (options.simOption) {
      await page.click(`[data-testid="sim-option-${options.simOption}"]`)
    }
  }

  static async loginUser(page: Page, email = 'test@example.com', password = 'password123') {
    await page.goto('/login')
    await page.fill('#email', email)
    await page.fill('#password', password)
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
  }

  static async selectSmartphone(page: Page, type: 'iphone' | 'android' | 'docomo-certified') {
    await page.goto('/smartphone-selection')
    
    switch (type) {
      case 'iphone':
        await page.click('text=iPhone')
        break
      case 'android':
        await page.click('text=Android')
        break
      case 'docomo-certified':
        await page.click('text=ドコモ認定リユース品')
        break
    }
    
    await expect(page).toHaveURL(new RegExp(`/smartphones/${type}`))
  }

  static async configureSmartphoneOptions(page: Page, deviceId: string, options?: {
    dataPlan?: string
    voiceOption?: string
    overseaOption?: string
  }) {
    await page.goto(`/smartphone-options/${deviceId}`)
    
    if (options?.dataPlan) {
      await page.click(`[data-testid="data-plan-${options.dataPlan}"]`)
    } else {
      const firstDataPlan = page.locator('[data-testid^="data-plan-"]').first()
      await firstDataPlan.click()
    }
    
    if (options?.voiceOption) {
      await page.click(`[data-testid="voice-option-${options.voiceOption}"]`)
    }
    
    if (options?.overseaOption) {
      await page.click(`[data-testid="oversea-option-${options.overseaOption}"]`)
    }
    
    const nextButton = page.locator('text=次へ')
    await expect(nextButton).not.toBeDisabled()
    
    return nextButton
  }

  static async verifyErrorMessage(page: Page, expectedMessage: string) {
    await expect(page.getByText(expectedMessage)).toBeVisible()
  }

  static async verifySuccessMessage(page: Page, expectedMessage: string) {
    await expect(page.getByText(expectedMessage)).toBeVisible()
  }

  static async mockApiResponse(page: Page, endpoint: string, response: any, status = 200) {
    await page.route(endpoint, route => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(response)
      })
    })
  }

  static async mockApiError(page: Page, endpoint: string, status = 500, errorMessage = 'Internal Server Error') {
    await page.route(endpoint, route => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify({ error: errorMessage })
      })
    })
  }

  static async verifyFormValidation(page: Page, fieldSelector: string, expectedError: string) {
    await page.click('button[type="submit"]')
    await expect(page.locator(`${fieldSelector} + .error-message`).or(page.getByText(expectedError))).toBeVisible()
  }

  static async fillContactForm(page: Page, data: {
    name?: string
    email?: string
    phone?: string
    message?: string
  }) {
    if (data.name) {
      await page.fill('[data-testid="contact-name"]', data.name)
    }
    if (data.email) {
      await page.fill('[data-testid="contact-email"]', data.email)
    }
    if (data.phone) {
      await page.fill('[data-testid="contact-phone"]', data.phone)
    }
    if (data.message) {
      await page.fill('[data-testid="contact-message"]', data.message)
    }
  }

  static async verifyResponsiveLayout(page: Page, viewport: { width: number, height: number }) {
    await page.setViewportSize(viewport)
    
    const body = page.locator('body')
    const bodyBox = await body.boundingBox()
    
    if (bodyBox) {
      expect(bodyBox.width).toBeLessThanOrEqual(viewport.width)
    }
  }

  static async verifyAccessibility(page: Page) {
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingCount = await headings.count()
    expect(headingCount).toBeGreaterThan(0)
    
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  }

  static async simulateSlowNetwork(page: Page) {
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await route.continue()
    })
  }

  static async clearAllRoutes(page: Page) {
    await page.unroute('**/*')
  }
}
