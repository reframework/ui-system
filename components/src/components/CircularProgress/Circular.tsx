import React from "react";
import styles from "./Circular.css?module";

type Props = {
  className?: string;
  color?: "string";
  size?: number;
  progress?: number;
  thickness?: number;
};

const CircularLoader = ({
  color,
  size = 50,
  thickness = 5,
  progress,
}: Props) => {
  const SIZE = 44;
  let variant = "undetermined";
  const circleStyle: {
    strokeDasharray?: string;
    strokeDashoffset?: string;
  } = {};

  if (typeof progress === "number") {
    variant = "determined";
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    const dashOffset = ((100 - progress) / 100) * circumference;
    circleStyle.strokeDasharray = circumference.toFixed(3);
    circleStyle.strokeDashoffset = dashOffset.toFixed(3);
  }

  return (
    <div
      className={`${styles.loader} ${styles[variant]}`}
      style={{ width: size, height: size, color }}
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
