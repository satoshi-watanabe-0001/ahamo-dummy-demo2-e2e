import { renderHook, waitFor } from '@testing-library/react'
import { useSmartphones, useSmartphone } from '@/hooks/useSmartphones'
import { SmartphoneApiService } from '@/services/api'
import { mockSmartphones } from '@/lib/mockData'

jest.mock('@/services/api', () => ({
  SmartphoneApiService: {
    getSmartphones: jest.fn(),
    getSmartphoneById: jest.fn(),
  },
}))

const mockSmartphoneApiService = SmartphoneApiService as jest.Mocked<typeof SmartphoneApiService>

function createMockApiResponse<T>(
  data: T,
  status: 'success' | 'error' = 'success',
  message?: string
) {
  return {
    data,
    status,
    message: message || (status === 'error' ? 'API Error' : 'Success'),
  }
}

/**
 * useSmartphonesフックの統合テストスイート
 * @description APIサービスとの連携を含むuseSmartphonesフックの動作を検証
 */
describe('useSmartphones Hook Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * useSmartphonesフックのテストグループ
   * @description スマートフォン一覧取得機能のテストケース
   */
  describe('useSmartphones', () => {
    /**
     * スマートフォンデータの正常取得テスト
     * @description APIから正常にスマートフォンデータを取得し、適切な状態管理ができることを確認
     */
    it('should fetch smartphones successfully', async () => {
      const mockResponse = createMockApiResponse({
        smartphones: mockSmartphones,
        total: mockSmartphones.length,
        page: 1,
        limit: 10,
      })
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useSmartphones())

      expect(result.current.loading).toBe(true)
      expect(result.current.smartphones).toEqual([])

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.smartphones).toEqual(mockSmartphones)
      expect(result.current.error).toBeNull()
      expect(result.current.total).toBe(mockSmartphones.length)
    })

    /**
     * iPhoneフィルタリング機能テスト
     * @description ブランド指定によるiPhoneの絞り込み機能が正常に動作することを確認
     */
    it('should filter iPhones correctly', async () => {
      const iPhones = mockSmartphones.filter(phone => phone.brand === 'Apple')
      const mockResponse = createMockApiResponse({
        smartphones: iPhones,
        total: iPhones.length,
        page: 1,
        limit: 10,
      })
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useSmartphones(1, 10, 'iPhone'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.smartphones.every(phone => phone.brand === 'Apple')).toBe(true)
      expect(result.current.smartphones.length).toBeGreaterThan(0)
    })

    /**
     * APIエラーハンドリングテスト
     * @description API呼び出し時のエラーが適切に処理され、エラー状態が正しく管理されることを確認
     */
    it('should handle API errors gracefully', async () => {
      const errorResponse = createMockApiResponse(
        { smartphones: [], total: 0, page: 1, limit: 10 },
        'error',
        'Network error'
      )
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(errorResponse)

      const { result } = renderHook(() => useSmartphones())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.smartphones).toEqual([])
      expect(result.current.error).toBe('Network error')
      expect(result.current.total).toBe(0)
    })

    /**
     * ページネーション機能テスト
     * @description ページ番号と表示件数の指定によるページネーション機能が正常に動作することを確認
     */
    it('should handle pagination correctly', async () => {
      const mockResponse = createMockApiResponse({
        smartphones: mockSmartphones.slice(0, 3),
        total: mockSmartphones.length,
        page: 1,
        limit: 3,
      })
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useSmartphones(1, 3))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.smartphones).toHaveLength(3)
      expect(result.current.total).toBe(mockSmartphones.length)
    })
  })

  /**
   * useSmartphoneフックのテストグループ
   * @description 単一スマートフォン取得機能のテストケース
   */
  describe('useSmartphone', () => {
    /**
     * ID指定によるスマートフォン取得テスト
     * @description 指定されたIDのスマートフォンデータを正常に取得できることを確認
     */
    it('should fetch smartphone by ID successfully', async () => {
      const testSmartphone = mockSmartphones[0]
      const mockResponse = createMockApiResponse(testSmartphone)
      mockSmartphoneApiService.getSmartphoneById.mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useSmartphone(testSmartphone.id))

      expect(result.current.loading).toBe(true)
      expect(result.current.smartphone).toBeNull()

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.smartphone).toEqual(testSmartphone)
      expect(result.current.error).toBeNull()
    })

    /**
     * 存在しないIDのエラーハンドリングテスト
     * @description 存在しないスマートフォンIDが指定された場合のエラー処理が適切に行われることを確認
     */
    it('should handle non-existent smartphone ID', async () => {
      const mockResponse = createMockApiResponse(null, 'error', 'Smartphone not found')
      mockSmartphoneApiService.getSmartphoneById.mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useSmartphone('non-existent-id'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.smartphone).toBeNull()
      expect(result.current.error).toBe('Smartphone not found')
    })

    /**
     * 空IDでの呼び出し制御テスト
     * @description IDが空文字列の場合にAPI呼び出しが実行されないことを確認
     */
    it('should not fetch when ID is not provided', () => {
      const { result } = renderHook(() => useSmartphone(''))

      expect(result.current.loading).toBe(true)
      expect(result.current.smartphone).toBeNull()
      expect(result.current.error).toBeNull()
      expect(mockSmartphoneApiService.getSmartphoneById).not.toHaveBeenCalled()
    })

    it('should return correct smartphone data structure', async () => {
      const testSmartphone = mockSmartphones[0]
      const mockResponse = createMockApiResponse(testSmartphone)
      mockSmartphoneApiService.getSmartphoneById.mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useSmartphone(testSmartphone.id))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.smartphone).toHaveProperty('id')
      expect(result.current.smartphone).toHaveProperty('name')
      expect(result.current.smartphone).toHaveProperty('brand')
      expect(result.current.smartphone).toHaveProperty('price')
      expect(result.current.smartphone).toHaveProperty('imageUrl')
      expect(result.current.smartphone).toHaveProperty('features')
      expect(result.current.smartphone).toHaveProperty('colorOptions')
      expect(result.current.smartphone).toHaveProperty('has5G')
    })
  })
})
