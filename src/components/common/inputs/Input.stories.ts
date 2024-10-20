import { Input } from './Input.tsx'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'test'
  }
}
