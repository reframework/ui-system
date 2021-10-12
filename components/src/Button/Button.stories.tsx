import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, ...props }) => (
  <Button {...props} children={children} />
);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Outlined = Template.bind({});
export const Contained = Template.bind({});
export const Text = Template.bind({});
export const Stretch = Template.bind({});
export const Circle = Template.bind({});
export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

Small.args = {
  color: "primary",
  children: "Button",
  disabled: false,
  size: "small",
};

Medium.args = {
  color: "primary",
  children: "Button",
  disabled: false,
  size: "medium",
};

Large.args = {
  color: "primary",
  children: "Button",
  disabled: false,
  size: "large",
};

Primary.args = {
  color: "primary",
  children: "Button",
  disabled: false,
};

Secondary.args = {
  color: "secondary",
  children: "Button",
  disabled: false,
};

Outlined.args = {
  variant: "outlined",
  children: "Button",
  disabled: false,
};

Contained.args = {
  variant: "contained",
  children: "Button",
  disabled: false,
};

Text.args = {
  variant: "text",
  children: "Button",
  disabled: false,
};

Stretch.args = {
  stretch: true,
  children: "Button",
  disabled: false,
};

Circle.args = {
  shape: "circle",
  children: "Button",
  disabled: false,
};
