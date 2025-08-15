import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CampaignCarousel } from '../components/ui/CampaignCarousel'
import { mockCampaigns } from '../lib/mockData'

const meta: Meta<typeof CampaignCarousel> = {
  title: 'UI/CampaignCarousel',
  component: CampaignCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    campaigns: mockCampaigns,
  },
}

export const SingleCampaign: Story = {
  args: {
    campaigns: [mockCampaigns[0]],
  },
}

export const TwoCampaigns: Story = {
  args: {
    campaigns: [mockCampaigns[0], mockCampaigns[1]],
  },
}
