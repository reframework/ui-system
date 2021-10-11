import React from "react";
import styles from "./Circular.css?module";

type Props = {
  className?: string;
  color?: "string";
  spinning: boolean;
  size?: "small" | "medium" | "large";
  paused?: boolean;
  strokeWidth?: number;
};

const CircularLoader = ({
  color,
  strokeWidth = 2,
  size = "medium",
  paused,
}: Props) => {
  return (
    <div className={`${styles.loader} ${styles[size]}`}>
      <div className={styles.shadow} />
      <div className={styles.circle} />
    </div>
  );
};

export default CircularLoader;
