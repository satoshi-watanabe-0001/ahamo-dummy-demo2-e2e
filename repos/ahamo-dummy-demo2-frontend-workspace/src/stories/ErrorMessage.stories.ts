import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ErrorMessage } from '../components/ui/ErrorMessage'

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
    },
    backgroundGradient: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'ネットワークエラーが発生しました',
  },
}

export const IPhoneError: Story = {
  args: {
    message: 'iPhone情報の取得に失敗しました',
    backgroundGradient: 'from-purple-100 via-blue-50 to-cyan-100',
  },
}

export const AndroidError: Story = {
  args: {
    message: 'Android情報の取得に失敗しました',
    backgroundGradient: 'from-green-100 via-emerald-50 to-teal-100',
  },
}

export const ServerError: Story = {
  args: {
    message: 'サーバーエラー（500）: 内部サーバーエラーが発生しました',
    backgroundGradient: 'from-red-100 via-pink-50 to-rose-100',
  },
}

export const LongErrorMessage: Story = {
  args: {
    message:
      'データベース接続エラー: データベースサーバーに接続できませんでした。ネットワーク接続を確認してから再度お試しください。',
    backgroundGradient: 'from-orange-100 via-yellow-50 to-amber-100',
  },
}

export const WithCustomClass: Story = {
  args: {
    message: 'カスタムスタイルエラー',
    className: 'min-h-96',
  },
}
