import React from 'react'
import { render, screen } from '@testing-library/react'
import { InfoCard } from '../InfoCard'

/**
 * InfoCardコンポーネントのテストスイート
 * @description InfoCardコンポーネントの基本機能、バリアント、スタイリングを検証
 */
describe('InfoCard コンポーネント', () => {
  /**
   * InfoCardコンポーネントが正しくレンダリングされることを検証
   * @description タイトルと子要素が適切に表示されることを確認
   */
  it('正しくレンダリングされる', () => {
    render(
      <InfoCard variant="blue" title="テストタイトル">
        <p>テストコンテンツ</p>
      </InfoCard>
    )

    expect(screen.getByText('テストタイトル')).toBeInTheDocument()
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument()
  })

  /**
   * blueバリアントのスタイルが正しく適用されることを検証
   * @description blue色のバックグラウンド、ボーダー、テキストカラーが適用されることを確認
   */
  it('blueバリアントが正しく適用される', () => {
    const { container } = render(
      <InfoCard variant="blue" title="ブルーカード">
        <p>コンテンツ</p>
      </InfoCard>
    )

    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).toHaveClass('bg-blue-50', 'border-blue-200')

    const titleElement = screen.getByText('ブルーカード')
    expect(titleElement).toHaveClass('text-blue-800')
  })

  /**
   * greenバリアントのスタイルが正しく適用されることを検証
   * @description green色のバックグラウンド、ボーダー、テキストカラーが適用されることを確認
   */
  it('greenバリアントが正しく適用される', () => {
    const { container } = render(
      <InfoCard variant="green" title="グリーンカード">
        <p>コンテンツ</p>
      </InfoCard>
    )

    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).toHaveClass('bg-green-50', 'border-green-200')

    const titleElement = screen.getByText('グリーンカード')
    expect(titleElement).toHaveClass('text-green-800')
  })

  /**
   * purpleバリアントのスタイルが正しく適用されることを検証
   * @description purple色のバックグラウンド、ボーダー、テキストカラーが適用されることを確認
   */
  it('purpleバリアントが正しく適用される', () => {
    const { container } = render(
      <InfoCard variant="purple" title="パープルカード">
        <p>コンテンツ</p>
      </InfoCard>
    )

    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).toHaveClass('bg-purple-50', 'border-purple-200')

    const titleElement = screen.getByText('パープルカード')
    expect(titleElement).toHaveClass('text-purple-800')
  })

  /**
   * amberバリアントのスタイルが正しく適用されることを検証
   * @description amber色のバックグラウンド、ボーダー、テキストカラーが適用されることを確認
   */
  it('amberバリアントが正しく適用される', () => {
    const { container } = render(
      <InfoCard variant="amber" title="アンバーカード">
        <p>コンテンツ</p>
      </InfoCard>
    )

    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).toHaveClass('bg-amber-50', 'border-amber-200')

    const titleElement = screen.getByText('アンバーカード')
    expect(titleElement).toHaveClass('text-amber-800')
  })

  /**
   * カスタムclassNameが正しく適用されることを検証
   * @description 追加のCSSクラスが既存のスタイルと併用されることを確認
   */
  it('カスタムclassNameが正しく適用される', () => {
    const { container } = render(
      <InfoCard variant="blue" title="テスト" className="custom-class">
        <p>コンテンツ</p>
      </InfoCard>
    )

    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).toHaveClass('custom-class')
  })

  /**
   * 複雑な子要素が正しくレンダリングされることを検証
   * @description ネストしたHTML要素（段落、リスト、ボタン）が適切に表示されることを確認
   */
  it('複雑な子要素が正しくレンダリングされる', () => {
    render(
      <InfoCard variant="blue" title="複雑なカード">
        <div>
          <p>段落1</p>
          <ul>
            <li>リスト項目1</li>
            <li>リスト項目2</li>
          </ul>
          <button>ボタン</button>
        </div>
      </InfoCard>
    )

    expect(screen.getByText('段落1')).toBeInTheDocument()
    expect(screen.getByText('リスト項目1')).toBeInTheDocument()
    expect(screen.getByText('リスト項目2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ボタン' })).toBeInTheDocument()
  })
})
