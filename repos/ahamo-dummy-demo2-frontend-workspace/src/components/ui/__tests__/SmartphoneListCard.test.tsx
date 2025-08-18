import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SmartphoneListCard } from '../SmartphoneListCard'
import { mockSmartphones } from '../../../lib/mockData'

const mockSmartphone = mockSmartphones[0]

/**
 * SmartphoneListCardコンポーネントのテストスイート
 * @description リスト表示用のスマートフォンカードコンポーネントの動作を検証
 */
describe('SmartphoneListCard', () => {
  /**
   * スマートフォン情報の正常表示テスト
   * @description 名前、価格、画像が正しく表示されることを確認
   */
  it('renders smartphone information correctly', () => {
    render(<SmartphoneListCard smartphone={mockSmartphone} />)

    expect(screen.getByText(mockSmartphone.name)).toBeInTheDocument()
    expect(screen.getByText(mockSmartphone.price)).toBeInTheDocument()
    expect(screen.getByAltText(mockSmartphone.name)).toBeInTheDocument()
  })

  /**
   * セールラベル表示テスト
   * @description セール情報が存在する場合にセールラベルが表示されることを確認
   */
  it('displays sale label when present', () => {
    const smartphoneWithSale = {
      ...mockSmartphone,
      saleLabel: 'セール中',
    }

    render(<SmartphoneListCard smartphone={smartphoneWithSale} />)
    expect(screen.getByText('セール中')).toBeInTheDocument()
  })

  /**
   * セールラベル非表示テスト
   * @description セール情報が存在しない場合にセールラベルが表示されないことを確認
   */
  it('does not display sale label when not present', () => {
    const smartphoneWithoutSale = {
      ...mockSmartphone,
      saleLabel: undefined,
    }

    render(<SmartphoneListCard smartphone={smartphoneWithoutSale} />)
    expect(screen.queryByText('セール中')).not.toBeInTheDocument()
  })

  /**
   * カラーオプション表示テスト
   * @description カラーオプションが利用可能な場合に色選択ボタンが表示されることを確認
   */
  it('renders color options when available', () => {
    const smartphoneWithColors = {
      ...mockSmartphone,
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
      ],
    }

    render(<SmartphoneListCard smartphone={smartphoneWithColors} />)

    const colorButtons = screen.getAllByRole('button', { name: /ブラック|ホワイト/ })
    expect(colorButtons).toHaveLength(2)
  })

  /**
   * カラー選択機能テスト
   * @description カラーボタンクリック時に選択状態が正しく反映されることを確認
   */
  it('handles color selection', () => {
    const smartphoneWithColors = {
      ...mockSmartphone,
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
      ],
    }

    render(<SmartphoneListCard smartphone={smartphoneWithColors} />)

    const colorButtons = screen.getAllByRole('button', { name: /ブラック|ホワイト/ })
    const secondColorButton = colorButtons[1]

    fireEvent.click(secondColorButton)

    expect(secondColorButton).toHaveClass('border-blue-500')
  })

  /**
   * 機能リスト制限表示テスト
   * @description 機能リストが最大2つまでに制限されて表示されることを確認
   */
  it('renders features list (limited to 2)', () => {
    const smartphoneWithManyFeatures = {
      ...mockSmartphone,
      features: ['機能1', '機能2', '機能3', '機能4'],
    }

    render(<SmartphoneListCard smartphone={smartphoneWithManyFeatures} />)

    expect(screen.getByText('機能1')).toBeInTheDocument()
    expect(screen.getByText('機能2')).toBeInTheDocument()
    expect(screen.queryByText('機能3')).not.toBeInTheDocument()
  })

  /**
   * 説明文表示テスト
   * @description 説明文が存在する場合に正しく表示されることを確認
   */
  it('renders description when present', () => {
    const smartphoneWithDescription = {
      ...mockSmartphone,
      description: 'テスト用の説明文',
    }

    render(<SmartphoneListCard smartphone={smartphoneWithDescription} />)
    expect(screen.getByText('テスト用の説明文')).toBeInTheDocument()
  })

  /**
   * カスタムクラス適用テスト
   * @description カスタムCSSクラスが正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(
      <SmartphoneListCard smartphone={mockSmartphone} className="custom-class" />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * アクションボタン表示テスト
   * @description 詳細表示ボタンが正しく表示されることを確認
   */
  it('renders action button', () => {
    render(<SmartphoneListCard smartphone={mockSmartphone} />)

    const actionButton = screen.getByRole('button', { name: '詳細を見る' })
    expect(actionButton).toBeInTheDocument()
    expect(actionButton).toHaveClass('bg-blue-600')
  })

  it('has proper accessibility attributes', () => {
    render(<SmartphoneListCard smartphone={mockSmartphone} />)

    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('aria-label', `${mockSmartphone.name}の詳細`)

    const actionButton = screen.getByRole('button', { name: '詳細を見る' })
    expect(actionButton).toBeInTheDocument()
  })

  it('uses horizontal layout structure', () => {
    const { container } = render(<SmartphoneListCard smartphone={mockSmartphone} />)

    const cardElement = container.firstChild as HTMLElement
    expect(cardElement).toHaveClass('bg-white', 'rounded-2xl', 'p-6')

    const flexContainer = cardElement.querySelector('.flex.items-center.space-x-4')
    expect(flexContainer).toBeInTheDocument()
  })

  it('handles keyboard navigation for color selection', () => {
    const smartphoneWithColors = {
      ...mockSmartphone,
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
      ],
    }

    render(<SmartphoneListCard smartphone={smartphoneWithColors} />)

    const colorButtons = screen.getAllByRole('button', { name: /ブラック|ホワイト/ })
    const firstColorButton = colorButtons[0]

    fireEvent.keyDown(firstColorButton, { key: 'Enter' })
    expect(firstColorButton).toHaveClass('border-blue-500')

    fireEvent.keyDown(firstColorButton, { key: ' ' })
    expect(firstColorButton).toHaveClass('border-blue-500')
  })
})
