import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { DeviceDetailPage } from '../DeviceDetailPage'
import { useSmartphone } from '../../hooks/useSmartphones'
import { mockSmartphones } from '../../lib/mockData'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../hooks/useSmartphones', () => ({
  useSmartphone: jest.fn(),
}))

const mockRouter = {
  back: jest.fn(),
  push: jest.fn(),
}

const mockSmartphone = mockSmartphones[0]

/**
 * DeviceDetailPageコンポーネントのテストスイート
 * @description デバイス詳細ページの表示、ナビゲーション、各セクションの動作を検証
 */
describe('DeviceDetailPage', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSmartphone as jest.Mock).mockReturnValue({
      smartphone: mockSmartphone,
      loading: false,
      error: null,
    })
    jest.clearAllMocks()
  })

  /**
   * スマートフォン情報が正しく表示されることを検証
   * @description デバイス名とブランド名が適切にレンダリングされることを確認
   */
  it('renders smartphone information correctly', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText(mockSmartphone.name)).toBeInTheDocument()
      expect(screen.getByText(mockSmartphone.brand)).toBeInTheDocument()
    })
  })

  /**
   * ローディング状態が正しく表示されることを検証
   * @description データ取得中にローディングスピナーが表示されることを確認
   */
  it('displays loading state', () => {
    ;(useSmartphone as jest.Mock).mockReturnValue({
      smartphone: null,
      loading: true,
      error: null,
    })

    render(<DeviceDetailPage deviceId="iphone16e" />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  /**
   * スマートフォンが見つからない場合のエラー状態表示を検証
   * @description エラーメッセージと戻るボタンが適切に表示されることを確認
   */
  it('displays error state when smartphone not found', () => {
    ;(useSmartphone as jest.Mock).mockReturnValue({
      smartphone: null,
      loading: false,
      error: 'デバイスが見つかりませんでした',
    })

    render(<DeviceDetailPage deviceId="invalid-id" />)

    expect(
      screen.getByText('エラーが発生しました: デバイスが見つかりませんでした')
    ).toBeInTheDocument()
    expect(screen.getByText('戻る')).toBeInTheDocument()
  })

  /**
   * 戻るボタンのクリック処理を検証
   * @description 戻るボタンクリック時にルーターのback関数が呼び出されることを確認
   */
  it('handles back button click', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      const backButton = screen.getByText('← 戻る')
      fireEvent.click(backButton)
      expect(mockRouter.back).toHaveBeenCalled()
    })
  })

  /**
   * 料金プランセクションの表示を検証
   * @description 料金プラン情報と価格が適切に表示されることを確認
   */
  it('renders payment options section', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText('料金プラン')).toBeInTheDocument()
      expect(screen.getByText('0円')).toBeInTheDocument()
      expect(screen.getByText('4,872円')).toBeInTheDocument()
    })
  })

  /**
   * カラーオプションが利用可能な場合のカラーセレクター表示を検証
   * @description カラー選択セクションと各カラーオプションが適切に表示されることを確認
   */
  it('renders color selector when colors available', async () => {
    const smartphoneWithColors = {
      ...mockSmartphone,
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
      ],
    }

    ;(useSmartphone as jest.Mock).mockReturnValue({
      smartphone: smartphoneWithColors,
      loading: false,
      error: null,
    })

    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText('カラー')).toBeInTheDocument()
      expect(screen.getByLabelText('ブラック')).toBeInTheDocument()
      expect(screen.getByLabelText('ホワイト')).toBeInTheDocument()
    })
  })

  /**
   * 主な機能セクションの表示を検証
   * @description デバイスの主要機能リストとスタイリングが適切に表示されることを確認
   */
  it('renders features section', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText('主な機能')).toBeInTheDocument()
    })

    expect(screen.getByText('A16 Bionicチップ')).toBeInTheDocument()
    expect(screen.getByText('48MPカメラシステム')).toBeInTheDocument()
    expect(screen.getByText('Face ID')).toBeInTheDocument()

    const featuresSection = screen.getByText('主な機能').closest('div')
    expect(featuresSection).toHaveClass('bg-white', 'rounded-2xl', 'p-6', 'shadow-lg')
  })

  /**
   * eSIMセクションの表示を検証
   * @description eSIMの利点と特徴が適切に表示されることを確認
   */
  it('renders eSIM section', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText('お手続き・あんしんの「eSIM」')).toBeInTheDocument()
      expect(screen.getByText('即日開通')).toBeInTheDocument()
      expect(screen.getByText('セキュア')).toBeInTheDocument()
      expect(screen.getByText('便利')).toBeInTheDocument()
    })
  })

  /**
   * 下取りプログラムセクションの表示を検証
   * @description 機種変更オプションと下取りプログラム情報が適切に表示されることを確認
   */
  it('renders trade-in section', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText('機種変更をお考えの方')).toBeInTheDocument()
      expect(screen.getByText('📱 下取りプログラム')).toBeInTheDocument()
      expect(screen.getByText('💳 分割払いオプション')).toBeInTheDocument()
    })
  })

  it('renders accessory grid', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText('おすすめアクセサリー')).toBeInTheDocument()
      expect(screen.getByText('ケース')).toBeInTheDocument()
      expect(screen.getByText('画面保護フィルム')).toBeInTheDocument()
      expect(screen.getByText('ワイヤレス充電器')).toBeInTheDocument()
      expect(screen.getByText('イヤホン')).toBeInTheDocument()
    })
  })

  it('renders apply button', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(screen.getByText('この機種で申し込む')).toBeInTheDocument()
    })
  })

  it('handles device ID from URL slug', async () => {
    render(<DeviceDetailPage deviceId="iphone16e" />)

    await waitFor(() => {
      expect(useSmartphone).toHaveBeenCalledWith('1')
    })
  })

  it('handles direct device ID', async () => {
    render(<DeviceDetailPage deviceId="direct-id" />)

    await waitFor(() => {
      expect(useSmartphone).toHaveBeenCalledWith('direct-id')
    })
  })
})
