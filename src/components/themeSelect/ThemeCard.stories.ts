import {ThemeCard} from "./ThemeCard.tsx";
import {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "ThemeSelect/ThemeCard",
  component: ThemeCard,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs']
} satisfies Meta<typeof ThemeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: {
      id: 1,
      name: 'example',
      image: ''
    },
    onCardClick: () => {}
  }
};
