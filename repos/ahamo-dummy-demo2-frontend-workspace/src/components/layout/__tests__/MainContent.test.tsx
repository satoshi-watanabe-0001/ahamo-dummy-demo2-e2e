import React from 'react'
import { render, screen } from '@testing-library/react'
import { MainContent } from '../MainContent'

jest.mock('@/components/ui/CampaignCarousel', () => ({
  CampaignCarousel: ({ campaigns }: { campaigns: unknown[] }) => (
    <div data-testid="campaign-carousel">{campaigns.length} campaigns mocked</div>
  ),
}))

/**
 * MainContentコンポーネントのテストスイート
 * @description メインコンテンツコンポーネントの表示、ボタン、キャンペーンカルーセルを検証
 */
describe('MainContent', () => {
  /**
   * メインコンテンツコンポーネントの正常なレンダリングを検証
   * @description メインコンテンツが適切にレンダリングされることを確認
   */
  it('renders main content correctly', () => {
    const { container } = render(<MainContent />)
    expect(container.firstChild).toBeInTheDocument()
  })

  /**
   * メインコンテンツの見出しとテキストの表示を検証
   * @description 主要な見出しとテキストが正しく表示されることを確認
   */
  it('renders heading and text correctly', () => {
    const { container } = render(<MainContent />)

    const heading = container.querySelector('h1')
    expect(heading).toHaveTextContent('シンプルでお得な料金プラン')

    const gradientText = container.querySelector('.text-transparent.bg-clip-text')
    expect(gradientText).toHaveTextContent('お得')

    expect(
      screen.getByText('月額2,970円で20GB使える。追加料金なしで5分以内の国内通話かけ放題')
    ).toBeInTheDocument()
  })

  /**
   * アクションボタンの表示を検証
   * @description 主要なアクションボタンが正しく表示されることを確認
   */
  it('renders action buttons correctly', () => {
    render(<MainContent />)

    const applyButton = screen.getByText(/今すぐ申し込み/i)
    expect(applyButton).toBeInTheDocument()

    expect(screen.getByText('申し込みの流れを見る')).toBeInTheDocument()
  })

  /**
   * キャンペーンカルーセルの表示を検証
   * @description キャンペーンカルーセルコンポーネントが正しく表示されることを確認
   */
  it('renders campaign carousel component', () => {
    render(<MainContent />)

    expect(screen.getByTestId('campaign-carousel')).toBeInTheDocument()
  })

  /**
   * レスポンシブレイアウトの適用を検証
   * @description レスポンシブデザインのためのクラスが適用されていることを確認
   */
  it('applies responsive layout classes', () => {
    const { container } = render(<MainContent />)

    const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
    expect(buttonContainer).toBeInTheDocument()
  })

  /**
   * グラデーションスタイルの適用を検証
   * @description グラデーションスタイルが適切に適用されていることを確認
   */
  it('applies gradient styling correctly', () => {
    const { container } = render(<MainContent />)

    const gradientText = container.querySelector('.text-transparent.bg-clip-text')
    expect(gradientText).toHaveClass('text-transparent', 'bg-clip-text', 'bg-gradient-to-r')
  })
})
