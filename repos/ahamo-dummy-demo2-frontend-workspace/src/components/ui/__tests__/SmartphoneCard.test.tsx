import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SmartphoneCard } from '../SmartphoneCard'
import { mockSmartphones } from '../../../lib/mockData'

const mockSmartphone = mockSmartphones[0]

/**
 * SmartphoneCardコンポーネントのテストスイート
 * @description スマートフォンカードコンポーネントの表示、操作、アクセシビリティに関するテストを実行
 */
describe('SmartphoneCard', () => {
  /**
   * スマートフォン情報の正常表示テスト
   * @description 名前、価格、画像が正しく表示されることを確認
   */
  it('renders smartphone information correctly', () => {
    render(<SmartphoneCard smartphone={mockSmartphone} />)

    expect(screen.getByText(mockSmartphone.name)).toBeInTheDocument()
    expect(screen.getByText(mockSmartphone.price)).toBeInTheDocument()
    expect(screen.getByAltText(mockSmartphone.name)).toBeInTheDocument()
  })

  /**
   * セールラベル表示テスト
   * @description saleLabelプロパティが設定されている場合にセールラベルが表示されることを確認
   */
  it('displays sale label when present', () => {
    const smartphoneWithSale = {
      ...mockSmartphone,
      saleLabel: 'セール中',
    }

    render(<SmartphoneCard smartphone={smartphoneWithSale} />)
    expect(screen.getByText('セール中')).toBeInTheDocument()
  })

  /**
   * セールラベル非表示テスト
   * @description saleLabelプロパティが未設定の場合にセールラベルが表示されないことを確認
   */
  it('does not display sale label when not present', () => {
    const smartphoneWithoutSale = {
      ...mockSmartphone,
      saleLabel: undefined,
    }

    render(<SmartphoneCard smartphone={smartphoneWithoutSale} />)
    expect(screen.queryByText('セール中')).not.toBeInTheDocument()
  })

  /**
   * 5Gバッジ表示テスト
   * @description has5Gプロパティがtrueの場合に5Gバッジが表示されることを確認
   */
  it('displays 5G badge when has5G is true', () => {
    const smartphone5G = {
      ...mockSmartphone,
      has5G: true,
    }

    render(<SmartphoneCard smartphone={smartphone5G} />)
    expect(screen.getByText('5G')).toBeInTheDocument()
  })

  /**
   * 5Gバッジ非表示テスト
   * @description has5Gプロパティがfalseの場合に5Gバッジが表示されないことを確認
   */
  it('does not display 5G badge when has5G is false', () => {
    const smartphoneNo5G = {
      ...mockSmartphone,
      has5G: false,
    }

    render(<SmartphoneCard smartphone={smartphoneNo5G} />)
    expect(screen.queryByText('5G')).not.toBeInTheDocument()
  })

  /**
   * カラーオプション表示テスト
   * @description colorOptionsプロパティが設定されている場合にカラー選択ボタンが表示されることを確認
   */
  it('renders color options when available', () => {
    const smartphoneWithColors = {
      ...mockSmartphone,
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
      ],
    }

    render(<SmartphoneCard smartphone={smartphoneWithColors} />)

    const colorButtons = screen.getAllByRole('button', { name: /ブラック|ホワイト/ })
    expect(colorButtons).toHaveLength(2)
  })

  /**
   * カラー選択機能テスト
   * @description カラーボタンをクリックした際に選択状態が正しく反映されることを確認
   */
  it('handles color selection', () => {
    const smartphoneWithColors = {
      ...mockSmartphone,
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
      ],
    }

    render(<SmartphoneCard smartphone={smartphoneWithColors} />)

    const colorButtons = screen.getAllByRole('button', { name: /ブラック|ホワイト/ })
    const secondColorButton = colorButtons[1]

    fireEvent.click(secondColorButton)

    expect(secondColorButton).toHaveClass('border-blue-500')
  })

  /**
   * 機能リスト表示テスト
   * @description スマートフォンの機能一覧が正しく表示されることを確認
   */
  it('renders features list', () => {
    render(<SmartphoneCard smartphone={mockSmartphone} />)

    mockSmartphone.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  /**
   * 説明文表示テスト
   * @description descriptionプロパティが設定されている場合に説明文が表示されることを確認
   */
  it('renders description when present', () => {
    const smartphoneWithDescription = {
      ...mockSmartphone,
      description: 'テスト用の説明文',
    }

    render(<SmartphoneCard smartphone={smartphoneWithDescription} />)
    expect(screen.getByText('テスト用の説明文')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SmartphoneCard smartphone={mockSmartphone} className="custom-class" />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders action button', () => {
    render(<SmartphoneCard smartphone={mockSmartphone} />)

    const actionButton = screen.getByRole('button', { name: '詳細を見る' })
    expect(actionButton).toBeInTheDocument()
    expect(actionButton).toHaveClass('bg-blue-600')
  })

  it('has proper accessibility attributes', () => {
    render(<SmartphoneCard smartphone={mockSmartphone} />)

    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('aria-label', `${mockSmartphone.name}の詳細`)

    const actionButton = screen.getByRole('button', { name: '詳細を見る' })
    expect(actionButton).toBeInTheDocument()
  })
})
