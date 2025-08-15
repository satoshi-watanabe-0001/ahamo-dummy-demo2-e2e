import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { GradientButton } from '../components/ui/GradientButton'

const meta: Meta<typeof GradientButton> = {
  title: 'UI/GradientButton',
  component: GradientButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hxezByGnSOKJEJdMdkygU2/無題?node-id=0-1&m=dev&t=y2Ipg0QuxirPgKtR-1',
    },
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hxezByGnSOKJEJdMdkygU2/無題?node-id=0-1&m=dev&t=y2Ipg0QuxirPgKtR-1',
    },
  },
}

export const CustomClass: Story = {
  args: {
    children: 'Custom Styled',
    className: 'rounded-full shadow-2xl',
  },
}

export const WithEmoji: Story = {
  args: {
    children: '今すぐ申し込み 🚀',
    size: 'lg',
  },
}
