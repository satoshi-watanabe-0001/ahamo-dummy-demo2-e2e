import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../LoadingSpinner'

/**
 * LoadingSpinnerコンポーネントのテストスイート
 * @description ローディングスピナーの表示、スタイル、アクセシビリティ機能を検証
 */
describe('LoadingSpinner', () => {
  /**
   * デフォルトメッセージでの表示テスト
   * @description デフォルトの「読み込み中...」メッセージとstatus roleが正しく表示されることを確認
   */
  it('renders with default message', () => {
    render(<LoadingSpinner />)

    expect(screen.getByText('読み込み中...')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  /**
   * カスタムメッセージでの表示テスト
   * @description 指定されたカスタムメッセージが正しく表示されることを確認
   */
  it('renders with custom message', () => {
    const customMessage = 'データを処理中...'
    render(<LoadingSpinner message={customMessage} />)

    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  /**
   * デフォルト背景グラデーションの適用テスト
   * @description デフォルトの紫-青-シアンのグラデーションクラスが適用されることを確認
   */
  it('applies default background gradient', () => {
    const { container } = render(<LoadingSpinner />)

    expect(container.firstChild).toHaveClass('from-purple-100', 'via-blue-50', 'to-cyan-100')
  })

  /**
   * カスタム背景グラデーションの適用テスト
   * @description 指定されたカスタムグラデーションクラスが正しく適用されることを確認
   */
  it('applies custom background gradient', () => {
    const customGradient = 'from-red-100 via-pink-50 to-rose-100'
    const { container } = render(<LoadingSpinner backgroundGradient={customGradient} />)

    expect(container.firstChild).toHaveClass('from-red-100', 'via-pink-50', 'to-rose-100')
  })

  /**
   * デフォルトスピナー色の適用テスト
   * @description デフォルトの青色（border-blue-600）がスピナーに適用されることを確認
   */
  it('applies default spinner color', () => {
    render(<LoadingSpinner />)

    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveClass('border-blue-600')
  })

  /**
   * カスタムスピナー色の適用テスト
   * @description 指定されたカスタム色がスピナーに正しく適用されることを確認
   */
  it('applies custom spinner color', () => {
    const customColor = 'border-green-600'
    render(<LoadingSpinner spinnerColor={customColor} />)

    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveClass('border-green-600')
  })

  /**
   * カスタムクラス名の適用テスト
   * @description 指定されたカスタムクラス名がコンポーネントに正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />)

    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * アクセシビリティ属性の確認テスト
   * @description aria-live、aria-label属性が適切に設定されていることを確認
   */
  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner message="テスト読み込み中" />)

    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    expect(statusElement).toHaveAttribute('aria-label', 'テスト読み込み中')
  })

  /**
   * スピニングアニメーションの確認テスト
   * @description animate-spinクラスと円形スタイルが適用されていることを確認
   */
  it('has spinning animation', () => {
    render(<LoadingSpinner />)

    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveClass('animate-spin')
    expect(statusElement).toHaveClass('rounded-full')
  })

  it('renders within SectionContainer', () => {
    render(<LoadingSpinner />)

    const container = screen.getByRole('status').closest('.container')
    expect(container).toBeInTheDocument()
  })

  it('has full screen layout', () => {
    const { container } = render(<LoadingSpinner />)

    expect(container.firstChild).toHaveClass('min-h-screen')
  })
})
