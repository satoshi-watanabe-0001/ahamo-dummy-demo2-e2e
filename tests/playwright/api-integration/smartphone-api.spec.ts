import { test, expect } from '@playwright/test'

test.describe('スマートフォンAPI統合テスト', () => {
  test('スマートフォン一覧API', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphones')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('smartphones')
    expect(Array.isArray(data.smartphones)).toBe(true)
    
    if (data.smartphones.length > 0) {
      const smartphone = data.smartphones[0]
      expect(smartphone).toHaveProperty('id')
      expect(smartphone).toHaveProperty('name')
      expect(smartphone).toHaveProperty('brand')
      expect(smartphone).toHaveProperty('price')
      expect(smartphone).toHaveProperty('imageUrl')
    }
  })

  test('スマートフォン詳細API', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphones/iphone-15')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('specifications')
    expect(data).toHaveProperty('features')
    expect(data).toHaveProperty('colorOptions')
  })

  test('スマートフォンオプションAPI', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphone-options/iphone-15')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('dataPlans')
    expect(data).toHaveProperty('voiceOptions')
    expect(data).toHaveProperty('overseaCallingOptions')
    expect(Array.isArray(data.dataPlans)).toBe(true)
    expect(Array.isArray(data.voiceOptions)).toBe(true)
    expect(Array.isArray(data.overseaCallingOptions)).toBe(true)
  })

  test('存在しないスマートフォンIDでの404エラー', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphones/non-existent-id')
    
    expect(response.status()).toBe(404)
    const data = await response.json()
    expect(data).toHaveProperty('error')
    expect(data.error).toContain('not found')
  })

  test('スマートフォンブランド別取得API', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphones?brand=Apple')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('smartphones')
    expect(Array.isArray(data.smartphones)).toBe(true)
    
    data.smartphones.forEach(smartphone => {
      expect(smartphone.brand).toBe('Apple')
    })
  })

  test('価格範囲でのフィルタリングAPI', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphones?minPrice=50000&maxPrice=100000')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('smartphones')
    expect(Array.isArray(data.smartphones)).toBe(true)
    
    data.smartphones.forEach(smartphone => {
      expect(smartphone.price).toBeGreaterThanOrEqual(50000)
      expect(smartphone.price).toBeLessThanOrEqual(100000)
    })
  })

  test('スマートフォン検索API', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphones/search?q=iPhone')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('smartphones')
    expect(Array.isArray(data.smartphones)).toBe(true)
    
    data.smartphones.forEach(smartphone => {
      expect(smartphone.name.toLowerCase()).toContain('iphone')
    })
  })

  test('データプランAPI', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/data-plans')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('dataPlans')
    expect(Array.isArray(data.dataPlans)).toBe(true)
    
    if (data.dataPlans.length > 0) {
      const plan = data.dataPlans[0]
      expect(plan).toHaveProperty('id')
      expect(plan).toHaveProperty('title')
      expect(plan).toHaveProperty('price')
      expect(plan).toHaveProperty('dataAmount')
    }
  })

  test('ボイスオプションAPI', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/voice-options')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('voiceOptions')
    expect(Array.isArray(data.voiceOptions)).toBe(true)
    
    if (data.voiceOptions.length > 0) {
      const option = data.voiceOptions[0]
      expect(option).toHaveProperty('id')
      expect(option).toHaveProperty('title')
      expect(option).toHaveProperty('price')
      expect(option).toHaveProperty('description')
    }
  })

  test('在庫確認API', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/smartphones/iphone-15/stock')
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('inStock')
    expect(data).toHaveProperty('quantity')
    expect(data).toHaveProperty('estimatedDelivery')
    expect(typeof data.inStock).toBe('boolean')
    expect(typeof data.quantity).toBe('number')
  })

  test('価格計算API', async ({ request }) => {
    const requestBody = {
      deviceId: 'iphone-15',
      dataPlanId: 'plan-20gb',
      voiceOptionId: 'voice-5min',
      overseaOptionId: 'oversea-unlimited'
    }
    
    const response = await request.post('http://localhost:3001/api/calculate-price', {
      data: requestBody
    })
    
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('totalPrice')
    expect(data).toHaveProperty('breakdown')
    expect(data).toHaveProperty('monthlyPrice')
    expect(typeof data.totalPrice).toBe('number')
    expect(typeof data.monthlyPrice).toBe('number')
    expect(Array.isArray(data.breakdown)).toBe(true)
  })
})
