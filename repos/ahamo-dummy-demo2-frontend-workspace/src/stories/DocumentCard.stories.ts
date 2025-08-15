import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DocumentCard } from '../components/ui/DocumentCard'

const meta: Meta<typeof DocumentCard> = {
  title: 'UI/DocumentCard',
  component: DocumentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['blue', 'green', 'orange'],
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
    title: '本人確認書類',
    subtitle: '運転免許証など',
    documentName: '運転免許証',
    variant: 'blue',
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
    title: '支払い情報',
    subtitle: 'クレジットカードなど',
    documentName: 'クレジットカード',
    variant: 'green',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hxezByGnSOKJEJdMdkygU2/無題?node-id=0-1&m=dev&t=y2Ipg0QuxirPgKtR-1',
    },
  },
}

export const OrangeVariant: Story = {
  args: {
    title: 'MNP予約番号',
    subtitle: '他社からの乗り換え',
    documentName: 'MNP予約番号通知書',
    variant: 'orange',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hxezByGnSOKJEJdMdkygU2/無題?node-id=0-1&m=dev&t=y2Ipg0QuxirPgKtR-1',
    },
  },
}

export const LongTitle: Story = {
  args: {
    title: '非常に長いタイトルのドキュメントカード',
    subtitle: '長いサブタイトルも含まれています',
    documentName: '長いドキュメント名の例',
    variant: 'blue',
  },
}

export const WithCustomClass: Story = {
  args: {
    title: '本人確認書類',
    subtitle: '運転免許証など',
    documentName: '運転免許証',
    variant: 'blue',
    className: 'max-w-xs',
  },
}
