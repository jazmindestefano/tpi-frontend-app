import {Overlay} from "./Overlay.tsx";
import {Meta, StoryObj} from "@storybook/react";

const meta = {
  title: "Common/Overlay",
  component: Overlay,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    onClose: () => {},
    children:
      <div className="w-[400px] h-[400px] bg-white">
        <h1>Modal Content</h1>
        <p>Modal content goes here</p>
        <button onClick={() => {}}>Close Modal</button>
      </div>
  }
};
