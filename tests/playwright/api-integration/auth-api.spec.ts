import { test, expect } from '@playwright/test'

test('認証API統合テスト', async ({ request }) => {
  const loginResponse = await request.post('http://localhost:8080/api/auth/login', {
    data: {
      username: 'testuser',
      password: 'password'
    }
  })
  
  expect(loginResponse.status()).toBe(200)
  const loginData = await loginResponse.json()
  expect(loginData.accessToken).toBeDefined()
  expect(loginData.refreshToken).toBeDefined()
  
  const verifyResponse = await request.post('http://localhost:8080/api/auth/verify', {
    headers: {
      'Authorization': `Bearer ${loginData.accessToken}`
    }
  })
  
  expect(verifyResponse.status()).toBe(200)
})

test('スマートフォンAPI統合テスト', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/smartphones')
  
  expect(response.status()).toBe(200)
  const data = await response.json()
  expect(Array.isArray(data)).toBe(true)
  expect(data.length).toBeGreaterThan(0)
})
