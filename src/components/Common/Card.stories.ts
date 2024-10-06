import {Meta, StoryObj} from "@storybook/react";
import Card from "./Card.tsx";

const meta = {
  title: 'Common/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
