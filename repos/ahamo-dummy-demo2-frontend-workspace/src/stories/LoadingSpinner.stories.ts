import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
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
    spinnerColor: {
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
    message: '読み込み中...',
  },
}

export const IPhoneLoading: Story = {
  args: {
    message: 'iPhoneを読み込み中...',
    backgroundGradient: 'from-purple-100 via-blue-50 to-cyan-100',
    spinnerColor: 'border-blue-600',
  },
}

export const AndroidLoading: Story = {
  args: {
    message: 'Androidを読み込み中...',
    backgroundGradient: 'from-green-100 via-emerald-50 to-teal-100',
    spinnerColor: 'border-green-600',
  },
}

export const CustomGradient: Story = {
  args: {
    message: 'データを処理中...',
    backgroundGradient: 'from-pink-100 via-purple-50 to-indigo-100',
    spinnerColor: 'border-purple-600',
  },
}

export const LongMessage: Story = {
  args: {
    message: '大量のデータを処理しています。しばらくお待ちください...',
    backgroundGradient: 'from-orange-100 via-yellow-50 to-red-100',
    spinnerColor: 'border-orange-600',
  },
}

export const WithCustomClass: Story = {
  args: {
    message: 'カスタムスタイル',
    className: 'min-h-96',
  },
}
