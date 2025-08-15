import React from 'react'
import { render, screen } from '@testing-library/react'
import { SectionContainer } from '../SectionContainer'

/**
 * SectionContainerコンポーネントのテストスイート
 * @description レイアウトコンテナコンポーネントの基本機能とスタイリングを検証
 */
describe('SectionContainer', () => {
  /**
   * 子要素が正しくレンダリングされることを検証
   * @description SectionContainer内に渡された子要素が適切に表示されることを確認
   */
  it('renders with children', () => {
    render(
      <SectionContainer>
        <div>Test Content</div>
      </SectionContainer>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  /**
   * デフォルトのコンテナクラスが適用されることを検証
   * @description container、mx-auto、px-4のデフォルトCSSクラスが正しく適用されることを確認
   */
  it('applies default container classes', () => {
    render(<SectionContainer>Content</SectionContainer>)
    const container = screen.getByText('Content')
    expect(container).toHaveClass('container', 'mx-auto', 'px-4')
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description propsで渡されたカスタムクラス名が要素に正しく適用されることを確認
   */
  it('applies custom className', () => {
    render(<SectionContainer className="custom-class">Content</SectionContainer>)
    const container = screen.getByText('Content')
    expect(container).toHaveClass('custom-class')
  })

  /**
   * 異なるHTML要素としてレンダリングされることを検証
   * @description asプロパティで指定された要素タイプ（section、main、nav）で正しくレンダリングされることを確認
   */
  it('renders as different HTML elements', () => {
    const { rerender } = render(<SectionContainer as="section">Section</SectionContainer>)
    expect(screen.getByText('Section').tagName).toBe('SECTION')

    rerender(<SectionContainer as="main">Main</SectionContainer>)
    expect(screen.getByText('Main').tagName).toBe('MAIN')

    rerender(<SectionContainer as="nav">Nav</SectionContainer>)
    expect(screen.getByText('Nav').tagName).toBe('NAV')
  })

  /**
   * デフォルトでdiv要素としてレンダリングされることを検証
   * @description asプロパティが指定されていない場合にdiv要素として表示されることを確認
   */
  it('defaults to div element', () => {
    render(<SectionContainer>Default</SectionContainer>)
    expect(screen.getByText('Default').tagName).toBe('DIV')
  })
})
