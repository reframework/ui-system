import React from "react";
import styles from "./Typography.css?module";
import clsx from "clsx";
export interface TypographyProps {
  align: "left" | "center" | "right";
  children: React.ReactNode;
  className: string;
  component?:
    | "a"
    | "button"
    | "em"
    | "h1"
    | "h2"
    | "h3"
    | "p"
    | "pre"
    | "small"
    | "span"
    | "strong";
  ellipsis: boolean;
  font: "primary" | "secondary" | "monospace" | "italic";
  nowrap: boolean;
  size: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
  stretch?: boolean;
  underline: boolean;
  uppercase: boolean;
  variant:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "neutral";
  weight:
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "black";
}

const Paragraph = ({
  align = "left",
  children,
  className,
  component: Component = "p" as keyof JSX.IntrinsicElements,
  ellipsis = false,
  font = "primary",
  nowrap = false,
  size = "m",
  stretch = false,
  underline = false,
  uppercase = false,
  variant = "primary",
  weight = "regular",
  ...otherProps
}) => {
  const classNames = clsx(
    styles.typography,
    styles[align],
    styles[`font_${font}`],
    styles[size],
    styles[variant],
    styles[weight],
    {
      [styles.ellipsis]: ellipsis,
      [styles.nowrap]: nowrap,
      [styles.stretch]: stretch,
      [styles.underline]: underline,
      [styles.uppercase]: uppercase,
      [className]: className,
    }
  );

  return (
    <Component {...otherProps} className={classNames}>
      {children}
    </Component>
  );
};

export default Paragraph;
