import { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withRouter],
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "/",
      },
    }),
  },
};

export const Profile: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "/perfil",
      },
    }),
  },
};
