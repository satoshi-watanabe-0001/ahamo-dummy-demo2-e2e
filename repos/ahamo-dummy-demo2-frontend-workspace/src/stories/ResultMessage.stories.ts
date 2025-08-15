import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ResultMessage } from '../components/forms/ResultMessage'

const meta: Meta<typeof ResultMessage> = {
  title: 'Forms/ResultMessage',
  component: ResultMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'お申し込みが完了しました。ご利用ありがとうございます。',
  },
}

export const LongMessage: Story = {
  args: {
    message:
      'お申し込みありがとうございます。お客様の情報を確認し、SIMカードを発送いたします。通常3-5営業日でお届けします。',
  },
}

export const ShortMessage: Story = {
  args: {
    message: '完了',
  },
}

export const EmptyMessage: Story = {
  args: {
    message: '',
  },
}

export const WithLineBreaks: Story = {
  args: {
    message:
      'お申し込みが完了しました。\n\nSIMカードは3-5営業日でお届けします。\n\nご不明な点がございましたらサポートまでお問い合わせください。',
  },
}
