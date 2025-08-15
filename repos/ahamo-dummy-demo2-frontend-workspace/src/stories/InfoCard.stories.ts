import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { InfoCard } from '../components/ui/InfoCard'

const meta: Meta<typeof InfoCard> = {
  title: 'UI/InfoCard',
  component: InfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['blue', 'green', 'purple', 'amber'],
    },
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BlueVariant: Story = {
  args: {
    title: '重要なお知らせ',
    variant: 'blue',
    children: 'こちらは青色のインフォメーションカードです。重要な情報をお知らせします。',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hxezByGnSOKJEJdMdkygU2/無題?node-id=0-1&m=dev&t=y2Ipg0QuxirPgKtR-1',
    },
  },
}

export const GreenVariant: Story = {
  args: {
    title: '成功メッセージ',
    variant: 'green',
    children: 'こちらは緑色のインフォメーションカードです。成功や完了を表示します。',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hxezByGnSOKJEJdMdkygU2/無題?node-id=0-1&m=dev&t=y2Ipg0QuxirPgKtR-1',
    },
  },
}

export const PurpleVariant: Story = {
  args: {
    title: '特別なご案内',
    variant: 'purple',
    children: 'こちらは紫色のインフォメーションカードです。特別な案内を表示します。',
  },
}

export const AmberVariant: Story = {
  args: {
    title: '注意事項',
    variant: 'amber',
    children: 'こちらは黄色のインフォメーションカードです。注意事項や警告を表示します。',
  },
}

export const WithLongContent: Story = {
  args: {
    title: '詳細な説明',
    variant: 'blue',
    children:
      '長いコンテンツを含むインフォメーションカードです。項目1: 重要なポイント、項目2: 注意すべき事項、項目3: 追加の情報。詳細については公式サイトをご確認ください。',
  },
}

export const WithCustomClass: Story = {
  args: {
    title: 'カスタムスタイル',
    variant: 'green',
    children: 'カスタムクラスが適用されたカードです。',
    className: 'max-w-sm shadow-lg',
  },
}
