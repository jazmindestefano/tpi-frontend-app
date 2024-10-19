import {Meta, StoryObj} from "@storybook/react";
import {FeedbackModalContent} from "./FeedbackModalContent.tsx";

const meta = {
  title: "Modals/FeedbackModalContent",
  component: FeedbackModalContent,
  tags: ["autodocs", "modal"],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FeedbackModalContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onModalClose: () => {},
    onRatingClick: (n: number) => n,
    isPending: false,
    isSuccess: true,
    error: null,
  }
};
