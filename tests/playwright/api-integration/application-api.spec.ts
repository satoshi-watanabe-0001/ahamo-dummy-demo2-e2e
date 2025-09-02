import { test, expect } from '@playwright/test'

test.describe('Application Service API統合テスト', () => {
  test.describe('申し込みAPI', () => {
    test('申し込み作成API', async ({ request }) => {
      const requestBody = {
        email: 'test@example.com',
        userName: '田中太郎',
        phone: '090-1234-5678',
        selectedPlan: 'ahamo-20gb',
        selectedDevice: 'iphone-15'
      }
      
      const response = await request.post('http://localhost:8083/api/v1/application', {
        data: requestBody
      })
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('applicationId')
      expect(data).toHaveProperty('email')
      expect(data).toHaveProperty('userName')
      expect(data).toHaveProperty('phone')
      expect(data).toHaveProperty('selectedPlan')
      expect(data).toHaveProperty('selectedDevice')
      expect(data).toHaveProperty('status')
      expect(data).toHaveProperty('currentStep')
      expect(data).toHaveProperty('createdAt')
      expect(data.status).toBe('DRAFT')
      expect(data.currentStep).toBe(1)
    })

    test('申し込み作成API - バリデーションエラー', async ({ request }) => {
      const requestBody = {
        email: 'invalid-email',
        userName: '',
        phone: 'invalid-phone',
        selectedPlan: '',
        selectedDevice: ''
      }
      
      const response = await request.post('http://localhost:8083/api/v1/application', {
        data: requestBody
      })
      
      expect(response.status()).toBe(400)
    })

    test('申し込み詳細取得API', async ({ request }) => {
      const createResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: {
          email: 'test2@example.com',
          userName: '佐藤花子',
          phone: '080-9876-5432',
          selectedPlan: 'ahamo-100gb',
          selectedDevice: 'galaxy-s24'
        }
      })
      
      expect(createResponse.status()).toBe(200)
      const createData = await createResponse.json()
      const applicationId = createData.applicationId
      
      const response = await request.get(`http://localhost:8083/api/v1/application/${applicationId}`)
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('applicationId')
      expect(data.applicationId).toBe(applicationId)
      expect(data).toHaveProperty('email')
      expect(data).toHaveProperty('userName')
      expect(data).toHaveProperty('status')
      expect(data).toHaveProperty('currentStep')
    })

    test('存在しない申し込みIDでの404エラー', async ({ request }) => {
      const response = await request.get('http://localhost:8083/api/v1/application/non-existent-id')
      
      expect(response.status()).toBe(404)
    })

    test('申し込み一覧取得API', async ({ request }) => {
      const email = 'list-test@example.com'
      
      await request.post('http://localhost:8083/api/v1/application', {
        data: {
          email: email,
          userName: '一覧テスト',
          phone: '070-1111-2222',
          selectedPlan: 'ahamo-20gb',
          selectedDevice: 'iphone-15'
        }
      })
      
      const response = await request.get(`http://localhost:8083/api/v1/application?email=${email}`)
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('applications')
      expect(Array.isArray(data.applications)).toBe(true)
      expect(data).toHaveProperty('total')
      expect(data).toHaveProperty('page')
      expect(data).toHaveProperty('limit')
      expect(data.applications.length).toBeGreaterThan(0)
      
      const application = data.applications[0]
      expect(application.email).toBe(email)
    })

    test('申し込み一覧取得API - ページネーション', async ({ request }) => {
      const email = 'pagination-test@example.com'
      
      const response = await request.get(`http://localhost:8083/api/v1/application?email=${email}&page=1&limit=5`)
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.page).toBe(1)
      expect(data.limit).toBe(5)
      expect(data.applications.length).toBeLessThanOrEqual(5)
    })

    test('申し込みステップ更新API', async ({ request }) => {
      const createResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: {
          email: 'step-test@example.com',
          userName: 'ステップテスト',
          phone: '060-3333-4444',
          selectedPlan: 'ahamo-20gb',
          selectedDevice: 'iphone-15'
        }
      })
      
      const createData = await createResponse.json()
      const applicationId = createData.applicationId
      
      const stepUpdateBody = {
        stepNumber: 2,
        stepData: '{"planSelection":"ahamo-100gb","additionalOptions":["voice-unlimited"]}'
      }
      
      const response = await request.put(`http://localhost:8083/api/v1/application/${applicationId}/step`, {
        data: stepUpdateBody
      })
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.currentStep).toBe(3)
    })

    test('申し込み提出API', async ({ request }) => {
      const createResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: {
          email: 'submit-test@example.com',
          userName: '提出テスト',
          phone: '050-5555-6666',
          selectedPlan: 'ahamo-20gb',
          selectedDevice: 'iphone-15'
        }
      })
      
      const createData = await createResponse.json()
      const applicationId = createData.applicationId
      
      const response = await request.post(`http://localhost:8083/api/v1/application/${applicationId}/submit`)
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data.status).toBe('SUBMITTED')
    })

    test('申し込みステップ一覧取得API', async ({ request }) => {
      const createResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: {
          email: 'steps-test@example.com',
          userName: 'ステップ一覧テスト',
          phone: '040-7777-8888',
          selectedPlan: 'ahamo-20gb',
          selectedDevice: 'iphone-15'
        }
      })
      
      const createData = await createResponse.json()
      const applicationId = createData.applicationId
      
      const response = await request.get(`http://localhost:8083/api/v1/application/${applicationId}/steps`)
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(Array.isArray(data)).toBe(true)
      
      if (data.length > 0) {
        const step = data[0]
        expect(step).toHaveProperty('stepNumber')
        expect(step).toHaveProperty('stepData')
        expect(step).toHaveProperty('completedAt')
      }
    })
  })

  test.describe('サインアップAPI', () => {
    test('サインアップ検証API', async ({ request }) => {
      const requestBody = {
        applicationId: 'APP-TEST-001',
        stepData: '{"userName":"検証テスト","email":"validation@example.com","phoneNumber":"030-9999-0000"}',
        stepNumber: 1
      }
      
      const response = await request.post('http://localhost:8083/api/v1/signup/validate', {
        data: requestBody
      })
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('isValid')
      expect(data).toHaveProperty('errors')
      expect(data).toHaveProperty('message')
      expect(Array.isArray(data.errors)).toBe(true)
      
      if (data.isValid) {
        expect(data).toHaveProperty('nextStep')
      }
    })

    test('サインアップ検証API - バリデーションエラー', async ({ request }) => {
      const requestBody = {
        applicationId: '',
        stepData: '',
        stepNumber: 0
      }
      
      const response = await request.post('http://localhost:8083/api/v1/signup/validate', {
        data: requestBody
      })
      
      expect(response.status()).toBe(400)
    })

    test('サインアップフロー設定取得API', async ({ request }) => {
      const response = await request.get('http://localhost:8083/api/v1/signup/flow-config')
      
      expect(response.status()).toBe(200)
      const data = await response.json()
      expect(data).toHaveProperty('totalSteps')
      expect(data).toHaveProperty('steps')
      expect(data).toHaveProperty('estimatedTotalTime')
      expect(data).toHaveProperty('supportContact')
      expect(typeof data.totalSteps).toBe('number')
      expect(data.totalSteps).toBe(5)
      
      expect(data.steps).toHaveProperty('1')
      expect(data.steps).toHaveProperty('2')
      expect(data.steps).toHaveProperty('3')
      expect(data.steps).toHaveProperty('4')
      expect(data.steps).toHaveProperty('5')
      
      const step1 = data.steps['1']
      expect(step1).toHaveProperty('name')
      expect(step1).toHaveProperty('description')
      expect(step1).toHaveProperty('estimatedTime')
      expect(step1.name).toBe('基本情報入力')
      
      expect(data.supportContact).toHaveProperty('phone')
      expect(data.supportContact).toHaveProperty('email')
      expect(data.supportContact).toHaveProperty('hours')
    })
  })
})
