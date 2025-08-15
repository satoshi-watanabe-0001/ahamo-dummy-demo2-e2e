import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { GradientButton } from '../GradientButton'

/**
 * GradientButtonコンポーネントのテストスイート
 * @description グラデーションボタンコンポーネントの各機能が正しく動作することを検証
 */
describe('GradientButton', () => {
  /**
   * 子要素が正しくレンダリングされることを検証
   * @description ボタン内のテキストが適切に表示されることを確認
   */
  it('renders with children', () => {
    render(<GradientButton>Test Button</GradientButton>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description 外部から渡されたクラス名がボタン要素に正しく適用されることを確認
   */
  it('applies custom className', () => {
    render(<GradientButton className="custom-class">Test</GradientButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  /**
   * クリックイベントが正しく処理されることを検証
   * @description onClickハンドラーがクリック時に適切に呼び出されることを確認
   */
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<GradientButton onClick={handleClick}>Click me</GradientButton>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  /**
   * サイズクラスが正しく適用されることを検証
   * @description 小サイズと大サイズのプロパティに応じて適切なCSSクラスが適用されることを確認
   */
  it('applies size classes correctly', () => {
    const { rerender } = render(<GradientButton size="sm">Small</GradientButton>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-sm')

    rerender(<GradientButton size="lg">Large</GradientButton>)
    expect(screen.getByRole('button')).toHaveClass('px-12', 'py-4', 'text-lg')
  })

  /**
   * グラデーション背景クラスが適用されることを検証
   * @description デフォルトのグラデーション背景スタイルが正しく適用されることを確認
   */
  it('applies gradient background classes', () => {
    render(<GradientButton>Gradient</GradientButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gradient-to-r', 'from-orange-500', 'to-red-500')
  })
})
