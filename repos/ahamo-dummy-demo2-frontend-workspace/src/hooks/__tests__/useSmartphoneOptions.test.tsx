import { renderHook, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSmartphoneOptions } from '../useSmartphoneOptions'

import { SmartphoneApiService } from '@/services/api'

jest.mock('@/services/api', () => ({
  SmartphoneApiService: {
    getSmartphoneOptions: jest.fn(),
  },
}))

const mockOptions = {
  dataPlans: [
    { id: 'plan1', title: '20GB', subtitle: 'データ通信量20GB', price: '2970' },
    { id: 'plan2', title: '100GB', subtitle: 'データ通信量100GB', price: '4950' },
  ],
  voiceOptions: [
    { id: 'voice1', title: '5分無料通話', description: '5分以内の通話が無料', price: '0' },
    { id: 'voice2', title: 'かけ放題', description: '24時間いつでもかけ放題', price: '1100' },
  ],
  overseaCallingOptions: [
    { id: 'oversea1', title: 'なし', description: '国際通話オプションなし', price: '0' },
    {
      id: 'oversea2',
      title: '国際通話オプション',
      description: '海外への通話が可能',
      price: '980',
    },
  ],
}

/**
 * useSmartphoneOptionsフックのテストスイート
 * @description スマートフォンオプション取得フックの各種動作を検証
 */
describe('useSmartphoneOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * スマートフォンオプションの正常取得テスト
   * @description APIから正常にオプションデータを取得し、適切な状態管理が行われることを確認
   */
  it('should fetch smartphone options successfully', async () => {
    const mockResponse = {
      data: mockOptions,
      status: 'success' as const,
    }

    ;(SmartphoneApiService.getSmartphoneOptions as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSmartphoneOptions('1'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.options).toEqual(mockOptions)
    expect(result.current.error).toBe(null)
  })

  /**
   * APIエラーハンドリングテスト
   * @description APIからエラーレスポンスが返された場合の適切なエラー処理を確認
   */
  it('should handle API errors', async () => {
    const mockResponse = {
      data: null,
      status: 'error' as const,
      message: 'Options not found',
    }

    ;(SmartphoneApiService.getSmartphoneOptions as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSmartphoneOptions('999'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.options).toBe(null)
    expect(result.current.error).toBe('Options not found')
  })

  /**
   * ネットワークエラーハンドリングテスト
   * @description ネットワーク接続エラー時の適切なエラーメッセージ表示を確認
   */
  it('should handle network errors', async () => {
    ;(SmartphoneApiService.getSmartphoneOptions as jest.Mock).mockRejectedValue(
      new Error('Network error')
    )

    const { result } = renderHook(() => useSmartphoneOptions('1'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.options).toBe(null)
    expect(result.current.error).toBe('オプション情報の取得に失敗しました')
  })

  /**
   * 空のdeviceIdでの非実行テスト
   * @description deviceIdが空文字の場合にAPI呼び出しが実行されないことを確認
   */
  it('should not fetch when deviceId is empty', async () => {
    ;(SmartphoneApiService.getSmartphoneOptions as jest.Mock).mockResolvedValue({
      data: mockOptions,
      status: 'success' as const,
    })

    const { result } = renderHook(() => useSmartphoneOptions(''))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.options).toBe(null)
    expect(result.current.error).toBe(null)
    expect(SmartphoneApiService.getSmartphoneOptions).not.toHaveBeenCalled()
  })

  /**
   * deviceId変更時の再取得テスト
   * @description deviceIdが変更された際に新しいオプションデータを再取得することを確認
   */
  it('should refetch when deviceId changes', async () => {
    const mockResponse1 = {
      data: mockOptions,
      status: 'success' as const,
    }

    const mockResponse2 = {
      data: {
        ...mockOptions,
        dataPlans: [{ id: 'plan3', title: '50GB', subtitle: 'データ通信量50GB', price: '3500' }],
      },
      status: 'success' as const,
    }

    ;(SmartphoneApiService.getSmartphoneOptions as jest.Mock)
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const { result, rerender } = renderHook(({ deviceId }) => useSmartphoneOptions(deviceId), {
      initialProps: { deviceId: '1' },
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.options).toEqual(mockOptions)

    rerender({ deviceId: '2' })

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.options).toEqual(mockResponse2.data)
    expect(SmartphoneApiService.getSmartphoneOptions).toHaveBeenCalledTimes(2)
    expect(SmartphoneApiService.getSmartphoneOptions).toHaveBeenCalledWith('1')
    expect(SmartphoneApiService.getSmartphoneOptions).toHaveBeenCalledWith('2')
  })
})
