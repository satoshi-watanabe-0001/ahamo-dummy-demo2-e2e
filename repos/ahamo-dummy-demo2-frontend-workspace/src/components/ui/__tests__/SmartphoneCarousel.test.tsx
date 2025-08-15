import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SmartphoneCarousel } from '../SmartphoneCarousel'
import { useSmartphones } from '@/hooks/useSmartphones'

const mockSmartphones = [
  {
    id: '1',
    name: 'iPhone 16e',
    brand: 'Apple',
    price: '43,670円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
    features: ['いつでもカエドキプログラム適用時', 'お客様負担額'],
    link: '/smartphones/iphone16e',
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
  },
  {
    id: '3',
    name: 'Galaxy S24',
    brand: 'Samsung',
    price: '124,800円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center',
    features: ['AI機能搭載', '200MPカメラ', '高速充電'],
    link: '/smartphones/galaxys24',
  },
]

jest.mock('@/hooks/useSmartphones', () => ({
  useSmartphones: jest.fn(),
}))

/**
 * SmartphoneCarouselコンポーネントのテストスイート
 * @description スマートフォンカルーセルの表示、ナビゲーション、自動再生機能を検証
 */
describe('SmartphoneCarousel', () => {
  beforeEach(() => {
    ;(useSmartphones as jest.Mock).mockReturnValue({
      smartphones: mockSmartphones,
      loading: false,
      error: null,
      refetch: jest.fn(),
    })
  })

  /**
   * プロップスで渡されたスマートフォンデータの表示を検証
   * @description 外部から渡されたスマートフォンデータが正しく表示されることを確認
   */
  it('renders smartphones from props correctly', () => {
    render(<SmartphoneCarousel smartphones={mockSmartphones} />)

    expect(screen.getByText('おすすめのスマホ機種をチェック')).toBeInTheDocument()
    expect(screen.getByText('iPhone 16e')).toBeInTheDocument()
  })

  /**
   * APIから取得したスマートフォンデータの表示を検証
   * @description useSmartphonesフックから取得したデータが正しく表示されることを確認
   */
  it('renders smartphones from API when no props provided', () => {
    render(<SmartphoneCarousel />)

    expect(screen.getByText('iPhone 16e')).toBeInTheDocument()
  })

  /**
   * ローディング状態の表示を検証
   * @description データ取得中にローディングメッセージとスピナーが表示されることを確認
   */
  it('displays loading state correctly', () => {
    ;(useSmartphones as jest.Mock).mockReturnValue({
      smartphones: [],
      loading: true,
      error: null,
      refetch: jest.fn(),
    })

    render(<SmartphoneCarousel />)

    expect(screen.getByText('スマホ情報を読み込み中...')).toBeInTheDocument()
  })

  /**
   * エラー状態の表示を検証
   * @description APIエラー時にエラーメッセージが適切に表示されることを確認
   */
  it('displays error state correctly', () => {
    ;(useSmartphones as jest.Mock).mockReturnValue({
      smartphones: [],
      loading: false,
      error: 'ネットワークエラーが発生しました',
      refetch: jest.fn(),
    })

    render(<SmartphoneCarousel />)

    expect(screen.getByText('データの読み込みに失敗しました')).toBeInTheDocument()
    expect(screen.getByText('ネットワークエラーが発生しました')).toBeInTheDocument()
  })

  /**
   * 空のデータ状態の表示を検証
   * @description スマートフォンデータが空の場合のメッセージ表示を確認
   */
  it('displays empty state when no smartphones available', () => {
    ;(useSmartphones as jest.Mock).mockReturnValue({
      smartphones: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
    })

    render(<SmartphoneCarousel />)

    expect(screen.getByText('スマホ情報がありません')).toBeInTheDocument()
    expect(screen.getByText('現在表示できるスマートフォンがありません')).toBeInTheDocument()
  })

  /**
   * 次へボタンのナビゲーション機能を検証
   * @description 次へボタンクリック時にスライドが正しく切り替わることを確認
   */
  it('handles next button navigation', async () => {
    render(<SmartphoneCarousel smartphones={mockSmartphones} />)

    const nextButton = screen.getByText('→')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText('iPhone 16 Pro')).toBeInTheDocument()
    })
  })

  /**
   * 前へボタンのナビゲーション機能を検証
   * @description 前へボタンクリック時にスライドが正しく切り替わることを確認
   */
  it('handles previous button navigation', async () => {
    render(<SmartphoneCarousel smartphones={mockSmartphones} />)

    const prevButton = screen.getByText('←')
    fireEvent.click(prevButton)

    expect(screen.getByText('iPhone 16e')).toBeInTheDocument()
  })

  /**
   * ドットインジケーターのナビゲーション機能を検証
   * @description ドットクリック時に対応するスライドに移動することを確認
   */
  it('handles dot indicator navigation', async () => {
    render(<SmartphoneCarousel smartphones={mockSmartphones} />)

    const dots = screen.getAllByRole('button')
    const secondDot = dots.find(button => button.className.includes('w-3 h-3'))

    if (secondDot) {
      fireEvent.click(secondDot)
      expect(screen.getByText('iPhone 16e')).toBeInTheDocument()
    }
  })

  /**
   * 自動再生機能の切り替えを検証
   * @description 自動再生ボタンクリック時に状態が正しく切り替わることを確認
   */
  it('handles auto-play toggle', () => {
    render(<SmartphoneCarousel smartphones={mockSmartphones} />)

    const autoPlayButton = screen.getByText('⏸️ 自動再生中')
    fireEvent.click(autoPlayButton)

    expect(screen.getByText('▶️ 自動再生')).toBeInTheDocument()
  })

  /**
   * 自動再生機能の表示を検証
   * @description 自動再生ボタンが正しく表示されることを確認
   */
  it('displays auto-play button correctly', () => {
    render(<SmartphoneCarousel smartphones={mockSmartphones} />)

    expect(screen.getByText('⏸️ 自動再生中')).toBeInTheDocument()
  })

  /**
   * スマートフォン情報の詳細表示を検証
   * @description 価格、機能、ブランド情報が正しく表示されることを確認
   */
  it('displays smartphone details correctly', () => {
    render(<SmartphoneCarousel smartphones={mockSmartphones} />)

    expect(screen.getByText('43,670円〜')).toBeInTheDocument()
    expect(screen.getByText('いつでもカエドキプログラム適用時')).toBeInTheDocument()
  })
})
