import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../contact-form'

/**
 * ContactFormコンポーネントのテストスイート
 * @description フォームの基本機能、バリデーション、送信処理の動作を検証
 */
describe('ContactForm コンポーネント', () => {
  /**
   * ContactFormコンポーネントが正しくレンダリングされることを検証
   * @description 名前、メールアドレス、メッセージの入力フィールドと送信ボタンが表示されることを確認
   */
  it('正しくレンダリングされる', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText('名前')).toBeInTheDocument()
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByLabelText('メッセージ')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument()
  })

  /**
   * バリデーションエラーが適切に表示されることを検証
   * @description 必須フィールドが空の状態で送信した際にエラーメッセージが表示されることを確認
   */
  it('バリデーションエラーが表示される', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: '送信' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('名前は必須です')).toBeInTheDocument()
    })
  })

  /**
   * 正しい値でフォームが送信されることを検証
   * @description 全ての必須フィールドに有効な値を入力して送信した際の動作を確認
   */
  it('正しい値でフォームが送信される', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('名前'), 'テストユーザー')
    await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
    await user.type(screen.getByLabelText('メッセージ'), 'これはテストメッセージです')

    const submitButton = screen.getByRole('button', { name: '送信' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '送信中...' })).toBeInTheDocument()
    })
  })
})
