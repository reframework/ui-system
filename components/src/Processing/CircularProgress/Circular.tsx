import React from "react";
import styles from "./Circular.css?module";

const SIZE = 44;
type Props = {
  className?: string;
  color?: "string";
  spinning: boolean;
  size?: number;
  value?: number;
  thickness?: number;
};

const CircularLoader = ({
  color,
  size = 50,
  thickness = 5,
  value,
}: Props) => {
  const circleStyle: {
    strokeDasharray?: string;
    strokeDashoffset?: string;
  } = {};

  let variant = "undetermined";

  if (typeof value === "number") {
    variant = "determined";
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    const dashOffset = ((100 - value) / 100) * circumference;
    circleStyle.strokeDasharray = circumference.toFixed(3);
    circleStyle.strokeDashoffset = `${dashOffset.toFixed(3)}px`;
  }

  return (
    <div
      className={`${styles.loader} ${styles[variant]}`}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.svg}
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <circle
          className={styles.background}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          strokeWidth={thickness}
        />
        <circle
          className={styles.progress}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          strokeWidth={thickness}
          style={circleStyle}
        />
      </svg>
    </div>
  );
};

export default CircularLoader;
