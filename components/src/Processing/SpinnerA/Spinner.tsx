import React from "react";
import styles from "./Spinner.css?module";

type Props = {
  className?: string;
  color?: "string";
  spinning: boolean;
  size?: "small" | "medium" | "large";
  paused?: boolean;
  strokeWidth?: number;
};

const SpinnerA = ({ color, size = "medium" }: Props) => {
  return (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SpinnerA;
