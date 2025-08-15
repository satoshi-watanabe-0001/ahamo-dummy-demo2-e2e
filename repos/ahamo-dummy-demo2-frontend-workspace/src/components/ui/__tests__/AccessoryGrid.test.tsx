import React from 'react'
import { render, screen } from '@testing-library/react'
import { AccessoryGrid, Accessory } from '../AccessoryGrid'

const customAccessories: Accessory[] = [
  { name: 'カスタムケース', price: '3,500円', image: '📱' },
  { name: 'カスタム充電器', price: '2,500円', image: '🔌' },
]

/**
 * AccessoryGridコンポーネントのテストスイート
 * @description アクセサリーグリッドの表示、カスタマイズ、レイアウトの動作を検証
 */
describe('AccessoryGrid', () => {
  /**
   * デフォルトアクセサリーが正しく表示されることを検証
   * @description 標準のアクセサリー一覧（ケース、画面保護フィルム、充電器、イヤホン）とその価格が適切に表示されることを確認
   */
  it('renders default accessories correctly', () => {
    render(<AccessoryGrid />)

    expect(screen.getByText('おすすめアクセサリー')).toBeInTheDocument()
    expect(screen.getByText('ケース')).toBeInTheDocument()
    expect(screen.getByText('2,980円')).toBeInTheDocument()
    expect(screen.getByText('画面保護フィルム')).toBeInTheDocument()
    expect(screen.getByText('1,980円')).toBeInTheDocument()
    expect(screen.getByText('ワイヤレス充電器')).toBeInTheDocument()
    expect(screen.getByText('4,980円')).toBeInTheDocument()
    expect(screen.getByText('イヤホン')).toBeInTheDocument()
    expect(screen.getByText('8,980円')).toBeInTheDocument()
  })

  /**
   * カスタムアクセサリーが提供された場合の表示を検証
   * @description propsで渡されたカスタムアクセサリーが表示され、デフォルトアクセサリーが表示されないことを確認
   */
  it('renders custom accessories when provided', () => {
    render(<AccessoryGrid accessories={customAccessories} />)

    expect(screen.getByText('おすすめアクセサリー')).toBeInTheDocument()
    expect(screen.getByText('カスタムケース')).toBeInTheDocument()
    expect(screen.getByText('3,500円')).toBeInTheDocument()
    expect(screen.getByText('カスタム充電器')).toBeInTheDocument()
    expect(screen.getByText('2,500円')).toBeInTheDocument()

    expect(screen.queryByText('ケース')).not.toBeInTheDocument()
    expect(screen.queryByText('2,980円')).not.toBeInTheDocument()
  })

  /**
   * 絵文字アイコンが正しく表示されることを検証
   * @description 各アクセサリーに対応する絵文字アイコンが適切に表示されることを確認
   */
  it('renders emoji icons correctly', () => {
    render(<AccessoryGrid />)

    expect(screen.getByText('📱')).toBeInTheDocument()
    expect(screen.getByText('🛡️')).toBeInTheDocument()
    expect(screen.getByText('🔌')).toBeInTheDocument()
    expect(screen.getByText('🎧')).toBeInTheDocument()
  })

  /**
   * カスタムクラス名の適用を検証
   * @description propsで渡されたカスタムクラス名がコンポーネントに正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(<AccessoryGrid className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * グリッドレイアウト構造の検証
   * @description レスポンシブグリッドレイアウトのクラス（md:grid-cols-2、lg:grid-cols-4、gap-4）が適切に適用されることを確認
   */
  it('has proper grid layout structure', () => {
    render(<AccessoryGrid />)

    const gridContainer = screen.getByText('ケース').closest('.grid')
    expect(gridContainer).toHaveClass('md:grid-cols-2', 'lg:grid-cols-4', 'gap-4')
  })

  /**
   * アクセサリーカードのホバーエフェクトを検証
   * @description アクセサリーカードにホバー時のシャドウエフェクトとトランジションが適用されることを確認
   */
  it('has hover effects on accessory cards', () => {
    render(<AccessoryGrid />)

    const accessoryCard = screen.getByText('ケース').closest('.p-4')
    expect(accessoryCard).toHaveClass('hover:shadow-md', 'transition-shadow')
  })

  /**
   * 空のアクセサリー配列が提供された場合の表示を検証
   * @description 空の配列が渡された場合にタイトルは表示されるが、アクセサリーアイテムは表示されないことを確認
   */
  it('renders empty grid when empty accessories array provided', () => {
    render(<AccessoryGrid accessories={[]} />)

    expect(screen.getByText('おすすめアクセサリー')).toBeInTheDocument()
    const gridContainer = screen.getByText('おすすめアクセサリー').nextElementSibling
    expect(gridContainer?.children).toHaveLength(0)
  })
})
