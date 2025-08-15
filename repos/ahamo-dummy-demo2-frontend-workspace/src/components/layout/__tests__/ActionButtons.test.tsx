import React from 'react'
import { render, screen } from '@testing-library/react'
import { ActionButtons } from '../ActionButtons'

/**
 * ActionButtonsコンポーネントのテストスイート
 * @description アクションボタンコンポーネントの表示と構造を検証
 */
describe('ActionButtons', () => {
  /**
   * アクションボタンコンポーネントの正常なレンダリングを検証
   * @description アクションボタンが適切にレンダリングされることを確認
   */
  it('renders action buttons correctly', () => {
    const { container } = render(<ActionButtons />)
    expect(container.firstChild).toBeInTheDocument()
  })

  /**
   * ボタンの表示を検証
   * @description 両方のボタンが正しく表示されることを確認
   */
  it('renders both buttons correctly', () => {
    render(<ActionButtons />)

    expect(screen.getByText('キャンペーン詳細')).toBeInTheDocument()
    expect(screen.getByText('お知らせ')).toBeInTheDocument()
  })

  /**
   * ボタンのスタイリングを検証
   * @description ボタンに適切なスタイルクラスが適用されていることを確認
   */
  it('applies correct styling to buttons', () => {
    render(<ActionButtons />)

    const campaignButton = screen.getByText('キャンペーン詳細')
    const newsButton = screen.getByText('お知らせ')

    expect(campaignButton).toHaveClass('inline-flex')
    expect(newsButton).toHaveClass('inline-flex')
  })

  /**
   * コンテナのレスポンシブレイアウトを検証
   * @description レスポンシブデザインのためのクラスが適用されていることを確認
   */
  it('has responsive container layout', () => {
    const { container } = render(<ActionButtons />)

    const buttonContainer = container.firstChild
    expect(buttonContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row')
  })
})
