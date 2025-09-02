import { test, expect } from '@playwright/test'

test.describe('クロスサービス統合テスト', () => {
  test.describe('キャンペーンから申し込みまでの完全フロー', () => {
    test('キャンペーン閲覧から申し込み作成まで', async ({ request }) => {
      const campaignResponse = await request.get('http://localhost:8082/campaigns/1')
      expect(campaignResponse.status()).toBe(200)
      const campaign = await campaignResponse.json()
      expect(campaign).toHaveProperty('id')
      expect(campaign).toHaveProperty('title')
      
      const applicationBody = {
        email: 'campaign-flow@example.com',
        userName: 'キャンペーンフロー',
        phoneNumber: '010-1234-5678',
        planId: 'ahamo-20gb',
        deviceId: 'iphone-15',
        campaignId: campaign.id.toString()
      }
      
      const applicationResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: applicationBody
      })
      
      expect(applicationResponse.status()).toBe(200)
      const application = await applicationResponse.json()
      expect(application).toHaveProperty('applicationId')
      expect(application.status).toBe('DRAFT')
    })

    test('ニュース確認後のサインアップフロー', async ({ request }) => {
      const newsResponse = await request.get('http://localhost:8082/news')
      expect(newsResponse.status()).toBe(200)
      const newsData = await newsResponse.json()
      expect(newsData).toHaveProperty('news')
      expect(Array.isArray(newsData.news)).toBe(true)
      
      const flowConfigResponse = await request.get('http://localhost:8083/api/v1/signup/flow-config')
      expect(flowConfigResponse.status()).toBe(200)
      const flowConfig = await flowConfigResponse.json()
      expect(flowConfig).toHaveProperty('totalSteps')
      expect(flowConfig.totalSteps).toBe(5)
      
      const validationBody = {
        applicationId: 'NEWS-FLOW-001',
        stepData: '{"userName":"ニュースフロー","email":"news-flow@example.com","referenceNewsId":"1"}',
        stepNumber: 1
      }
      
      const validationResponse = await request.post('http://localhost:8083/api/v1/signup/validate', {
        data: validationBody
      })
      
      expect(validationResponse.status()).toBe(200)
      const validation = await validationResponse.json()
      expect(validation).toHaveProperty('isValid')
      expect(validation).toHaveProperty('errors')
    })
  })

  test.describe('お問い合わせと申し込みの連携', () => {
    test('お問い合わせ送信後の申し込み作成', async ({ request }) => {
      const contactBody = {
        name: '連携テスト',
        email: 'integration-test@example.com',
        category: 'APPLICATION',
        subject: '申し込みについて',
        message: '申し込み手続きについて質問があります。'
      }
      
      const contactResponse = await request.post('http://localhost:8082/contact', {
        data: contactBody
      })
      
      expect(contactResponse.status()).toBe(200)
      const contact = await contactResponse.json()
      expect(contact).toHaveProperty('id')
      expect(contact.status).toBe('RECEIVED')
      
      const applicationBody = {
        email: contactBody.email,
        userName: contactBody.name,
        phoneNumber: '080-9999-1111',
        planId: 'ahamo-100gb',
        deviceId: 'galaxy-s24',
        contactReference: contact.id.toString()
      }
      
      const applicationResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: applicationBody
      })
      
      expect(applicationResponse.status()).toBe(200)
      const application = await applicationResponse.json()
      expect(application).toHaveProperty('applicationId')
      expect(application.email).toBe(contactBody.email)
    })

    test('申し込み作成後のお問い合わせ', async ({ request }) => {
      const applicationBody = {
        email: 'app-contact-test@example.com',
        userName: '申し込み後問い合わせ',
        phoneNumber: '070-8888-2222',
        planId: 'ahamo-20gb',
        deviceId: 'iphone-15'
      }
      
      const applicationResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: applicationBody
      })
      
      expect(applicationResponse.status()).toBe(200)
      const application = await applicationResponse.json()
      
      const contactBody = {
        name: applicationBody.userName,
        email: applicationBody.email,
        category: 'APPLICATION',
        subject: '申し込み状況確認',
        message: `申し込みID: ${application.applicationId} の状況を確認したいです。`,
        applicationReference: application.applicationId
      }
      
      const contactResponse = await request.post('http://localhost:8082/contact', {
        data: contactBody
      })
      
      expect(contactResponse.status()).toBe(200)
      const contact = await contactResponse.json()
      expect(contact).toHaveProperty('id')
      expect(contact.email).toBe(application.email)
    })
  })

  test.describe('Gateway経由の完全統合テスト', () => {
    test('Gateway経由での完全ユーザージャーニー', async ({ request }) => {
      const campaignResponse = await request.get('http://localhost:3001/api/v1/campaigns')
      expect(campaignResponse.status()).toBe(200)
      const campaigns = await campaignResponse.json()
      expect(campaigns).toHaveProperty('campaigns')
      
      const newsResponse = await request.get('http://localhost:3001/api/v1/news')
      expect(newsResponse.status()).toBe(200)
      const news = await newsResponse.json()
      expect(news).toHaveProperty('news')
      
      const categoriesResponse = await request.get('http://localhost:3001/api/v1/contact/categories')
      expect(categoriesResponse.status()).toBe(200)
      const categories = await categoriesResponse.json()
      expect(categories).toHaveProperty('categories')
      
      const flowConfigResponse = await request.get('http://localhost:3001/api/v1/signup/flow-config')
      expect(flowConfigResponse.status()).toBe(200)
      const flowConfig = await flowConfigResponse.json()
      expect(flowConfig).toHaveProperty('totalSteps')
      
      const applicationBody = {
        email: 'complete-journey@example.com',
        userName: '完全ジャーニー',
        phoneNumber: '060-7777-3333',
        planId: 'ahamo-20gb',
        deviceId: 'iphone-15'
      }
      
      const applicationResponse = await request.post('http://localhost:3001/api/v1/application', {
        data: applicationBody
      })
      
      expect(applicationResponse.status()).toBe(200)
      const application = await applicationResponse.json()
      expect(application).toHaveProperty('applicationId')
      
      const validationBody = {
        applicationId: application.applicationId,
        stepData: JSON.stringify({
          userName: applicationBody.userName,
          email: applicationBody.email,
          phoneNumber: applicationBody.phoneNumber
        }),
        stepNumber: 1
      }
      
      const validationResponse = await request.post('http://localhost:3001/api/v1/signup/validate', {
        data: validationBody
      })
      
      expect(validationResponse.status()).toBe(200)
      const validation = await validationResponse.json()
      expect(validation).toHaveProperty('isValid')
      
      const contactBody = {
        name: applicationBody.userName,
        email: applicationBody.email,
        category: 'APPLICATION',
        subject: '申し込み完了確認',
        message: `申し込みが完了しました。ID: ${application.applicationId}`
      }
      
      const contactResponse = await request.post('http://localhost:3001/api/v1/contact', {
        data: contactBody
      })
      
      expect(contactResponse.status()).toBe(200)
      const contact = await contactResponse.json()
      expect(contact).toHaveProperty('id')
    })
  })

  test.describe('エラーシナリオの統合テスト', () => {
    test('無効なキャンペーンIDでの申し込み作成', async ({ request }) => {
      const applicationBody = {
        email: 'invalid-campaign@example.com',
        userName: '無効キャンペーン',
        phoneNumber: '050-4444-5555',
        planId: 'ahamo-20gb',
        deviceId: 'iphone-15',
        campaignId: '99999'
      }
      
      const applicationResponse = await request.post('http://localhost:8083/api/v1/application', {
        data: applicationBody
      })
      
      expect(applicationResponse.status()).toBe(200)
      const application = await applicationResponse.json()
      expect(application).toHaveProperty('applicationId')
    })

    test('存在しない申し込みIDでのお問い合わせ', async ({ request }) => {
      const contactBody = {
        name: '存在しない申し込み',
        email: 'nonexistent-app@example.com',
        category: 'APPLICATION',
        subject: '存在しない申し込み確認',
        message: '申し込みID: NON-EXISTENT-ID の確認をお願いします。',
        applicationReference: 'NON-EXISTENT-ID'
      }
      
      const contactResponse = await request.post('http://localhost:8082/contact', {
        data: contactBody
      })
      
      expect(contactResponse.status()).toBe(200)
      const contact = await contactResponse.json()
      expect(contact).toHaveProperty('id')
      expect(contact.status).toBe('RECEIVED')
    })
  })
})
