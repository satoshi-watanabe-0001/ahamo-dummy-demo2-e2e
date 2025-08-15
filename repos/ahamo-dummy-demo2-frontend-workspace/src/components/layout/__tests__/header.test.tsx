import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '../header'

/**
 * Headerコンポーネントのテストスイート
 * @description ヘッダーコンポーネントのナビゲーション、メニュー機能、レスポンシブ動作を検証
 */
describe('Header', () => {
  /**
   * 基本的なヘッダー要素の表示を検証
   * @description ロゴ、ナビゲーションリンク、ボタンが正しく表示されることを確認
   */
  it('renders header elements correctly', () => {
    render(<Header />)

    expect(screen.getByText('ahamo')).toBeInTheDocument()
    expect(screen.getByText('料金プラン')).toBeInTheDocument()
    expect(screen.getByText('サービス')).toBeInTheDocument()
    expect(screen.getByText('サポート')).toBeInTheDocument()
    expect(screen.getByText('申し込み')).toBeInTheDocument()
    expect(screen.getByText('ログイン')).toBeInTheDocument()
  })

  /**
   * ナビゲーションリンクの正しいhref属性を検証
   * @description 各ナビゲーションリンクが適切なパスを持つことを確認
   */
  it('has correct navigation links', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: 'ahamo' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: '料金プラン' })).toHaveAttribute('href', '/plans')
    expect(screen.getByRole('link', { name: 'サービス' })).toHaveAttribute('href', '/services')
    expect(screen.getByRole('link', { name: 'サポート' })).toHaveAttribute('href', '/support')
  })

  /**
   * モバイルメニューの開閉機能を検証
   * @description メニューボタンクリック時にモバイルメニューが表示/非表示されることを確認
   */
  it('toggles mobile menu correctly', () => {
    render(<Header />)

    const menuButton = screen.getByLabelText('メニューを開く')

    expect(screen.queryByText('料金プラン')).toBeInTheDocument()
    expect(screen.queryByText('料金プラン')).not.toHaveClass('py-2')

    fireEvent.click(menuButton)

    // メニュー表示後、モバイルメニュー内のリンクが表示されることを確認
    const mobileLinks = screen.getAllByText('料金プラン')
    expect(mobileLinks.some(link => link.className.includes('py-2'))).toBe(true)
    expect(screen.getAllByText('申し込み')).toHaveLength(2)
    expect(screen.getAllByText('ログイン')).toHaveLength(2)
  })

  /**
   * モバイルメニュー内のリンククリック時の動作を検証
   * @description モバイルメニューのリンククリック時にメニューが閉じることを確認
   */
  it('closes mobile menu when navigation link is clicked', () => {
    render(<Header />)

    const menuButton = screen.getByLabelText('メニューを開く')
    fireEvent.click(menuButton)

    const mobileLinks = screen.getAllByText('料金プラン')
    const mobileNavLink = mobileLinks.find(link => link.className.includes('py-2'))
    expect(mobileNavLink).toBeInTheDocument()

    if (mobileNavLink) {
      fireEvent.click(mobileNavLink)
    }

    expect(screen.queryAllByText('料金プラン').some(link => link.className.includes('py-2'))).toBe(
      false
    )
  })

  /**
   * ハンバーガーメニューアイコンのアニメーション状態を検証
   * @description メニュー開閉時にハンバーガーアイコンが正しく変化することを確認
   */
  it('animates hamburger menu icon correctly', () => {
    render(<Header />)

    const menuButton = screen.getByLabelText('メニューを開く')
    const hamburgerLines = menuButton.querySelectorAll('span')

    expect(hamburgerLines[0]).not.toHaveClass('rotate-45')
    expect(hamburgerLines[1]).not.toHaveClass('opacity-0')
    expect(hamburgerLines[2]).not.toHaveClass('-rotate-45')

    fireEvent.click(menuButton)

    expect(hamburgerLines[0]).toHaveClass('rotate-45')
    expect(hamburgerLines[1]).toHaveClass('opacity-0')
    expect(hamburgerLines[2]).toHaveClass('-rotate-45')
  })

  /**
   * デスクトップ表示でのナビゲーション要素の可視性を検証
   * @description デスクトップサイズでナビゲーションとボタンが適切に表示されることを確認
   */
  it('shows desktop navigation elements', () => {
    render(<Header />)

    const desktopNav = screen.getByRole('navigation')
    expect(desktopNav.className).toContain('hidden md:flex')

    const desktopButton = screen.getAllByText('申し込み')[0].closest('button')
    expect(desktopButton?.className || '').toContain('hidden sm:flex')
  })

  /**
   * アクセシビリティ属性の正しい設定を検証
   * @description メニューボタンに適切なaria-label属性が設定されることを確認
   */
  it('has proper accessibility attributes', () => {
    render(<Header />)

    const menuButton = screen.getByLabelText('メニューを開く')
    expect(menuButton).toHaveAttribute('aria-label', 'メニューを開く')
  })

  /**
   * スタイリングクラスの適用を検証
   * @description ヘッダーに適切なCSSクラスが適用されることを確認
   */
  it('applies correct styling classes', () => {
    const { container } = render(<Header />)

    const header = container.querySelector('header')
    expect(header).toHaveClass('sticky', 'top-0', 'z-50', 'bg-gradient-to-r')
  })
})
