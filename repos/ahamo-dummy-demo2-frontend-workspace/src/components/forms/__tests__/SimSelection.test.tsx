import React from 'react'
import { render, screen } from '@testing-library/react'
import { SimSelection } from '../SimSelection'

/**
 * SimSelectionコンポーネントのテストスイート
 * @description SIM選択コンポーネントの表示と選択機能を検証
 */
describe('SimSelection', () => {
  /**
   * SIM選択コンポーネントの正常なレンダリングを検証
   * @description SIM選択オプションが適切に表示されることを確認
   */
  it('renders SIM selection correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<SimSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('SIMの種類を選択してください')).toBeInTheDocument()
  })

  /**
   * eSIMオプションの表示を検証
   * @description eSIMオプションが正しく表示されることを確認
   */
  it('displays eSIM option correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<SimSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('eSIM')).toBeInTheDocument()
  })

  /**
   * 物理SIMオプションの表示を検証
   * @description 物理SIMオプションが正しく表示されることを確認
   */
  it('displays physical SIM option correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<SimSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('SIMカード')).toBeInTheDocument()
  })
})
