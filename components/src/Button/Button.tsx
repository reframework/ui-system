import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  variant?: "contained" | "outlined" | "text" | string;
  disabled?: boolean;
  shape?: "circle" | "round" | "square";
  size?: "small" | "medium" | "large"; // xs, xl
  // TODO: add radius
  radius?: string;
}

type Props = React.HTMLAttributes<HTMLButtonElement> & ButtonProps;

const Button = (props: Props) => {
  const { children, ...buttonProps } = props;
  return <button {...buttonProps}>{children}</button>;
};

export default Button;
