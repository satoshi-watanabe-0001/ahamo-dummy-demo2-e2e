import React from 'react'
import { render, screen } from '@testing-library/react'
import { CarrierSelection } from '../CarrierSelection'

/**
 * CarrierSelectionコンポーネントのテストスイート
 * @description キャリア選択コンポーネントの表示と選択機能を検証
 */
describe('CarrierSelection', () => {
  /**
   * キャリア選択コンポーネントの正常なレンダリングを検証
   * @description キャリア選択オプションが適切に表示されることを確認
   */
  it('renders carrier selection correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<CarrierSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('現在のキャリアを選択してください')).toBeInTheDocument()
  })

  /**
   * キャリアオプションの表示を検証
   * @description docomoとdocomo以外のオプションが正しく表示されることを確認
   */
  it('displays carrier options correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<CarrierSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('docomo')).toBeInTheDocument()
    expect(screen.getByText('docomo以外')).toBeInTheDocument()
  })
})
