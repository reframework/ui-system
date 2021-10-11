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

const CircularLoader = ({ color, size = "medium" }: Props) => {
  return (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <span />
      {/* <span className={styles.base} /> */}
    </div>
  );
};

export default CircularLoader;
