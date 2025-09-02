import { test, expect } from '@playwright/test'

test.describe('Content Service API統合テスト', () => {
  test.describe('キャンペーンAPI', () => {
    test('キャンペーン一覧API', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/campaigns')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('campaigns')
      expect(Array.isArray(data.campaigns)).toBe(true)
      expect(data).toHaveProperty('total')
      expect(data).toHaveProperty('page')
      expect(data).toHaveProperty('limit')
      
      if (data.campaigns.length > 0) {
        const campaign = data.campaigns[0]
        expect(campaign).toHaveProperty('id')
        expect(campaign).toHaveProperty('title')
        expect(campaign).toHaveProperty('description')
        expect(campaign).toHaveProperty('imageUrl')
        expect(campaign).toHaveProperty('startDate')
        expect(campaign).toHaveProperty('endDate')
        expect(campaign).toHaveProperty('isActive')
      }
    })

    test('キャンペーン一覧API - ページネーション', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/campaigns?page=1&limit=5')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('campaigns')
      expect(data.page).toBe(1)
      expect(data.limit).toBe(5)
      expect(data.campaigns.length).toBeLessThanOrEqual(5)
    })

    test('キャンペーン詳細API', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/campaigns/1')
      
      expect(response.status()).toBe(404)
    })

    test('存在しないキャンペーンIDでの404エラー', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/campaigns/99999')
      
      expect(response.status()).toBe(404)
    })

    test('無効なキャンペーンIDでの400エラー', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/campaigns/invalid-id')
      
      expect(response.status()).toBe(400)
    })
  })

  test.describe('ニュースAPI', () => {
    test('ニュース一覧API', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/news')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('news')
      expect(Array.isArray(data.news)).toBe(true)
      expect(data).toHaveProperty('total')
      expect(data).toHaveProperty('page')
      expect(data).toHaveProperty('limit')
      
      if (data.news.length > 0) {
        const newsItem = data.news[0]
        expect(newsItem).toHaveProperty('id')
        expect(newsItem).toHaveProperty('title')
        expect(newsItem).toHaveProperty('summary')
        expect(newsItem).toHaveProperty('publishedAt')
        expect(newsItem).toHaveProperty('category')
        expect(newsItem).toHaveProperty('isImportant')
      }
    })

    test('ニュース一覧API - ページネーション', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/news?page=2&limit=3')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('news')
      expect(data.page).toBe(2)
      expect(data.limit).toBe(3)
      expect(data.news.length).toBeLessThanOrEqual(3)
    })

    test('ニュース詳細API', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/news/1')
      
      expect(response.status()).toBe(404)
    })

    test('存在しないニュースIDでの404エラー', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/news/99999')
      
      expect(response.status()).toBe(404)
    })

    test('無効なニュースIDでの400エラー', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/news/invalid-id')
      
      expect(response.status()).toBe(400)
    })
  })

  test.describe('お問い合わせAPI', () => {
    test('お問い合わせ送信API', async ({ request }) => {
      const requestBody = {
        name: '田中太郎',
        email: 'tanaka@example.com',
        category: 'PLAN',
        subject: 'サービスについて',
        message: 'ahamoのサービス内容について詳しく教えてください。'
      }
      
      const response = await request.post('http://localhost:8082/api/v1/contact', {
        data: requestBody
      })
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('name')
      expect(data).toHaveProperty('email')
      expect(data).toHaveProperty('category')
      expect(data).toHaveProperty('subject')
      expect(data).toHaveProperty('message')
      expect(data).toHaveProperty('status')
      expect(data).toHaveProperty('createdAt')
      expect(data.status).toBe('RECEIVED')
    })

    test('お問い合わせ送信API - バリデーションエラー', async ({ request }) => {
      const requestBody = {
        name: '',
        email: 'invalid-email',
        category: 'PLAN',
        subject: '',
        message: ''
      }
      
      const response = await request.post('http://localhost:8082/api/v1/contact', {
        data: requestBody
      })
      
      expect(response.status()).toBe(400)
    })

    test('お問い合わせカテゴリ一覧API', async ({ request }) => {
      const response = await request.get('http://localhost:8082/api/v1/contact/categories')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('categories')
      expect(Array.isArray(data.categories)).toBe(true)
      
      if (data.categories.length > 0) {
        const category = data.categories[0]
        expect(category).toHaveProperty('id')
        expect(category).toHaveProperty('name')
        expect(category).toHaveProperty('description')
      }
    })
  })
})
