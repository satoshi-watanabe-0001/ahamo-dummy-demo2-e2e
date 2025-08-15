import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ColorSelector, ColorOption } from '../ColorSelector'

const mockColors: ColorOption[] = [
  { name: 'ブラック', colorCode: '#000000' },
  { name: 'ホワイト', colorCode: '#FFFFFF' },
  { name: 'ブルー', colorCode: '#0000FF' },
]

/**
 * ColorSelectorコンポーネントのテストスイート
 * @description カラー選択コンポーネントの表示、選択、イベント処理の動作を検証
 */
describe('ColorSelector', () => {
  const mockOnColorSelect = jest.fn()

  beforeEach(() => {
    mockOnColorSelect.mockClear()
  })

  /**
   * カラーオプションが正しくレンダリングされることを検証
   * @description カラーラベル、カラー名、ボタン数が適切に表示されることを確認
   */
  it('renders color options correctly', () => {
    render(
      <ColorSelector colors={mockColors} selectedColorIndex={0} onColorSelect={mockOnColorSelect} />
    )

    expect(screen.getByText('カラー')).toBeInTheDocument()
    expect(screen.getByText('ブラック')).toBeInTheDocument()

    const colorButtons = screen.getAllByRole('button')
    expect(colorButtons).toHaveLength(3)
  })

  /**
   * 選択されたカラーがハイライト表示されることを検証
   * @description 選択されたカラーボタンに適切なスタイルクラスが適用されることを確認
   */
  it('highlights selected color', () => {
    render(
      <ColorSelector colors={mockColors} selectedColorIndex={1} onColorSelect={mockOnColorSelect} />
    )

    const selectedButton = screen.getByLabelText('ホワイト')
    expect(selectedButton).toHaveClass('border-blue-600', 'ring-2', 'ring-blue-200')
    expect(screen.getByText('ホワイト')).toBeInTheDocument()
  })

  /**
   * カラーボタンクリック時にonColorSelectが呼び出されることを検証
   * @description カラーボタンクリック時に正しいインデックスでコールバック関数が実行されることを確認
   */
  it('calls onColorSelect when color is clicked', () => {
    render(
      <ColorSelector colors={mockColors} selectedColorIndex={0} onColorSelect={mockOnColorSelect} />
    )

    const blueButton = screen.getByLabelText('ブルー')
    fireEvent.click(blueButton)

    expect(mockOnColorSelect).toHaveBeenCalledWith(2)
  })

  /**
   * 各カラーボタンに正しい背景色が適用されることを検証
   * @description カラーコードに基づいて各ボタンの背景色が正しく設定されることを確認
   */
  it('applies correct background colors', () => {
    render(
      <ColorSelector colors={mockColors} selectedColorIndex={0} onColorSelect={mockOnColorSelect} />
    )

    const blackButton = screen.getByLabelText('ブラック')
    const whiteButton = screen.getByLabelText('ホワイト')
    const blueButton = screen.getByLabelText('ブルー')

    expect(blackButton).toHaveStyle('background-color: #000000')
    expect(whiteButton).toHaveStyle('background-color: #FFFFFF')
    expect(blueButton).toHaveStyle('background-color: #0000FF')
  })

  /**
   * カラーオプションが空配列の場合にnullを返すことを検証
   * @description カラーオプションが提供されない場合にコンポーネントが何も表示しないことを確認
   */
  it('returns null when no colors provided', () => {
    const { container } = render(
      <ColorSelector colors={[]} selectedColorIndex={0} onColorSelect={mockOnColorSelect} />
    )

    expect(container.firstChild).toBeNull()
  })

  /**
   * カラーオプションがundefinedの場合にnullを返すことを検証
   * @description カラーオプションがundefinedの場合にコンポーネントが何も表示しないことを確認
   */
  it('returns null when colors is undefined', () => {
    const { container } = render(
      <ColorSelector colors={undefined!} selectedColorIndex={0} onColorSelect={mockOnColorSelect} />
    )

    expect(container.firstChild).toBeNull()
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description propsで渡されたカスタムクラス名がコンポーネントに正しく適用されることを確認
   */
  it('applies custom className', () => {
    render(
      <ColorSelector
        colors={mockColors}
        selectedColorIndex={0}
        onColorSelect={mockOnColorSelect}
        className="custom-class"
      />
    )

    const container = screen.getByText('カラー').parentElement
    expect(container).toHaveClass('custom-class')
  })
})
