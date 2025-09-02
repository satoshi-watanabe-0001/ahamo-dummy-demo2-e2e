import { test, expect } from '@playwright/test'

test.describe('API Gateway統合テスト', () => {
  test.describe('Content Service経由のルーティング', () => {
    test('キャンペーン一覧API - Gateway経由', async ({ request }) => {
      const response = await request.get('http://localhost:3001/api/v1/campaigns')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('campaigns')
      expect(Array.isArray(data.campaigns)).toBe(true)
    })

    test('ニュース一覧API - Gateway経由', async ({ request }) => {
      const response = await request.get('http://localhost:3001/api/v1/news')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('news')
      expect(Array.isArray(data.news)).toBe(true)
    })

    test('お問い合わせカテゴリAPI - Gateway経由', async ({ request }) => {
      const response = await request.get('http://localhost:3001/api/v1/contact/categories')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('categories')
      expect(Array.isArray(data.categories)).toBe(true)
    })

    test('お問い合わせ送信API - Gateway経由', async ({ request }) => {
      const requestBody = {
        name: 'Gateway テスト',
        email: 'gateway-test@example.com',
        category: 'PLAN',
        subject: 'Gateway経由テスト',
        message: 'API Gatewayを経由したお問い合わせテストです。'
      }
      
      const response = await request.post('http://localhost:3001/api/v1/contact', {
        data: requestBody
      })
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('status')
      expect(data.status).toBe('RECEIVED')
    })
  })

  test.describe('Application Service経由のルーティング', () => {
    test('申し込み作成API - Gateway経由', async ({ request }) => {
      const requestBody = {
        email: 'gateway-app-test@example.com',
        userName: 'Gateway申し込みテスト',
        phoneNumber: '020-1111-2222',
        planId: 'ahamo-20gb',
        deviceId: 'iphone-15'
      }
      
      const response = await request.post('http://localhost:3001/api/v1/application', {
        data: requestBody
      })
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('applicationId')
      expect(data).toHaveProperty('status')
      expect(data.status).toBe('DRAFT')
    })

    test('サインアップフロー設定API - Gateway経由', async ({ request }) => {
      const response = await request.get('http://localhost:3001/api/v1/signup/flow-config')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('totalSteps')
      expect(data).toHaveProperty('steps')
      expect(data.totalSteps).toBe(5)
    })

    test('サインアップ検証API - Gateway経由', async ({ request }) => {
      const requestBody = {
        applicationId: 'GATEWAY-TEST-001',
        stepData: '{"userName":"Gateway検証テスト","email":"gateway-validation@example.com"}',
        stepNumber: 1
      }
      
      const response = await request.post('http://localhost:3001/api/v1/signup/validate', {
        data: requestBody
      })
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('isValid')
      expect(data).toHaveProperty('errors')
      expect(Array.isArray(data.errors)).toBe(true)
    })
  })

  test.describe('レート制限テスト', () => {
    test('Content Service - レート制限内でのリクエスト', async ({ request }) => {
      const promises: Promise<any>[] = []
      for (let i = 0; i < 5; i++) {
        promises.push(request.get('http://localhost:3001/api/v1/campaigns'))
      }
      
      const responses = await Promise.all(promises)
      responses.forEach(response => {
        expect([200, 429]).toContain(response.status())
      })
    })

    test('Application Service - レート制限内でのリクエスト', async ({ request }) => {
      const promises: Promise<any>[] = []
      for (let i = 0; i < 5; i++) {
        promises.push(request.get('http://localhost:3001/api/v1/signup/flow-config'))
      }
      
      const responses = await Promise.all(promises)
      responses.forEach(response => {
        expect([200, 429]).toContain(response.status())
      })
    })
  })

  test.describe('エラーハンドリング', () => {
    test('存在しないエンドポイント - 404エラー', async ({ request }) => {
      const response = await request.get('http://localhost:3001/api/v1/nonexistent')
      
      expect([404, 401]).toContain(response.status())
    })

    test('無効なHTTPメソッド - 405エラー', async ({ request }) => {
      const response = await request.patch('http://localhost:3001/api/v1/campaigns')
      
      expect([405, 404, 403]).toContain(response.status())
    })
  })
})
