import React from 'react'
import { render, screen } from '@testing-library/react'
import { DeviceSelection } from '../DeviceSelection'

/**
 * DeviceSelectionコンポーネントのテストスイート
 * @description デバイス選択コンポーネントの表示と選択機能を検証
 */
describe('DeviceSelection', () => {
  /**
   * デバイス選択コンポーネントの正常なレンダリングを検証
   * @description デバイス選択オプションが適切に表示されることを確認
   */
  it('renders device selection correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<DeviceSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('スマートフォンについて選択してください')).toBeInTheDocument()
  })

  /**
   * スマートフォン購入オプションの表示を検証
   * @description スマートフォンを一緒に買うオプションが正しく表示されることを確認
   */
  it('displays smartphone purchase option correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<DeviceSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('スマートフォンを一緒に買う')).toBeInTheDocument()
  })

  /**
   * SIMのみ購入オプションの表示を検証
   * @description SIMのみ購入オプションが正しく表示されることを確認
   */
  it('displays SIM only option correctly', () => {
    const mockOnOptionChange = jest.fn()
    render(<DeviceSelection selectedOption={null} onOptionChange={mockOnOptionChange} />)

    expect(screen.getByText('スマートフォンは買わない')).toBeInTheDocument()
  })
})
