import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CircularLoader from "./Circular";

export default {
  title: "Processing/CircularLoader",
  component: CircularLoader,
} as ComponentMeta<typeof CircularLoader>;

const Template: ComponentStory<typeof CircularLoader> = ({ size }) => (
  <CircularLoader size={size} />
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
