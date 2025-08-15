import React from 'react'
import { render, screen } from '@testing-library/react'
import { SmartphoneTypeSelection } from '../SmartphoneTypeSelection'

const mockOptions = [
  {
    id: 'iphone',
    title: 'iPhone',
    description: 'Apple製スマートフォン',
    imageUrl: 'https://example.com/iphone.jpg',
    link: '/smartphones/iphone',
    icon: '📱',
    specialLabel: 'NEW',
  },
  {
    id: 'android',
    title: 'Android',
    description: 'Android搭載スマートフォン',
    imageUrl: 'https://example.com/android.jpg',
    link: '/smartphones/android',
    icon: '🤖',
  },
]

/**
 * SmartphoneTypeSelectionコンポーネントのテストスイート
 * @description スマートフォンタイプ選択コンポーネントの基本的な表示機能を検証
 */
describe('SmartphoneTypeSelection', () => {
  /**
   * スマートフォンタイプ選択コンポーネントの正常なレンダリングを検証
   * @description 必要なプロパティを渡してコンポーネントが適切にレンダリングされることを確認
   */
  it('renders smartphone type selection correctly', () => {
    const mockOnOptionSelect = jest.fn()
    const mockOnBack = jest.fn()

    render(
      <SmartphoneTypeSelection
        options={mockOptions}
        selectedOption={null}
        onOptionSelect={mockOnOptionSelect}
        onBack={mockOnBack}
      />
    )

    expect(screen.getByText('iPhone')).toBeInTheDocument()
    expect(screen.getByText('Android')).toBeInTheDocument()
    expect(screen.getByText('戻る')).toBeInTheDocument()
  })
})
