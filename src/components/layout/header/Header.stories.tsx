import {Meta, StoryObj} from "@storybook/react";
import Header from './Header'
import {reactRouterParameters, withRouter} from "storybook-addon-remix-react-router";

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter],
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/perfil'
      }
    })
  }
};

