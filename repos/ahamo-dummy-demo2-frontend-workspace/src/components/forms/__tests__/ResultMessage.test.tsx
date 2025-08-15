import React from 'react'
import { render, screen } from '@testing-library/react'
import { ResultMessage } from '../ResultMessage'

/**
 * ResultMessageコンポーネントのテストスイート
 * @description 結果メッセージコンポーネントの表示機能を検証
 */
describe('ResultMessage', () => {
  /**
   * 成功メッセージの表示を検証
   * @description 成功タイプのメッセージが適切に表示されることを確認
   */
  it('renders success message correctly', () => {
    render(<ResultMessage message="処理が完了しました" />)

    expect(screen.getByText('処理が完了しました')).toBeInTheDocument()
  })

  /**
   * エラーメッセージの表示を検証
   * @description エラータイプのメッセージが適切に表示されることを確認
   */
  it('renders error message correctly', () => {
    render(<ResultMessage message="エラーが発生しました" />)

    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
  })

  /**
   * 情報メッセージの表示を検証
   * @description 情報タイプのメッセージが適切に表示されることを確認
   */
  it('renders info message correctly', () => {
    render(<ResultMessage message="情報をお知らせします" />)

    expect(screen.getByText('情報をお知らせします')).toBeInTheDocument()
  })
})
