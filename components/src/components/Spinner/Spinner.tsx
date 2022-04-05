import React from 'react';
import styles from './Spinner.css?module';

type Props = {
  color?: string;
  size?: number;
};

const SpinnerA = ({ color, size = 50 }: Props) => {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size, color }}
    >
      <svg className={styles.svg} viewBox="0 0 120 120">
        <rect x="55" width="10" height="30" rx="5" />
        <rect
          x="79.5439"
          y="36.6968"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-149.477 79.5439 36.6968)"
        />
        <rect
          x="88.708"
          y="49.9565"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-118.746 88.708 49.9565)"
        />
        <rect
          x="90"
          y="65"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-90 90 65)"
        />
        <rect
          x="83.3027"
          y="79.5435"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-59.4769 83.3027 79.5435)"
        />
        <rect
          x="70.0439"
          y="88.7075"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-28.7456 70.0439 88.7075)"
        />
        <rect x="55" y="90" width="10" height="30" rx="5" />
        <rect
          x="33.834"
          y="114.225"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-149.477 33.834 114.225)"
        />
        <rect
          x="9.79883"
          y="93.2393"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-118.746 9.79883 93.2393)"
        />
        <rect
          y="65"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-90 0 65)"
        />
        <rect
          x="5.77441"
          y="33.8345"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-59.4769 5.77441 33.8345)"
        />
        <rect
          x="26.7607"
          y="9.79932"
          width="10"
          height="30"
          rx="5"
          transform="rotate(-28.7456 26.7607 9.79932)"
        />
      </svg>
    </div>
  );
};

export default SpinnerA;
