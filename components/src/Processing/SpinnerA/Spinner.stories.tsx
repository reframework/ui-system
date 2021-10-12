import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Spinner from "./Spinner";

export default {
  title: "Processing/SpinnerA",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = ({ size }) => (
  <Spinner size={size} />
);

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

Small.args = {
  size: "small",
};

Medium.args = {
  size: "medium",
};

Large.args = {
  size: "large",
};
