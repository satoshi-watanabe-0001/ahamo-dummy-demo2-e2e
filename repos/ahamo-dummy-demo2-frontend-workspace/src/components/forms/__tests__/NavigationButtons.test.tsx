import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavigationButtons } from '../NavigationButtons'

/**
 * NavigationButtonsコンポーネントのテストスイート
 * @description ナビゲーションボタンコンポーネントの表示と機能を検証
 */
describe('NavigationButtons', () => {
  /**
   * ナビゲーションボタンの正常なレンダリングを検証（フロー未完了時）
   * @description フロー未完了時にサイトトップへ戻るボタンのみが表示されることを確認
   */
  it('renders navigation buttons correctly when flow is incomplete', () => {
    const mockFlowResult = {
      isComplete: false,
      destination: '/next-step',
      message: 'フローが未完了です',
    }

    render(<NavigationButtons flowResult={mockFlowResult} />)

    expect(screen.getByText('サイトトップへ戻る')).toBeInTheDocument()
    expect(screen.queryByText('次へ')).not.toBeInTheDocument()
  })

  /**
   * ナビゲーションボタンの正常なレンダリングを検証（フロー完了時）
   * @description フロー完了時にサイトトップへ戻るボタンと次へボタンが表示されることを確認
   */
  it('renders navigation buttons correctly when flow is complete', () => {
    const mockFlowResult = {
      isComplete: true,
      destination: '/next-step',
      message: 'フローが完了しました',
    }

    render(<NavigationButtons flowResult={mockFlowResult} />)

    expect(screen.getByText('サイトトップへ戻る')).toBeInTheDocument()
    expect(screen.getByText('次へ')).toBeInTheDocument()
  })

  /**
   * レスポンシブレイアウトの適用を検証
   * @description レスポンシブデザインのためのクラスが適用されていることを確認
   */
  it('applies responsive layout classes', () => {
    const mockFlowResult = {
      isComplete: true,
      destination: '/next-step',
      message: 'フローが完了しました',
    }

    const { container } = render(<NavigationButtons flowResult={mockFlowResult} />)

    const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
    expect(buttonContainer).toBeInTheDocument()
  })
})
