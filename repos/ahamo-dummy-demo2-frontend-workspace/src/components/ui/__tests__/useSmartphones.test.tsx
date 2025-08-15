import { renderHook, waitFor } from '@testing-library/react'
import { useSmartphones, useSmartphone } from '@/hooks/useSmartphones'

jest.mock('@/services/api', () => ({
  SmartphoneApiService: {
    getSmartphones: jest.fn(),
    getSmartphoneById: jest.fn(),
  },
}))

import { SmartphoneApiService } from '@/services/api'

const mockSmartphones = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: '159,800円〜',
    imageUrl: 'https://example.com/iphone.jpg',
    features: ['A17 Proチップ', '48MPカメラ'],
    link: '/smartphones/iphone15pro',
  },
]

/**
 * useSmartphonesフックのテストスイート
 * @description スマートフォン一覧取得フックの動作を検証
 */
describe('useSmartphones', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * スマートフォン一覧の正常取得テスト
   * @description APIからスマートフォンデータを正常に取得し、状態が適切に更新されることを確認
   */
  it('should fetch smartphones successfully', async () => {
    const mockResponse = {
      data: {
        smartphones: mockSmartphones,
        total: 1,
        page: 1,
        limit: 10,
      },
      status: 'success' as const,
    }

    ;(SmartphoneApiService.getSmartphones as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSmartphones())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.smartphones).toEqual(mockSmartphones)
    expect(result.current.error).toBe(null)
    expect(result.current.total).toBe(1)
  })

  /**
   * APIエラーハンドリングテスト
   * @description API呼び出しでエラーが発生した場合の適切なエラー処理を確認
   */
  it('should handle API errors', async () => {
    const mockResponse = {
      data: { smartphones: [], total: 0, page: 1, limit: 10 },
      status: 'error' as const,
      message: 'API Error',
    }

    ;(SmartphoneApiService.getSmartphones as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSmartphones())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.smartphones).toEqual([])
    expect(result.current.error).toBe('API Error')
  })
})

/**
 * useSmartphoneフックのテストスイート
 * @description 単一スマートフォン取得フックの動作を検証
 */
describe('useSmartphone', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * 単一スマートフォンの正常取得テスト
   * @description 指定されたIDのスマートフォンデータを正常に取得し、状態が適切に更新されることを確認
   */
  it('should fetch single smartphone successfully', async () => {
    const mockResponse = {
      data: mockSmartphones[0],
      status: 'success' as const,
    }

    ;(SmartphoneApiService.getSmartphoneById as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSmartphone('1'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.smartphone).toEqual(mockSmartphones[0])
    expect(result.current.error).toBe(null)
  })

  /**
   * スマートフォン未発見エラーハンドリングテスト
   * @description 存在しないIDを指定した場合の適切なエラー処理を確認
   */
  it('should handle smartphone not found', async () => {
    const mockResponse = {
      data: null,
      status: 'error' as const,
      message: 'Smartphone not found',
    }

    ;(SmartphoneApiService.getSmartphoneById as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSmartphone('999'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.smartphone).toBe(null)
    expect(result.current.error).toBe('Smartphone not found')
  })
})
