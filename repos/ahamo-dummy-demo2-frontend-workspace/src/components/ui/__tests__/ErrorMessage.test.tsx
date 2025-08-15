import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorMessage } from '../ErrorMessage'

/**
 * ErrorMessageコンポーネントのテストスイート
 * @description エラーメッセージの表示、スタイリング、アクセシビリティ機能を検証
 */
describe('ErrorMessage', () => {
  const testMessage = 'テストエラーメッセージ'

  /**
   * エラーメッセージが正しく表示されることを検証
   * @description メッセージテキストとalert要素が適切にレンダリングされることを確認
   */
  it('renders error message correctly', () => {
    render(<ErrorMessage message={testMessage} />)

    expect(screen.getByText(`エラーが発生しました: ${testMessage}`)).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  /**
   * デフォルトの背景グラデーションが適用されることを検証
   * @description purple-blue-cyanのグラデーションクラスが正しく設定されることを確認
   */
  it('applies default background gradient', () => {
    const { container } = render(<ErrorMessage message={testMessage} />)

    expect(container.firstChild).toHaveClass('from-purple-100', 'via-blue-50', 'to-cyan-100')
  })

  /**
   * カスタム背景グラデーションが適用されることを検証
   * @description backgroundGradientプロパティで指定したカスタムグラデーションが反映されることを確認
   */
  it('applies custom background gradient', () => {
    const customGradient = 'from-red-100 via-pink-50 to-rose-100'
    const { container } = render(
      <ErrorMessage message={testMessage} backgroundGradient={customGradient} />
    )

    expect(container.firstChild).toHaveClass('from-red-100', 'via-pink-50', 'to-rose-100')
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description classNameプロパティで指定したカスタムクラスが要素に追加されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(<ErrorMessage message={testMessage} className="custom-class" />)

    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * 適切なアクセシビリティ属性が設定されることを検証
   * @description aria-live、aria-label属性がスクリーンリーダー対応のため正しく設定されることを確認
   */
  it('has proper accessibility attributes', () => {
    render(<ErrorMessage message={testMessage} />)

    const alertElement = screen.getByRole('alert')
    expect(alertElement).toHaveAttribute('aria-live', 'assertive')
    expect(alertElement).toHaveAttribute('aria-label', `エラー: ${testMessage}`)
  })

  /**
   * エラーテキストが赤色で表示されることを検証
   * @description エラーメッセージのテキストにtext-red-600クラスが適用されることを確認
   */
  it('displays error text in red color', () => {
    render(<ErrorMessage message={testMessage} />)

    const errorText = screen.getByText(`エラーが発生しました: ${testMessage}`)
    expect(errorText).toHaveClass('text-red-600')
  })

  /**
   * SectionContainer内でレンダリングされることを検証
   * @description エラーメッセージがSectionContainerコンポーネント内に適切に配置されることを確認
   */
  it('renders within SectionContainer', () => {
    render(<ErrorMessage message={testMessage} />)

    const container = screen.getByRole('alert').closest('.container')
    expect(container).toBeInTheDocument()
  })

  /**
   * フルスクリーンレイアウトが適用されることを検証
   * @description min-h-screenクラスによりコンテナが画面全体の高さを持つことを確認
   */
  it('has full screen layout', () => {
    const { container } = render(<ErrorMessage message={testMessage} />)

    expect(container.firstChild).toHaveClass('min-h-screen')
  })

  /**
   * コンテンツが適切に中央配置されることを検証
   * @description max-w-4xlとmx-autoクラスによりコンテンツが水平方向に中央配置されることを確認
   */
  it('centers content properly', () => {
    render(<ErrorMessage message={testMessage} />)

    const contentContainer = screen.getByRole('alert').closest('.text-center')
    expect(contentContainer).toBeInTheDocument()
    expect(contentContainer).toHaveClass('max-w-4xl', 'mx-auto')
  })

  it('handles long error messages', () => {
    const longMessage = 'これは非常に長いエラーメッセージです。'.repeat(10)
    render(<ErrorMessage message={longMessage} />)

    expect(screen.getByText(`エラーが発生しました: ${longMessage}`)).toBeInTheDocument()
  })

  it('handles empty error message', () => {
    render(<ErrorMessage message="" />)

    expect(screen.getByText(/エラーが発生しました:/)).toBeInTheDocument()
  })
})
