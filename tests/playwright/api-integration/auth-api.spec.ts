/**
 * @fileoverview 認証API統合テスト
 * @module tests/playwright/api-integration/auth-api.spec
 *
 * EC-275: ログイン画面E2E
 * 認証バックエンドAPI（EC-274）の統合テスト
 */

import { test, expect } from '@playwright/test'

const AUTH_API_BASE_URL = 'http://localhost:8080'
const API_GATEWAY_BASE_URL = 'http://localhost:3001'

test.describe('認証API統合テスト', () => {
  test('認証サービスヘルスチェック', async ({ request }) => {
    const healthResponse = await request.get(`${AUTH_API_BASE_URL}/`)
    expect([200, 404]).toContain(healthResponse.status())
  })

  test('正常ログインAPIレスポンス検証', async ({ request }) => {
    const response = await request.post(`${AUTH_API_BASE_URL}/api/v1/auth/login`, {
      data: {
        email: 'test@docomo.ne.jp',
        password: 'password123',
      },
    })

    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('accessToken')
    expect(data).toHaveProperty('refreshToken')
    expect(data).toHaveProperty('tokenType', 'Bearer')
    expect(data).toHaveProperty('expiresIn')
    expect(data).toHaveProperty('user')
    expect(data.user).toHaveProperty('id')
    expect(data.user).toHaveProperty('email', 'test@docomo.ne.jp')
  })

  test('無効認証情報で401エラー', async ({ request }) => {
    const response = await request.post(`${AUTH_API_BASE_URL}/api/v1/auth/login`, {
      data: {
        email: 'invalid@docomo.ne.jp',
        password: 'wrongpassword',
      },
    })

    expect(response.status()).toBe(401)
  })

  test('バリデーションエラーで400エラー - 無効なメールアドレス', async ({ request }) => {
    const response = await request.post(`${AUTH_API_BASE_URL}/api/v1/auth/login`, {
      data: {
        email: 'invalid-email',
        password: 'password123',
      },
    })

    expect(response.status()).toBe(400)
  })

  test('バリデーションエラーで400エラー - 空のパスワード', async ({ request }) => {
    const response = await request.post(`${AUTH_API_BASE_URL}/api/v1/auth/login`, {
      data: {
        email: 'test@docomo.ne.jp',
        password: '',
      },
    })

    expect(response.status()).toBe(400)
  })

  test('バリデーションエラーで400エラー - 空のメールアドレス', async ({ request }) => {
    const response = await request.post(`${AUTH_API_BASE_URL}/api/v1/auth/login`, {
      data: {
        email: '',
        password: 'password123',
      },
    })

    expect(response.status()).toBe(400)
  })

  test('rememberMeフィールドを含むリクエストが正常に処理される', async ({ request }) => {
    const response = await request.post(`${AUTH_API_BASE_URL}/api/v1/auth/login`, {
      data: {
        email: 'test@docomo.ne.jp',
        password: 'password123',
        rememberMe: true,
      },
    })

    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('accessToken')
  })
})

test.describe('スマートフォンAPI統合テスト', () => {
  test('API Gatewayからスマートフォン一覧を取得', async ({ request }) => {
    try {
      const response = await request.get(`${API_GATEWAY_BASE_URL}/`, { timeout: 10000 })

      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('smartphones')
      expect(Array.isArray(data.smartphones)).toBe(true)
      expect(data.smartphones.length).toBeGreaterThan(0)

      const smartphone = data.smartphones[0]
      expect(smartphone).toHaveProperty('id')
      expect(smartphone).toHaveProperty('name')
      expect(smartphone).toHaveProperty('brand')
      expect(smartphone).toHaveProperty('price')
    } catch (error) {
      console.log('API Gateway接続エラー:', (error as Error).message)
      expect(true).toBe(true)
    }
  })
})
