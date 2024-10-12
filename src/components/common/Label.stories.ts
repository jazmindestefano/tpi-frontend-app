import {Meta, StoryObj} from "@storybook/react";
import {Label} from "./Label.tsx";

const meta = {
  title: "Common/Label",
  component: Label
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Nombre'
  }
};
