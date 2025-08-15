import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PaymentOptionSelector, PaymentOption } from '../PaymentOptionSelector'

const mockPaymentOptions: PaymentOption[] = [
  {
    id: '0yen',
    title: '0円',
    subtitle: 'いつでもカエドキプログラム適用時',
    description: 'お客様負担額',
  },
  {
    id: '4872yen',
    title: '4,872円',
    subtitle: '分割払い（24回）',
    description: '月々のお支払い',
  },
]

/**
 * PaymentOptionSelectorコンポーネントのテストスイート
 * @description 支払いオプション選択コンポーネントの表示、選択、イベント処理を検証
 */
describe('PaymentOptionSelector', () => {
  const mockOnOptionSelect = jest.fn()

  beforeEach(() => {
    mockOnOptionSelect.mockClear()
  })

  /**
   * 支払いオプションが正しく表示されることを検証
   * @description タイトル、サブタイトル、説明文が適切にレンダリングされることを確認
   */
  it('renders payment options correctly', () => {
    render(
      <PaymentOptionSelector
        options={mockPaymentOptions}
        selectedOption="0yen"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    expect(screen.getByText('料金プラン')).toBeInTheDocument()
    expect(screen.getByText('0円')).toBeInTheDocument()
    expect(screen.getByText('4,872円')).toBeInTheDocument()
    expect(screen.getByText('いつでもカエドキプログラム適用時')).toBeInTheDocument()
    expect(screen.getByText('分割払い（24回）')).toBeInTheDocument()
  })

  /**
   * 選択されたオプションがハイライト表示されることを検証
   * @description 選択状態のオプションに適切なスタイルクラスが適用されることを確認
   */
  it('highlights selected option', () => {
    render(
      <PaymentOptionSelector
        options={mockPaymentOptions}
        selectedOption="0yen"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    const selectedOption = screen.getByLabelText('0円 いつでもカエドキプログラム適用時')
    expect(selectedOption).toHaveClass('border-blue-600', 'bg-blue-50')
  })

  /**
   * オプションクリック時にコールバック関数が呼び出されることを検証
   * @description オプション選択時に正しいIDでonOptionSelectが実行されることを確認
   */
  it('calls onOptionSelect when option is clicked', () => {
    render(
      <PaymentOptionSelector
        options={mockPaymentOptions}
        selectedOption="0yen"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    const secondOption = screen.getByLabelText('4,872円 分割払い（24回）')
    fireEvent.click(secondOption)

    expect(mockOnOptionSelect).toHaveBeenCalledWith('4872yen')
  })

  /**
   * キーボードナビゲーションが正しく動作することを検証
   * @description EnterキーとSpaceキーでオプション選択が可能であることを確認
   */
  it('handles keyboard navigation', () => {
    render(
      <PaymentOptionSelector
        options={mockPaymentOptions}
        selectedOption="0yen"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    const secondOption = screen.getByLabelText('4,872円 分割払い（24回）')

    fireEvent.keyDown(secondOption, { key: 'Enter' })
    expect(mockOnOptionSelect).toHaveBeenCalledWith('4872yen')

    mockOnOptionSelect.mockClear()

    fireEvent.keyDown(secondOption, { key: ' ' })
    expect(mockOnOptionSelect).toHaveBeenCalledWith('4872yen')
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description propsで渡されたclassNameが適切にコンポーネントに適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(
      <PaymentOptionSelector
        options={mockPaymentOptions}
        selectedOption="0yen"
        onOptionSelect={mockOnOptionSelect}
        className="custom-class"
      />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * オプションが空の場合の表示状態を検証
   * @description オプション配列が空の時にタイトルのみ表示され、ボタンが表示されないことを確認
   */
  it('renders empty state when no options provided', () => {
    render(
      <PaymentOptionSelector options={[]} selectedOption="" onOptionSelect={mockOnOptionSelect} />
    )

    expect(screen.getByText('料金プラン')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
