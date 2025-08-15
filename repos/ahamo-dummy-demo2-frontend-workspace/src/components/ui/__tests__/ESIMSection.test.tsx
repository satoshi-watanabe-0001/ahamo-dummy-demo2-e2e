import React from 'react'
import { render, screen } from '@testing-library/react'
import { ESIMSection } from '../ESIMSection'

/**
 * ESIMSectionコンポーネントのテストスイート
 * @description eSIMセクションの表示、スタイル、構造を検証
 */
describe('ESIMSection', () => {
  /**
   * eSIMセクションのコンテンツが正しく表示されることを検証
   * @description タイトル、各機能の説明文、アイコンが適切にレンダリングされることを確認
   */
  it('renders eSIM section content correctly', () => {
    render(<ESIMSection />)

    expect(screen.getByText('お手続き・あんしんの「eSIM」')).toBeInTheDocument()

    expect(screen.getByText('即日開通')).toBeInTheDocument()
    expect(screen.getByText('店舗に行かずにオンラインで即日開通できます')).toBeInTheDocument()

    expect(screen.getByText('セキュア')).toBeInTheDocument()
    expect(screen.getByText('物理SIMより安全で紛失の心配がありません')).toBeInTheDocument()

    expect(screen.getByText('便利')).toBeInTheDocument()
    expect(screen.getByText('海外でも簡単に現地の通信サービスを利用できます')).toBeInTheDocument()
  })

  /**
   * 絵文字アイコンが正しく表示されることを検証
   * @description 📱、🔒、🌍の絵文字が適切にレンダリングされることを確認
   */
  it('renders emoji icons', () => {
    render(<ESIMSection />)

    expect(screen.getByText('📱')).toBeInTheDocument()
    expect(screen.getByText('🔒')).toBeInTheDocument()
    expect(screen.getByText('🌍')).toBeInTheDocument()
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description propsで渡されたclassNameが正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(<ESIMSection className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * グリッドレイアウトの構造が正しいことを検証
   * @description md:grid-cols-3とgap-6クラスが適用されたグリッドコンテナが存在することを確認
   */
  it('has proper structure with grid layout', () => {
    render(<ESIMSection />)

    const gridContainer = screen.getByText('即日開通').closest('.grid')
    expect(gridContainer).toHaveClass('md:grid-cols-3', 'gap-6')
  })
})
