import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

/**
 * Footerコンポーネントのテストスイート
 * @description フッターコンポーネントの表示、リンク、セクション構造を検証
 */
describe('Footer', () => {
  /**
   * フッターコンポーネントの正常なレンダリングを検証
   * @description フッターが適切にレンダリングされることを確認
   */
  it('renders footer correctly', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toBeInTheDocument()
  })

  /**
   * フッターのセクションヘッダーの表示を検証
   * @description 各セクションのヘッダーが正しく表示されることを確認
   */
  it('renders section headers correctly', () => {
    render(<Footer />)

    expect(screen.getByText('サービス')).toBeInTheDocument()
    expect(screen.getByText('サポート')).toBeInTheDocument()
    expect(screen.getByText('会社情報')).toBeInTheDocument()
  })

  /**
   * フッターのリンク項目の表示を検証
   * @description 各セクションのリンク項目が正しく表示されることを確認
   */
  it('renders link items correctly', () => {
    render(<Footer />)

    expect(screen.getByText('料金プラン')).toBeInTheDocument()
    expect(screen.getByText('オプション')).toBeInTheDocument()
    expect(screen.getByText('端末情報')).toBeInTheDocument()

    expect(screen.getByText('よくある質問')).toBeInTheDocument()
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
    expect(screen.getByText('チャットサポート')).toBeInTheDocument()

    expect(screen.getByText('会社概要')).toBeInTheDocument()
    expect(screen.getByText('プライバシーポリシー')).toBeInTheDocument()
    expect(screen.getByText('利用規約')).toBeInTheDocument()
  })

  /**
   * フッターのコピーライト表示を検証
   * @description コピーライト情報が正しく表示されることを確認
   */
  it('displays copyright information', () => {
    render(<Footer />)

    expect(screen.getByText(/© 2024 ahamo\. All rights reserved\./)).toBeInTheDocument()
  })

  /**
   * フッターのリンクのhref属性を検証
   * @description リンクが適切なhref属性を持つことを確認
   */
  it('has correct href attributes for links', () => {
    render(<Footer />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(9) // 3セクション × 3リンク

    links.forEach(link => {
      expect(link).toHaveAttribute('href', '#')
    })
  })

  /**
   * フッターのレスポンシブレイアウトを検証
   * @description レスポンシブデザインのためのクラスが適用されていることを確認
   */
  it('applies responsive layout classes', () => {
    const { container } = render(<Footer />)

    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-3')
  })
})
