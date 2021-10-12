import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TypographyComponent from "./Typography";

export default {
  title: "Typography/Typography",
  component: TypographyComponent,
  argTypes: {
    align: {
      options: ["left", "center", "right"],
      control: { type: "select" },
    },
    component: {
      options: [
        "a",
        "button",
        "em",
        "h1",
        "h2",
        "h3",
        "p",
        "pre",
        "small",
        "span",
        "strong",
      ],
      control: { type: "select" },
    },
    font: {
      options: ["primary", "secondary", "monospace", "italic"],
      control: { type: "select" },
    },
    size: {
      options: ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"],
      control: { type: "select" },
    },
    variant: {
      options: [
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "neutral",
      ],
      control: { type: "select" },
    },
    weight: {
      options: [
        "thin",
        "light",
        "regular",
        "medium",
        "semibold",
        "bold",
        "black",
      ],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof TypographyComponent>;

const Template: ComponentStory<typeof TypographyComponent> = ({
  children,
  ...props
}) => (
  <div style={{ width: "100%" }}>
    <TypographyComponent {...props} children={children} />
  </div>
);

export const Typography = Template.bind({});

Typography.args = {
  children: "Typography",
  component: "p",
  align: "left",
  ellipsis: false,
  font: "primary",
  nowrap: false,
  size: "m",
  underline: false,
  uppercase: false,
  variant: "primary",
  weight: "regular",
  stretch: false,
};
