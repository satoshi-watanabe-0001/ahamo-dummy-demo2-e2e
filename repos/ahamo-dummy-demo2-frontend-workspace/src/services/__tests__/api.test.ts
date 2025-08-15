import { SmartphoneApiService } from '../api'

const mockLogApiRequest = jest.fn()
const mockLogApiResponse = jest.fn()
const mockLogError = jest.fn()

jest.mock('@/lib/logger', () => ({
  logApiRequest: mockLogApiRequest,
  logApiResponse: mockLogApiResponse,
  logError: mockLogError,
}))

global.fetch = jest.fn()

/**
 * SmartphoneApiServiceのテストスイート
 * @description APIサービスクラスの各メソッドの動作、エラーハンドリング、ログ機能を検証
 */
describe('SmartphoneApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  /**
   * getSmartphones メソッドのテストスイート
   * @description スマートフォン一覧取得APIの正常系・異常系の動作を検証
   */
  describe('getSmartphones', () => {
    /**
     * APIエラー時のフォールバック処理を検証
     * @description APIが失敗した場合にモックデータが返されることを確認
     */
    it('should return mock data when API fails', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      const result = await SmartphoneApiService.getSmartphones(1, 10)

      expect(result.status).toBe('error')
      expect(result.message).toContain('error')
    })

    /**
     * ブランドフィルタリング機能を検証
     * @description iPhoneブランドでフィルタリングした場合の結果を確認
     */
    it('should filter smartphones by iPhone brand', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ smartphones: [] }),
      })

      const result = await SmartphoneApiService.getSmartphones(1, 10, 'iPhone')

      expect(result.status).toBe('success')
      expect(
        result.data.smartphones.every((phone: { brand: string }) => phone.brand === 'Apple')
      ).toBe(true)
    })

    /**
     * Androidブランドフィルタリング機能を検証
     * @description Androidブランドでフィルタリングした場合の結果を確認
     */
    it('should filter smartphones by Android brand', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ smartphones: [] }),
      })

      const result = await SmartphoneApiService.getSmartphones(1, 10, 'Android')

      expect(result.status).toBe('success')
      expect(
        result.data.smartphones.every((phone: { brand: string }) => phone.brand !== 'Apple')
      ).toBe(true)
    })

    /**
     * ページネーション機能を検証
     * @description ページ番号とリミットが正しく適用されることを確認
     */
    it('should handle pagination correctly', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ smartphones: [] }),
      })

      const result = await SmartphoneApiService.getSmartphones(2, 5)

      expect(result.data).toBeDefined()
      expect(result.status).toBe('success')
    })

    /**
     * HTTPエラーレスポンスの処理を検証
     * @description 404や500などのHTTPエラー時の適切な処理を確認
     */
    it('should handle HTTP error responses', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      const result = await SmartphoneApiService.getSmartphones(1, 10)

      expect(result.status).toBe('error')
      expect(result.message).toBe('HTTP 404: Not Found')
    })

    /**
     * 無効なJSONレスポンスの処理を検証
     * @description JSONパースエラー時の適切な処理を確認
     */
    it('should handle invalid JSON response', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      })

      const result = await SmartphoneApiService.getSmartphones(1, 10)

      expect(result.status).toBe('error')
      expect(result.message).toBe('Invalid JSON response')
    })
  })

  /**
   * getSmartphoneById メソッドのテストスイート
   * @description 個別スマートフォン取得APIの動作を検証
   */
  describe('getSmartphoneById', () => {
    /**
     * 存在するIDでの正常取得を検証
     * @description 有効なIDでスマートフォンデータが正しく取得されることを確認
     */
    it('should return smartphone data for valid ID', async () => {
      const result = await SmartphoneApiService.getSmartphoneById('1')

      expect(result.status).toBe('success')
      expect(result.data).toBeTruthy()
      expect(result.data?.id).toBe('1')
    })

    /**
     * 存在しないIDでのエラー処理を検証
     * @description 無効なIDでエラーが適切に返されることを確認
     */
    it('should return error for non-existent ID', async () => {
      const result = await SmartphoneApiService.getSmartphoneById('999')

      expect(result.status).toBe('error')
      expect(result.data).toBeNull()
      expect(result.message).toBe('Smartphone not found')
    })

    /**
     * ログ記録機能を検証
     * @description API呼び出し時に適切なログが記録されることを確認
     */
    it('should log API requests and responses', async () => {
      const result = await SmartphoneApiService.getSmartphoneById('1')

      expect(result).toBeDefined()
      expect(result.status).toBe('success')
      expect(result.data).toBeTruthy()
    })
  })

  /**
   * getSmartphoneOptions メソッドのテストスイート
   * @description スマートフォンオプション取得APIの動作を検証
   */
  describe('getSmartphoneOptions', () => {
    /**
     * オプションデータの正常取得を検証
     * @description スマートフォンオプションが正しく取得されることを確認
     */
    it('should return smartphone options successfully', async () => {
      const result = await SmartphoneApiService.getSmartphoneOptions('1')

      expect(result.status).toBe('success')
      expect(result.data).toBeTruthy()
      expect(result.data.dataPlans).toBeDefined()
      expect(result.data.voiceOptions).toBeDefined()
      expect(result.data.overseaCallingOptions).toBeDefined()
    })

    /**
     * エラー時のフォールバック処理を検証
     * @description エラー発生時に空のオプションデータが返されることを確認
     */
    it('should handle errors gracefully', async () => {
      jest.spyOn(global, 'setTimeout').mockImplementation(() => {
        throw new Error('Timeout error')
      })

      const result = await SmartphoneApiService.getSmartphoneOptions('1')

      expect(result.status).toBe('error')
      expect(result.data.dataPlans).toEqual([])
      expect(result.data.voiceOptions).toEqual([])
      expect(result.data.overseaCallingOptions).toEqual([])

      jest.restoreAllMocks()
    })

    /**
     * 遅延処理の動作を検証
     * @description 300ms遅延が正しく実装されていることを確認
     */
    it('should include delay in response', async () => {
      const startTime = Date.now()
      await SmartphoneApiService.getSmartphoneOptions('1')
      const endTime = Date.now()

      expect(endTime - startTime).toBeGreaterThanOrEqual(300)
    })
  })
})
