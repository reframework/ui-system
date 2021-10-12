import React from "react";
export interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  variant?: "contained" | "outlined" | "text" | string;
  disabled?: boolean;
  shape?: "circle" | "square";
  size?: "small" | "medium" | "large";
}

type Props = React.HTMLAttributes<HTMLButtonElement> & ButtonProps;

const Button = ({ children, size, shape, disabled, variant, color }: Props) => {
  return <button>{children}</button>;
};

export default Button;
