import React from 'react'
import { render, screen } from '@testing-library/react'
import { DocumentCard } from '../DocumentCard'

/**
 * DocumentCardコンポーネントのテストスイート
 * @description 書類カードコンポーネントの表示、スタイル、バリアントの動作を検証
 */
describe('DocumentCard コンポーネント', () => {
  /**
   * 基本的なレンダリングテスト
   * @description タイトル、サブタイトル、書類名が正しく表示されることを確認
   */
  it('正しくレンダリングされる', () => {
    render(
      <DocumentCard
        title="テストタイトル"
        subtitle="テストサブタイトル"
        documentName="テスト書類"
        variant="blue"
      />
    )

    expect(screen.getByText('テストタイトル')).toBeInTheDocument()
    expect(screen.getByText('テストサブタイトル')).toBeInTheDocument()
    expect(screen.getAllByText('テスト書類')).toHaveLength(2) // アイコン内とキャプション
  })

  /**
   * blueバリアントのスタイル適用テスト
   * @description blue色のバリアントが適用された際の背景色とテキスト色を検証
   */
  it('blueバリアントが正しく適用される', () => {
    const { container } = render(
      <DocumentCard
        title="ブルー書類"
        subtitle="サブタイトル"
        documentName="運転免許証"
        variant="blue"
      />
    )

    const documentArea = container.querySelector('.bg-blue-100')
    expect(documentArea).toBeInTheDocument()

    const iconArea = container.querySelector('.bg-blue-200')
    expect(iconArea).toBeInTheDocument()

    const documentText = container.querySelector('.text-blue-600')
    expect(documentText).toBeInTheDocument()
  })

  /**
   * greenバリアントのスタイル適用テスト
   * @description green色のバリアントが適用された際の背景色とテキスト色を検証
   */
  it('greenバリアントが正しく適用される', () => {
    const { container } = render(
      <DocumentCard
        title="グリーン書類"
        subtitle="サブタイトル"
        documentName="マイナンバーカード"
        variant="green"
      />
    )

    const documentArea = container.querySelector('.bg-green-100')
    expect(documentArea).toBeInTheDocument()

    const iconArea = container.querySelector('.bg-green-200')
    expect(iconArea).toBeInTheDocument()

    const documentText = container.querySelector('.text-green-600')
    expect(documentText).toBeInTheDocument()
  })

  /**
   * orangeバリアントのスタイル適用テスト
   * @description orange色のバリアントが適用された際の背景色とテキスト色を検証
   */
  it('orangeバリアントが正しく適用される', () => {
    const { container } = render(
      <DocumentCard
        title="オレンジ書類"
        subtitle="サブタイトル"
        documentName="パスポート"
        variant="orange"
      />
    )

    const documentArea = container.querySelector('.bg-orange-100')
    expect(documentArea).toBeInTheDocument()

    const iconArea = container.querySelector('.bg-orange-200')
    expect(iconArea).toBeInTheDocument()

    const documentText = container.querySelector('.text-orange-600')
    expect(documentText).toBeInTheDocument()
  })

  /**
   * カスタムクラス名の適用テスト
   * @description 外部から渡されたclassNameプロパティが正しく適用されることを確認
   */
  it('カスタムclassNameが正しく適用される', () => {
    const { container } = render(
      <DocumentCard
        title="テスト"
        subtitle="サブタイトル"
        documentName="書類"
        variant="blue"
        className="custom-document-class"
      />
    )

    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).toHaveClass('custom-document-class')
  })

  /**
   * テキスト中央揃えの表示テスト
   * @description タイトルとサブタイトルが中央揃えのスタイルで表示されることを確認
   */
  it('タイトルとサブタイトルが中央揃えで表示される', () => {
    render(
      <DocumentCard
        title="中央揃えタイトル"
        subtitle="中央揃えサブタイトル"
        documentName="書類名"
        variant="blue"
      />
    )

    const titleElement = screen.getByText('中央揃えタイトル')
    expect(titleElement).toHaveClass('text-center')

    const subtitleElement = screen.getByText('中央揃えサブタイトル')
    expect(subtitleElement).toHaveClass('text-center')
  })

  /**
   * 書類名の重複表示テスト
   * @description 書類名がアイコンエリア内とキャプション部分の両方に正しく表示されることを確認
   */
  it('書類名がアイコンエリアとキャプションの両方に表示される', () => {
    render(
      <DocumentCard
        title="書類カード"
        subtitle="サブタイトル"
        documentName="重要書類"
        variant="green"
      />
    )

    const documentNameElements = screen.getAllByText('重要書類')
    expect(documentNameElements).toHaveLength(2)

    expect(documentNameElements[0]).toHaveClass('text-green-600')

    expect(documentNameElements[1]).toHaveClass('text-green-700')
  })

  /**
   * アイコンエリアのサイズとレイアウトテスト
   * @description アイコンエリアが指定されたサイズとレイアウトクラスで表示されることを確認
   */
  it('アイコンエリアが正しいサイズで表示される', () => {
    const { container } = render(
      <DocumentCard
        title="サイズテスト"
        subtitle="サブタイトル"
        documentName="書類"
        variant="blue"
      />
    )

    const iconArea = container.querySelector('.h-24')
    expect(iconArea).toBeInTheDocument()
    expect(iconArea).toHaveClass('w-full', 'rounded', 'flex', 'items-center', 'justify-center')
  })
})
