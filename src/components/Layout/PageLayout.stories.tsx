import {Meta, StoryObj} from "@storybook/react";
import PageLayout from "./PageLayout.tsx";
import {reactRouterOutlet, reactRouterParameters, withRouter} from "storybook-addon-remix-react-router";

const meta = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter],
  tags: ['autodocs'],
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(<div></div>)
    })
  }
};
