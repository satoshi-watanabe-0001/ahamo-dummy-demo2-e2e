import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { OptionSelector } from '../OptionSelector'

const mockOptions = [
  {
    id: 'plan1',
    title: '20GB',
    description: 'データ通信量20GB',
    price: '2,970',
  },
  {
    id: 'plan2',
    title: '100GB',
    description: 'データ通信量100GB',
    price: '4,950',
  },
]

/**
 * OptionSelectorコンポーネントのテストスイート
 * @description オプション選択コンポーネントの表示、選択状態、イベント処理を検証
 */
describe('OptionSelector', () => {
  const mockOnOptionSelect = jest.fn()

  beforeEach(() => {
    mockOnOptionSelect.mockClear()
  })

  /**
   * タイトルとオプションが正しく表示されることを検証
   * @description コンポーネントにタイトルとオプションリストが適切にレンダリングされることを確認
   */
  it('renders title and options correctly', () => {
    render(
      <OptionSelector
        title="データ通信量"
        options={mockOptions}
        selectedOption="plan1"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    expect(screen.getByText('データ通信量')).toBeInTheDocument()
    expect(screen.getByText('20GB')).toBeInTheDocument()
    expect(screen.getByText('100GB')).toBeInTheDocument()
    expect(screen.getByText('データ通信量20GB')).toBeInTheDocument()
    expect(screen.getByText('データ通信量100GB')).toBeInTheDocument()
  })

  /**
   * 選択されたオプションがハイライト表示されることを検証
   * @description 選択状態のオプションに適切なスタイルクラスが適用されることを確認
   */
  it('highlights selected option', () => {
    render(
      <OptionSelector
        title="データ通信量"
        options={mockOptions}
        selectedOption="plan1"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    const selectedButton = screen.getByRole('button', { name: /20GB/ })
    expect(selectedButton).toHaveClass('border-orange-500')
    expect(selectedButton).toHaveClass('bg-gradient-to-br')
  })

  /**
   * オプションクリック時にコールバック関数が呼び出されることを検証
   * @description オプション選択時に正しいIDでonOptionSelectが実行されることを確認
   */
  it('calls onOptionSelect when option is clicked', () => {
    render(
      <OptionSelector
        title="データ通信量"
        options={mockOptions}
        selectedOption="plan1"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    const secondOption = screen.getByRole('button', { name: /100GB/ })
    fireEvent.click(secondOption)

    expect(mockOnOptionSelect).toHaveBeenCalledWith('plan2')
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description propsで渡されたclassNameがコンポーネントに正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(
      <OptionSelector
        title="Test"
        options={mockOptions}
        selectedOption=""
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
      <OptionSelector
        title="Empty"
        options={[]}
        selectedOption=""
        onOptionSelect={mockOnOptionSelect}
      />
    )

    expect(screen.getByText('Empty')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  /**
   * 選択オプションがnullの場合の表示状態を検証
   * @description selectedOptionがnullの時にどのオプションもハイライトされないことを確認
   */
  it('shows no selection when selectedOption is null', () => {
    render(
      <OptionSelector
        title="データ通信量"
        options={mockOptions}
        selectedOption={null}
        onOptionSelect={mockOnOptionSelect}
      />
    )

    const firstButton = screen.getByRole('button', { name: /20GB/ })
    const secondButton = screen.getByRole('button', { name: /100GB/ })

    expect(firstButton).not.toHaveClass('border-orange-500')
    expect(secondButton).not.toHaveClass('border-orange-500')
  })

  /**
   * 価格情報が表示されないことを検証
   * @description オプションのタイトルと説明は表示されるが、価格情報は表示されないことを確認
   */
  it('renders options without displaying price information', () => {
    render(
      <OptionSelector
        title="データ通信量"
        options={mockOptions}
        selectedOption="plan1"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    expect(screen.queryByText('2,970')).not.toBeInTheDocument()
    expect(screen.queryByText('4,950')).not.toBeInTheDocument()
    expect(screen.getByText('20GB')).toBeInTheDocument()
    expect(screen.getByText('100GB')).toBeInTheDocument()
  })

  /**
   * SelectionStepコンポーネントに正しいタイトルが渡されることを検証
   * @description 内部のSelectionStepコンポーネントに指定されたタイトルが正しく表示されることを確認
   */
  it('renders SelectionStep with correct title', () => {
    render(
      <OptionSelector
        title="ボイスオプション"
        options={mockOptions}
        selectedOption="plan1"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    expect(screen.getByText('ボイスオプション')).toBeInTheDocument()
  })

  it('handles click events correctly', () => {
    render(
      <OptionSelector
        title="データ通信量"
        options={mockOptions}
        selectedOption="plan1"
        onOptionSelect={mockOnOptionSelect}
      />
    )

    const secondOption = screen.getByRole('button', { name: /100GB/ })
    fireEvent.click(secondOption)

    expect(mockOnOptionSelect).toHaveBeenCalledWith('plan2')
  })
})
