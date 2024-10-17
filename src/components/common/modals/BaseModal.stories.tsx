import {Meta, StoryObj} from "@storybook/react";
import {BaseModal} from "./BaseModal.tsx";

const meta = {
  title: "Common/BaseModal",
  component: BaseModal,
  tags: ["autodocs", "modal"],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BaseModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
    title: 'title',
    children: <div>This is inside a modal</div>
  }
};
