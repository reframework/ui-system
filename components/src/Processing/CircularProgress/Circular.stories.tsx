import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CircularProgress from "./Circular";

export default {
  title: "Processing/CircularProgressA",
  component: CircularProgress,
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = ({ size, value }) => (
  <CircularProgress size={size} value={value} />
);

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});
export const Determined = Template.bind({});

Small.args = {
  size: 40,
};

Medium.args = {
  size: 60,
};

Large.args = {
  size: 80,
};

Determined.args = {
  size: 80,
  value: 50,
};
