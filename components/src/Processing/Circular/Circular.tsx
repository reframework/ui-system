import React from "react";
import styles from "./Circular.css?module";

type Props = {
  className?: string;
  color?: "string";
  spinning: boolean;
  size?: number;
  paused?: boolean;
  strokeWidth?: number;
};

const CircularLoader = ({
  color,
  strokeWidth = 2,
  size = 56,
  paused,
}: Props) => {
  return (
    <div className={styles.loader}>
      <span></span>
    </div>
  );
};

export default CircularLoader;
