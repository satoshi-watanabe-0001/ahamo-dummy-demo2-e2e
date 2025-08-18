import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { useRouter, useParams } from 'next/navigation'
import SmartphoneSelectionPage from '@/app/smartphones/[brand]/page'
import { SmartphoneApiService } from '@/services/api'
import { mockSmartphones } from '@/lib/mockData'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}))

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

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}

/**
 * スマートフォンページの統合テストスイート
 * @description スマートフォン選択ページの各ブランド（iPhone、Android）での表示、API連携、ナビゲーション機能を検証
 */
describe('Smartphone Pages Integration Tests', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    jest.clearAllMocks()

    const iPhones = mockSmartphones.filter(phone => phone.brand === 'Apple')
    const androidPhones = mockSmartphones.filter(phone => phone.brand !== 'Apple')

    mockSmartphoneApiService.getSmartphones.mockImplementation((page, limit, brand) => {
      if (brand === 'iPhone') {
        return Promise.resolve(
          createMockApiResponse({
            smartphones: iPhones,
            total: iPhones.length,
            page: page || 1,
            limit: limit || 10,
          })
        )
      } else if (brand === 'Android') {
        return Promise.resolve(
          createMockApiResponse({
            smartphones: androidPhones,
            total: androidPhones.length,
            page: page || 1,
            limit: limit || 10,
          })
        )
      }
      return Promise.resolve(
        createMockApiResponse({
          smartphones: mockSmartphones,
          total: mockSmartphones.length,
          page: page || 1,
          limit: limit || 10,
        })
      )
    })
  })

  /**
   * iPhone選択ページのテストスイート
   * @description iPhoneブランドでのページ表示、データ取得、エラーハンドリングを検証
   */
  describe('iPhone Selection Page', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({ brand: 'iphone' })
    })

    /**
     * iPhone選択ページが正常にデータと共に表示されることを検証
     * @description ローディング状態からデータ表示への遷移と、iPhone製品の正しい表示を確認
     */
    it('should render iPhone selection page with data', async () => {
      render(<SmartphoneSelectionPage />)

      expect(screen.getByText('iPhoneを読み込み中...')).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText('iPhoneの選択')).toBeInTheDocument()
      })

      expect(screen.getByText('iPhone 16e')).toBeInTheDocument()
      expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument()
    })

    it('should handle API errors gracefully', async () => {
      const errorResponse = createMockApiResponse(
        { smartphones: [], total: 0, page: 1, limit: 10 },
        'error',
        'Network error'
      )
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(errorResponse)

      render(<SmartphoneSelectionPage />)

      await waitFor(() => {
        expect(screen.getByText(/エラーが発生しました.*Network error/)).toBeInTheDocument()
      })
    })

    /**
     * ソート機能の表示を検証
     * @description ページ読み込み後にソートオプション（おすすめ順）が正しく表示されることを確認
     */
    it('should display sorting options', async () => {
      render(<SmartphoneSelectionPage />)

      await waitFor(() => {
        expect(screen.getByText('iPhoneの選択')).toBeInTheDocument()
      })

      expect(screen.getByDisplayValue('おすすめ順')).toBeInTheDocument()
    })
  })

  /**
   * Android選択ページのテストスイート
   * @description Androidブランドでのページ表示、データ取得、エラーハンドリングを検証
   */
  describe('Android Selection Page', () => {
    beforeEach(() => {
      ;(useParams as jest.Mock).mockReturnValue({ brand: 'android' })
    })

    /**
     * Android選択ページが正常にデータと共に表示されることを検証
     * @description ローディング状態からデータ表示への遷移と、Android製品の正しい表示を確認
     */
    it('should render Android selection page with data', async () => {
      render(<SmartphoneSelectionPage />)

      expect(screen.getByText('Androidを読み込み中...')).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText('Androidの選択')).toBeInTheDocument()
      })

      expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
      expect(screen.getByText('Xperia 1 VI')).toBeInTheDocument()
    })

    /**
     * Android選択ページでのAPIエラーハンドリングを検証
     * @description ネットワークエラー発生時にエラーメッセージが適切に表示されることを確認
     */
    it('should handle API errors gracefully', async () => {
      const errorResponse = createMockApiResponse(
        { smartphones: [], total: 0, page: 1, limit: 10 },
        'error',
        'Network error'
      )
      mockSmartphoneApiService.getSmartphones.mockResolvedValue(errorResponse)

      render(<SmartphoneSelectionPage />)

      await waitFor(() => {
        expect(screen.getByText(/エラーが発生しました.*Network error/)).toBeInTheDocument()
      })
    })
  })

  /**
   * ページナビゲーション機能のテストスイート
   * @description 戻るボタンやブランド間リンクなどのナビゲーション機能を検証
   */
  describe('Page Navigation', () => {
    /**
     * iPhoneページでの戻るナビゲーション機能を検証
     * @description 戻るボタンクリック時にルーターのback関数が正しく呼び出されることを確認
     */
    it('should handle back navigation on iPhone page', async () => {
      ;(useParams as jest.Mock).mockReturnValue({ brand: 'iphone' })
      render(<SmartphoneSelectionPage />)

      await waitFor(() => {
        expect(screen.getByText('iPhoneの選択')).toBeInTheDocument()
      })

      const backButton = screen.getByText('戻る')
      backButton.click()

      expect(mockRouter.back).toHaveBeenCalledTimes(1)
    })

    /**
     * iPhoneページからAndroidページへのリンクナビゲーション機能を検証
     * @description Androidリンククリック時にルーターのpush関数が正しいパスで呼び出されることを確認
     */
    it('should handle Android link navigation on iPhone page', async () => {
      ;(useParams as jest.Mock).mockReturnValue({ brand: 'iphone' })
      render(<SmartphoneSelectionPage />)

      await waitFor(() => {
        expect(screen.getByText('iPhoneの選択')).toBeInTheDocument()
      })

      const androidLink = screen.getByText('Androidの製品の一覧を見る →')
      androidLink.click()

      expect(mockRouter.push).toHaveBeenCalledWith('/smartphones/android')
    })
  })
})
