import React from 'react'
import { render, screen } from '@testing-library/react'
import { AdditionalContent } from '../AdditionalContent'

jest.mock('@/components/ui/SmartphoneCarousel', () => ({
  SmartphoneCarousel: () => <div data-testid="smartphone-carousel">Smartphone Carousel Mocked</div>,
}))

/**
 * AdditionalContentコンポーネントのテストスイート
 * @description 追加コンテンツコンポーネントの表示、セクション、スタイリングを検証
 */
describe('AdditionalContent', () => {
  /**
   * 追加コンテンツコンポーネントの正常なレンダリングを検証
   * @description 追加コンテンツが適切にレンダリングされることを確認
   */
  it('renders additional content correctly', () => {
    const { container } = render(<AdditionalContent />)
    expect(container.firstChild).toBeInTheDocument()
  })

  /**
   * スマートフォンカルーセルの表示を検証
   * @description スマートフォンカルーセルコンポーネントが正しく表示されることを確認
   */
  it('renders smartphone carousel component', () => {
    render(<AdditionalContent />)
    expect(screen.getByTestId('smartphone-carousel')).toBeInTheDocument()
  })

  /**
   * 製品一覧ボタンの表示を検証
   * @description 製品一覧ボタンが正しく表示されることを確認
   */
  it('renders product list button', () => {
    render(<AdditionalContent />)
    expect(screen.getByText('製品一覧')).toBeInTheDocument()
  })

  /**
   * キャンペーンセクションの表示を検証
   * @description キャンペーンセクションが正しく表示されることを確認
   */
  it('renders campaign section', () => {
    render(<AdditionalContent />)
    expect(screen.getByText('特別キャンペーン実施中')).toBeInTheDocument()
    expect(screen.getByText('期間限定のお得なプランをご用意しています')).toBeInTheDocument()
    expect(screen.getByText('AD')).toBeInTheDocument()
  })

  /**
   * 選ばれる理由セクションの表示を検証
   * @description 選ばれる理由セクションが正しく表示されることを確認
   */
  it('renders reasons section', () => {
    render(<AdditionalContent />)
    expect(screen.getByText('ahamoが選ばれる理由')).toBeInTheDocument()
    expect(screen.getByText('圧倒的コスパ')).toBeInTheDocument()
    expect(screen.getByText('通話も安心')).toBeInTheDocument()
    expect(screen.getByText('安定の品質')).toBeInTheDocument()
  })

  /**
   * 特典セクションの表示を検証
   * @description 特典セクションが正しく表示されることを確認
   */
  it('renders bonus section', () => {
    render(<AdditionalContent />)
    expect(screen.getByText('🎉 今なら特典がさらにお得！')).toBeInTheDocument()
    expect(screen.getByText(/最大10,000ポイント/)).toBeInTheDocument()
    expect(screen.getByText(/※キャンペーン期間：2024年12月31日まで/)).toBeInTheDocument()
  })

  /**
   * グラデーションスタイルの適用を検証
   * @description グラデーションスタイルが適切に適用されていることを確認
   */
  it('applies gradient styling correctly', () => {
    const { container } = render(<AdditionalContent />)

    const gradientContainer = container.querySelector('.bg-gradient-to-br')
    expect(gradientContainer).toBeInTheDocument()
  })
})
