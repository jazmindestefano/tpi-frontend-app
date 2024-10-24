import { Meta, StoryObj } from '@storybook/react'
import { ThemeCard } from './ThemeCard'

const meta = {
  title: 'Common/ThemeCard',
  component: ThemeCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ThemeCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: {
      id: 1,
      name: 'Princesas',
      image: 'themes/letras/Princesas.png'
    },
    onClick: () => alert('Theme clicked!'),
    bgColor: '#ffffff',
    onImageLoad: () => {}
  }
}
