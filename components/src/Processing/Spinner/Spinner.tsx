import React from "react";
import styles from "./Spinner.css?module";

type Props = {
  className?: string;
  color?: "string";
  spinning: boolean;
  size?: number;
  paused?: boolean;
  strokeWidth?: number;
};

const CircularLoader = ({ color }: Props) => {
  return (
    <div className={styles.spinner}>
      <span />
    </div>
  );
};

export default CircularLoader;
