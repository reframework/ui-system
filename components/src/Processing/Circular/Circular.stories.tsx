import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CircularLoader from "./Circular";

export default {
  title: "Processing/CircularLoader",
  component: CircularLoader,
} as ComponentMeta<typeof CircularLoader>;

const Template: ComponentStory<typeof CircularLoader> = () => <CircularLoader />;

export const Default = Template.bind({});

Default.args = {};
