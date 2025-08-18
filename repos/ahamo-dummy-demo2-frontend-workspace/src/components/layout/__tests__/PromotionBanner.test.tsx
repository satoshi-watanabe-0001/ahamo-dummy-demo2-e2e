import React from 'react'
import { render, screen } from '@testing-library/react'
import { PromotionBanner } from '../PromotionBanner'

/**
 * PromotionBannerコンポーネントのテストスイート
 * @description プロモーションバナーコンポーネントの表示、テキスト、スタイリングを検証
 */
describe('PromotionBanner', () => {
  /**
   * プロモーションバナーコンポーネントの正常なレンダリングを検証
   * @description プロモーションバナーが適切にレンダリングされることを確認
   */
  it('renders promotion banner correctly', () => {
    const { container } = render(<PromotionBanner />)
    expect(container.firstChild).toBeInTheDocument()
  })

  /**
   * プロモーションタイトルとテキストの表示を検証
   * @description 主要なタイトルとテキストが正しく表示されることを確認
   */
  it('renders promotion title and text correctly', () => {
    render(<PromotionBanner />)

    expect(screen.getByText('特別キャンペーン実施中')).toBeInTheDocument()
    expect(
      screen.getByText('今なら月額料金が最大3ヶ月無料！お得にahamoを始めよう')
    ).toBeInTheDocument()
  })

  /**
   * プロモーションバッジの表示を検証
   * @description プロモーションバッジが正しく表示されることを確認
   */
  it('renders promotion badges correctly', () => {
    render(<PromotionBanner />)

    expect(screen.getByText('🎉 期間限定オファー')).toBeInTheDocument()
    expect(screen.getByText('⚡ 即日開通可能')).toBeInTheDocument()
  })

  /**
   * グラデーションスタイルの適用を検証
   * @description グラデーションスタイルが適切に適用されていることを確認
   */
  it('applies gradient styling correctly', () => {
    const { container } = render(<PromotionBanner />)

    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-gradient-to-r')

    const title = screen.getByText('特別キャンペーン実施中')
    expect(title).toHaveClass('bg-gradient-to-r', 'bg-clip-text', 'text-transparent')
  })

  /**
   * アニメーション要素の表示を検証
   * @description アニメーション要素が正しく表示されることを確認
   */
  it('renders animation elements', () => {
    const { container } = render(<PromotionBanner />)

    const animationElements = container.querySelectorAll('.animate-pulse')
    expect(animationElements.length).toBe(3)
  })

  /**
   * レスポンシブテキストスタイルの適用を検証
   * @description レスポンシブテキストスタイルが適切に適用されていることを確認
   */
  it('applies responsive text styling', () => {
    const { container } = render(<PromotionBanner />)

    const heading = container.querySelector('h2')
    expect(heading).toHaveClass('text-4xl', 'md:text-5xl')

    const paragraph = container.querySelector('p')
    expect(paragraph).toHaveClass('text-xl', 'md:text-2xl')
  })
})
