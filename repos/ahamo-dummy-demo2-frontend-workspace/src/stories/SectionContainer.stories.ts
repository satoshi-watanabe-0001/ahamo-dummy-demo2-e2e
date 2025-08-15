import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SectionContainer } from '../components/ui/SectionContainer'

const meta: Meta<typeof SectionContainer> = {
  title: 'Layout/SectionContainer',
  component: SectionContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'main', 'nav'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a default container with standard padding and centering.',
  },
}

export const AsSection: Story = {
  args: {
    as: 'section',
    children: 'This is rendered as a <section> element.',
  },
}

export const AsMain: Story = {
  args: {
    as: 'main',
    children: 'This is rendered as a <main> element.',
  },
}

export const AsNav: Story = {
  args: {
    as: 'nav',
    children: 'This is rendered as a <nav> element.',
  },
}

export const WithCustomClass: Story = {
  args: {
    className: 'py-16 bg-gray-100',
    children: 'Container with custom padding and background.',
  },
}

export const WithComplexContent: Story = {
  args: {
    children:
      'Complex content with multiple elements including headings, paragraphs, and grid layouts.',
  },
}
