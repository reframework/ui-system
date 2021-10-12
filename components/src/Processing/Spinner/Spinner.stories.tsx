import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Spinner from "./Spinner";

export default {
  title: "Processing/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = ({ size, color }) => <Spinner size={size} color={color} />;

export const Blue = Template.bind({});

Blue.args = {
  size: 100,
  color: "blue",
};
