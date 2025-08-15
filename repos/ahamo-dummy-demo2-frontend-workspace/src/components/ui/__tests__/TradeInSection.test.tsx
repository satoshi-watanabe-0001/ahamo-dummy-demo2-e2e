import React from 'react'
import { render, screen } from '@testing-library/react'
import { TradeInSection } from '../TradeInSection'

/**
 * TradeInSectionコンポーネントのテストスイート
 * @description 下取りプログラムと分割払いオプションの表示機能をテスト
 */
describe('TradeInSection', () => {
  /**
   * 下取りセクションのコンテンツが正しく表示されることを検証
   * @description 機種変更案内、下取りプログラム、分割払いオプションの各要素が適切にレンダリングされることを確認
   */
  it('renders trade-in section content correctly', () => {
    render(<TradeInSection />)

    expect(screen.getByText('機種変更をお考えの方')).toBeInTheDocument()

    expect(screen.getByText('📱 下取りプログラム')).toBeInTheDocument()
    expect(
      screen.getByText('現在お使いの機種を下取りに出すことで、新しい機種をお得に購入できます。')
    ).toBeInTheDocument()
    expect(screen.getByText('最大 1,000 ポイント')).toBeInTheDocument()
    expect(screen.getByText('進呈')).toBeInTheDocument()

    expect(screen.getByText('💳 分割払いオプション')).toBeInTheDocument()
    expect(screen.getByText('24回分割払いで月々の負担を軽減できます。')).toBeInTheDocument()
  })

  /**
   * ポイント報酬がオレンジ色でハイライト表示されることを検証
   * @description 最大1,000ポイントのテキストが適切なスタイルクラスで強調表示されることを確認
   */
  it('highlights point reward with orange color', () => {
    render(<TradeInSection />)

    const pointReward = screen.getByText('最大 1,000 ポイント')
    expect(pointReward).toHaveClass('text-orange-600', 'font-bold')
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description propsで渡されたカスタムクラス名がコンポーネントのルート要素に正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(<TradeInSection className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * 適切なカード構造を持つことを検証
   * @description 下取りプログラムと分割払いオプションのカードが適切なスタイルクラスで構成されることを確認
   */
  it('has proper card structure', () => {
    render(<TradeInSection />)

    const tradeInCard = screen.getByText('📱 下取りプログラム').closest('.p-4')
    const paymentCard = screen.getByText('💳 分割払いオプション').closest('.p-4')

    expect(tradeInCard).toHaveClass('bg-gray-50', 'rounded-lg')
    expect(paymentCard).toHaveClass('bg-gray-50', 'rounded-lg')
  })
})
