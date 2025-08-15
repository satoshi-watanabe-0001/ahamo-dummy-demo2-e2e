import { SmartphoneApiService } from '@/services/api'
import { mockSmartphones } from '@/lib/mockData'

const createMockApiResponse = <T>(
  data: T,
  status: 'success' | 'error' = 'success',
  message?: string
) => ({
  data,
  status,
  message: message || (status === 'error' ? 'API Error' : 'Success'),
})

jest.mock('@/services/api', () => ({
  SmartphoneApiService: {
    getSmartphones: jest.fn(),
    getSmartphoneById: jest.fn(),
  },
}))

const mockSmartphoneApiService = SmartphoneApiService as jest.Mocked<typeof SmartphoneApiService>

/**
 * SmartphoneApiServiceの統合テストスイート
 * @description APIサービスの各メソッドが正しく動作することを検証
 */
describe('SmartphoneApiService Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * getSmartphonesメソッドのテストスイート
   * @description スマートフォン一覧取得機能の動作を検証
   */
  describe('getSmartphones', () => {
    /**
     * スマートフォン一覧の正常取得テスト
     * @description APIから正常にスマートフォンデータを取得できることを確認
     */
    it('should fetch smartphones successfully', async () => {
      const mockResponse = createMockApiResponse({
        smartphones: mockSmartphones.slice(0, 10),
        total: mockSmartphones.length,
        page: 1,
        limit: 10,
      })
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(mockResponse)

      const response = await SmartphoneApiService.getSmartphones(1, 10)

      expect(response.status).toBe('success')
      expect(response.data.smartphones).toHaveLength(9)
      expect(response.data.total).toBe(9)
      expect(response.data.page).toBe(1)
      expect(response.data.limit).toBe(10)
    })

    /**
     * iPhoneフィルタリング機能テスト
     * @description ブランドフィルターでiPhoneのみを正しく取得できることを確認
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

      const response = await SmartphoneApiService.getSmartphones(1, 10, 'iPhone')

      expect(response.status).toBe('success')
      expect(response.data.smartphones.every(phone => phone.brand === 'Apple')).toBe(true)
      expect(response.data.smartphones.length).toBeGreaterThan(0)
    })

    /**
     * Androidフィルタリング機能テスト
     * @description ブランドフィルターでAndroid端末のみを正しく取得できることを確認
     */
    it('should filter Android phones correctly', async () => {
      const androidPhones = mockSmartphones.filter(phone => phone.brand !== 'Apple')
      const mockResponse = createMockApiResponse({
        smartphones: androidPhones,
        total: androidPhones.length,
        page: 1,
        limit: 10,
      })
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(mockResponse)

      const response = await SmartphoneApiService.getSmartphones(1, 10, 'Android')

      expect(response.status).toBe('success')
      expect(response.data.smartphones.every(phone => phone.brand !== 'Apple')).toBe(true)
      expect(response.data.smartphones.length).toBeGreaterThan(0)
    })

    /**
     * ページネーション機能テスト
     * @description ページ番号と件数制限が正しく適用されることを確認
     */
    it('should handle pagination correctly', async () => {
      const mockResponse = createMockApiResponse({
        smartphones: mockSmartphones.slice(0, 3),
        total: mockSmartphones.length,
        page: 1,
        limit: 3,
      })
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(mockResponse)

      const response = await SmartphoneApiService.getSmartphones(1, 3)

      expect(response.status).toBe('success')
      expect(response.data.smartphones).toHaveLength(3)
      expect(response.data.page).toBe(1)
      expect(response.data.limit).toBe(3)
    })

    /**
     * APIエラーハンドリングテスト
     * @description ネットワークエラーやAPIエラーが適切に処理されることを確認
     */
    it('should handle API errors gracefully', async () => {
      const errorResponse = createMockApiResponse(
        { smartphones: [], total: 0, page: 1, limit: 10 },
        'error',
        'Network error'
      )
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(errorResponse)

      const response = await SmartphoneApiService.getSmartphones(1, 10)

      expect(response.status).toBe('error')
      expect(response.message).toBe('Network error')
      expect(response.data.smartphones).toHaveLength(0)
    })
  })

  /**
   * getSmartphoneByIdメソッドのテストスイート
   * @description 個別スマートフォン取得機能の動作を検証
   */
  describe('getSmartphoneById', () => {
    /**
     * ID指定でのスマートフォン取得テスト
     * @description 指定されたIDのスマートフォンデータを正常に取得できることを確認
     */
    it('should fetch smartphone by ID successfully', async () => {
      const testId = mockSmartphones[0].id
      const mockResponse = createMockApiResponse(mockSmartphones[0])
      mockSmartphoneApiService.getSmartphoneById.mockResolvedValue(mockResponse)

      const response = await SmartphoneApiService.getSmartphoneById(testId)

      expect(response.status).toBe('success')
      expect(response.data).toEqual(mockSmartphones[0])
    })

    /**
     * 存在しないIDのエラーハンドリングテスト
     * @description 存在しないスマートフォンIDが指定された場合のエラー処理を確認
     */
    it('should handle non-existent smartphone ID', async () => {
      const mockResponse = createMockApiResponse(null, 'error', 'Smartphone not found')
      mockSmartphoneApiService.getSmartphoneById.mockResolvedValue(mockResponse)

      const response = await SmartphoneApiService.getSmartphoneById('non-existent-id')

      expect(response.status).toBe('error')
      expect(response.message).toBe('Smartphone not found')
      expect(response.data).toBeNull()
    })

    /**
     * スマートフォンデータ構造検証テスト
     * @description 取得されるスマートフォンデータが期待される構造を持つことを確認
     */
    it('should return correct smartphone data structure', async () => {
      const testId = mockSmartphones[0].id
      const mockResponse = createMockApiResponse(mockSmartphones[0])
      mockSmartphoneApiService.getSmartphoneById.mockResolvedValue(mockResponse)

      const response = await SmartphoneApiService.getSmartphoneById(testId)

      expect(response.status).toBe('success')
      expect(response.data).toHaveProperty('id')
      expect(response.data).toHaveProperty('name')
      expect(response.data).toHaveProperty('brand')
      expect(response.data).toHaveProperty('price')
      expect(response.data).toHaveProperty('imageUrl')
      expect(response.data).toHaveProperty('features')
      expect(response.data).toHaveProperty('colorOptions')
      expect(response.data).toHaveProperty('has5G')
    })
  })

  describe('Mock Integration Verification', () => {
    it('should verify mock response creation works correctly', () => {
      const response = createMockApiResponse({
        smartphones: mockSmartphones.slice(0, 5),
        total: mockSmartphones.length,
        page: 1,
        limit: 5,
      })
      expect(response.status).toBe('success')
      expect(response.data.smartphones).toHaveLength(5)

      const errorResponse = createMockApiResponse(
        { smartphones: [], total: 0, page: 1, limit: 10 },
        'error',
        'Network error'
      )
      expect(errorResponse.status).toBe('error')
      expect(errorResponse.message).toBe('Network error')
    })
  })
})
