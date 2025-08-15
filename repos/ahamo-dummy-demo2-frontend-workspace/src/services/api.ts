export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

import { SmartphoneProduct, SmartphoneOptions, LoginRequest, AuthResponse } from '@/types/index'
import { logApiRequest, logApiResponse, logError } from '@/lib/logger'
import { mockSmartphoneOptions } from '@/lib/mockData'

export interface SmartphoneApiResponse {
  smartphones: SmartphoneProduct[]
  total: number
  page: number
  limit: number
}

const mockApiResponse: SmartphoneApiResponse = {
  smartphones: [
    {
      id: '1',
      name: 'iPhone 16e',
      brand: 'Apple',
      price: '43,670円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      features: ['いつでもカエドキプログラム適用時', 'お客様負担額'],
      link: '/smartphones/iphone16e',
      colorOptions: [
        { name: 'ホワイト', colorCode: '#FFFFFF' },
        { name: 'ブラック', colorCode: '#000000' },
      ],
      has5G: true,
      saleLabel: 'SALE!',
      description: 'いつでもカエドキプログラム適用時 お客様負担額',
      specifications: ['A16 Bionicチップ', '48MPカメラシステム', 'Face ID'],
    },
    {
      id: '2',
      name: 'iPhone 16 Pro',
      brand: 'Apple',
      price: '96,470円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      features: ['いつでもカエドキプログラム（プラス対象商品）適用時', 'お客様負担額'],
      link: '/smartphones/iphone16pro',
      colorOptions: [
        { name: 'ゴールド', colorCode: '#FFD700' },
        { name: 'スペースグレイ', colorCode: '#8E8E93' },
        { name: 'シルバー', colorCode: '#C0C0C0' },
        { name: 'ブラック', colorCode: '#000000' },
      ],
      has5G: true,
      description: 'いつでもカエドキプログラム（プラス対象商品）適用時 お客様負担額',
      specifications: ['A17 Proチップ', 'Pro 48MPカメラシステム', 'ProMotionディスプレイ'],
    },
    {
      id: '3',
      name: 'iPhone 16 Pro Max',
      brand: 'Apple',
      price: '120,780円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      features: ['いつでもカエドキプログラム（プラス対象商品）適用時', 'お客様負担額'],
      link: '/smartphones/iphone16promax',
      colorOptions: [
        { name: 'ゴールド', colorCode: '#FFD700' },
        { name: 'スペースグレイ', colorCode: '#8E8E93' },
        { name: 'シルバー', colorCode: '#C0C0C0' },
        { name: 'ブラック', colorCode: '#000000' },
      ],
      has5G: true,
      description: 'いつでもカエドキプログラム（プラス対象商品）適用時 お客様負担額',
      specifications: ['A17 Proチップ', 'Pro 48MPカメラシステム', '6.7インチディスプレイ'],
    },
    {
      id: '4',
      name: 'iPhone 14',
      brand: 'Apple',
      price: '98,340円',
      imageUrl:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      features: ['A15 Bionicチップ', 'デュアルカメラシステム'],
      link: '/smartphones/iphone14',
      colorOptions: [{ name: 'ブラック', colorCode: '#000000' }],
      has5G: true,
      specifications: ['A15 Bionicチップ', '12MPデュアルカメラ', 'Face ID'],
    },
    {
      id: '5',
      name: 'iPhone SE（第3世代）',
      brand: 'Apple',
      price: '42,680円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      features: ['いつでもカエドキプログラム適用時', 'お客様負担額'],
      link: '/smartphones/iphonese3',
      colorOptions: [{ name: 'ブラック', colorCode: '#000000' }],
      has5G: true,
      description: 'いつでもカエドキプログラム適用時 お客様負担額',
      specifications: ['A15 Bionicチップ', 'Touch ID', 'ホームボタン'],
    },
    {
      id: '6',
      name: 'Galaxy S24',
      brand: 'Samsung',
      price: '124,800円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center',
      features: ['AI機能搭載', '200MPカメラ', '高速充電'],
      link: '/smartphones/galaxys24',
      colorOptions: [
        { name: 'ファントムブラック', colorCode: '#000000' },
        { name: 'ファントムシルバー', colorCode: '#C0C0C0' },
      ],
      has5G: true,
      specifications: ['Snapdragon 8 Gen 3', '200MPカメラ', '120Hz ディスプレイ'],
    },
    {
      id: '7',
      name: 'Xperia 1 VI',
      brand: 'Sony',
      price: '139,800円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
      features: ['4K HDRディスプレイ', 'プロカメラ機能', '防水・防塵'],
      link: '/smartphones/xperia1vi',
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
      ],
      has5G: true,
      specifications: ['Snapdragon 8 Gen 3', '4K 120Hz ディスプレイ', 'Zeiss レンズ'],
    },
    {
      id: '8',
      name: 'Pixel 8 Pro',
      brand: 'Google',
      price: '119,800円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=center',
      features: ['Tensor G3チップ', 'AI写真編集', '長時間バッテリー'],
      link: '/smartphones/pixel8pro',
      colorOptions: [
        { name: 'オブシディアン', colorCode: '#000000' },
        { name: 'ポーセリン', colorCode: '#F5F5DC' },
      ],
      has5G: true,
      specifications: ['Google Tensor G3', 'AI写真編集', '50MPカメラ'],
    },
    {
      id: '9',
      name: 'AQUOS sense8',
      brand: 'Sharp',
      price: '59,800円〜',
      imageUrl:
        'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop&crop=center',
      features: ['省エネIGZO', '大容量バッテリー', 'おサイフケータイ'],
      link: '/smartphones/aquossense8',
      colorOptions: [
        { name: 'ライトカッパー', colorCode: '#CD7F32' },
        { name: 'ペールグリーン', colorCode: '#98FB98' },
      ],
      has5G: true,
      specifications: ['Snapdragon 6 Gen 1', 'IGZO OLED', '5000mAh バッテリー'],
    },
  ],
  total: 9,
  page: 1,
  limit: 10,
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class SmartphoneApiService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api'

  static async login(loginRequest: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const startTime = Date.now()
    const url = `${this.baseUrl}/auth/login`

    logApiRequest('POST', url, { email: loginRequest.email })

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      })

      const duration = Date.now() - startTime

      if (!response.ok) {
        logApiResponse('POST', url, response.status, duration)
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      logApiResponse('POST', url, response.status, duration)

      return {
        data,
        status: 'success',
      }
    } catch (error) {
      const duration = Date.now() - startTime
      logError('Login failed', error, { email: loginRequest.email, duration })
      logApiResponse('POST', url, 500, duration)

      return {
        data: { accessToken: '', refreshToken: '', tokenType: '', expiresIn: 0 },
        status: 'error',
        message: error instanceof Error ? error.message : 'ログインに失敗しました',
      }
    }
  }

  static async getSmartphones(
    page: number = 1,
    limit: number = 10,
    brand?: string
  ): Promise<ApiResponse<SmartphoneApiResponse>> {
    const startTime = Date.now()
    const url = `${this.baseUrl}/smartphones`

    logApiRequest('GET', url, { page, limit, brand })

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const duration = Date.now() - startTime

      if (!response.ok) {
        logApiResponse('GET', url, response.status, duration)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        logError('API request failed', jsonError, { url, status: response.status, duration })
        throw new Error('Invalid JSON response')
      }

      if (!data || !Array.isArray(data.smartphones)) {
        let filteredSmartphones = mockApiResponse.smartphones
        if (brand) {
          if (brand === 'iPhone') {
            filteredSmartphones = mockApiResponse.smartphones.filter(s => s.brand === 'Apple')
          } else if (brand === 'Android') {
            filteredSmartphones = mockApiResponse.smartphones.filter(s => s.brand !== 'Apple')
          }
        }

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedSmartphones = filteredSmartphones.slice(startIndex, endIndex)

        const mockResponse = {
          data: {
            smartphones: paginatedSmartphones,
            total: filteredSmartphones.length,
            page,
            limit,
          },
          status: 'success' as const,
        }

        logApiResponse('GET', url, 200, duration, {
          resultCount: paginatedSmartphones.length,
          totalCount: filteredSmartphones.length,
        })

        return mockResponse
      }

      logApiResponse('GET', url, response.status, duration, {
        resultCount: data.smartphones.length,
        totalCount: data.total || data.smartphones.length,
      })

      return {
        data,
        status: 'success',
      }
    } catch (error) {
      const duration = Date.now() - startTime
      logError('API request failed', error, { page, limit, brand, duration })
      logApiResponse('GET', url, 500, duration)

      return {
        data: { smartphones: [], total: 0, page: 1, limit: 10 },
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  static async getSmartphoneById(id: string): Promise<ApiResponse<SmartphoneProduct | null>> {
    const startTime = Date.now()
    const url = `${this.baseUrl}/smartphones/${id}`

    logApiRequest('GET', url, { id })

    try {
      await delay(300)

      const smartphone = mockApiResponse.smartphones.find(s => s.id === id)

      if (!smartphone) {
        const duration = Date.now() - startTime
        logApiResponse('GET', url, 404, duration)
        logError('Smartphone not found', new Error(`No smartphone found with id: ${id}`), { id })

        return {
          data: null,
          status: 'error',
          message: 'Smartphone not found',
        }
      }

      const duration = Date.now() - startTime
      logApiResponse('GET', url, 200, duration, {
        smartphoneId: smartphone.id,
        smartphoneName: smartphone.name,
      })

      return {
        data: smartphone,
        status: 'success',
      }
    } catch (error) {
      const duration = Date.now() - startTime
      logError('Failed to fetch smartphone by ID', error, { id, duration })
      logApiResponse('GET', url, 500, duration)

      return {
        data: null,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  static async getSmartphoneOptions(deviceId: string): Promise<ApiResponse<SmartphoneOptions>> {
    const startTime = Date.now()
    const url = `${this.baseUrl}/smartphones/${deviceId}/options`

    logApiRequest('GET', url, { deviceId })

    try {
      await delay(300)

      const duration = Date.now() - startTime
      logApiResponse('GET', url, 200, duration, {
        deviceId,
        optionsCount:
          mockSmartphoneOptions.dataPlans.length +
          mockSmartphoneOptions.voiceOptions.length +
          mockSmartphoneOptions.overseaCallingOptions.length,
      })

      return {
        data: mockSmartphoneOptions,
        status: 'success',
      }
    } catch (error) {
      const duration = Date.now() - startTime
      logError('Failed to fetch smartphone options', error, { deviceId, duration })
      logApiResponse('GET', url, 500, duration)

      return {
        data: { dataPlans: [], voiceOptions: [], overseaCallingOptions: [] },
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }
}
