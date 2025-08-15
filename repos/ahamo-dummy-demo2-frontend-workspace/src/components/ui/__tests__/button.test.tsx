import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

/**
 * Buttonコンポーネントのテストスイート
 * @description Buttonコンポーネントの基本機能、イベントハンドリング、状態管理を検証
 */
describe('Button コンポーネント', () => {
  /**
   * Buttonコンポーネントが正しくレンダリングされることを検証
   * @description 基本的なボタン要素が適切に表示されることを確認
   */
  it('正しくレンダリングされる', () => {
    render(<Button>クリック</Button>)
    const button = screen.getByRole('button', { name: 'クリック' })
    expect(button).toBeInTheDocument()
  })

  /**
   * クリックイベントが正しく処理されることを検証
   * @description onClickハンドラーがユーザーのクリック操作で適切に呼び出されることを確認
   */
  it('クリック時にonClickが呼び出される', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>クリック</Button>)
    const button = screen.getByRole('button')
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  /**
   * 無効状態のボタンが適切に動作することを検証
   * @description disabledプロパティが設定されたボタンがクリック不可能であることを確認
   */
  it('無効状態では操作できない', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    render(
      <Button disabled onClick={handleClick}>
        無効ボタン
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
