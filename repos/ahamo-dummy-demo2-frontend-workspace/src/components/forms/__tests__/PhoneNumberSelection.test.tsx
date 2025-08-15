import React from 'react'
import { render, screen } from '@testing-library/react'
import { PhoneNumberSelection } from '../PhoneNumberSelection'

/**
 * PhoneNumberSelectionコンポーネントのテストスイート
 * @description 電話番号選択コンポーネントの表示と選択機能を検証
 */
describe('PhoneNumberSelection', () => {
  /**
   * 電話番号選択コンポーネントの正常なレンダリングを検証
   * @description 電話番号選択オプションが適切に表示されることを確認
   */
  it('renders phone number selection correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<PhoneNumberSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('電話番号について選択してください')).toBeInTheDocument()
  })

  /**
   * 新規番号取得オプションの表示を検証
   * @description 新規番号取得オプションが正しく表示されることを確認
   */
  it('displays new number option correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<PhoneNumberSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('新しい電話番号を発行する')).toBeInTheDocument()
  })

  /**
   * 番号ポータビリティオプションの表示を検証
   * @description MNP（番号ポータビリティ）オプションが正しく表示されることを確認
   */
  it('displays keep current number option correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<PhoneNumberSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('今の電話番号をそのまま使う')).toBeInTheDocument()
  })
})
