import React from 'react';
import './Circular.css';

enum LoaderClassName {
  svg = 'ref:circular-loader-svg',
  progress = 'ref:circular-loader-progress',
  determined = 'ref:circular-loader-determined',
  undetermined = 'ref:circular-loader-undetermined',
  loader = 'ref:circular-loader',
  background = 'ref:circular-loader-background',
}

export interface CircularProgressProps {
  className?: string;
  color?: 'string';
  progress?: number;
  size?: number;
  thickness?: number;
}

const CircularLoader = ({
  color,
  size = 50,
  thickness = 5,
  progress,
}: CircularProgressProps) => {
  const SIZE = 44;
  let variant = 'undetermined';
  const circleStyle: {
    strokeDasharray?: string;
    strokeDashoffset?: string;
  } = {};

  if (typeof progress === 'number') {
    variant = 'determined';
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    const dashOffset = ((100 - progress) / 100) * circumference;
    circleStyle.strokeDasharray = circumference.toFixed(3);
    circleStyle.strokeDashoffset = dashOffset.toFixed(3);
  }

  return (
    <div
      className={`${LoaderClassName.loader} ${LoaderClassName[variant]}`}
      style={{ width: size, height: size, color }}
    >
      <svg
        className={LoaderClassName.svg}
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <circle
          className={LoaderClassName.background}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          strokeWidth={thickness}
        />
        <circle
          className={LoaderClassName.progress}
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
