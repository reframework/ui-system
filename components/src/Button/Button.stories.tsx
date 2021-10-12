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

export const Default = Template.bind({});

Default.args = {
  primary: true,
  children: "Button",
  props: {},
};
