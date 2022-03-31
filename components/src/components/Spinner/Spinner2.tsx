import React from 'react';
import styles from './Spinner2.css?module';

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
      <svg className={styles.svg} viewBox="0 0 143 143">
        {/* 1 */}
        <rect x="65" width="13" height="39" rx="6.5" />
        {/* 2 */}
        <rect
          x="117.462"
          y="16.3457"
          width="13"
          height="39"
          rx="6.5"
          transform="rotate(45 117.462 16.3457)"
        />
        {/* 3 */}
        <rect
          x="143"
          y="65"
          width="13"
          height="39"
          rx="6.5"
          transform="rotate(90 143 65)"
        />
        {/* 4 */}
        <rect
          x="126.654"
          y="117.462"
          width="13"
          height="39"
          rx="6.5"
          transform="rotate(135 126.654 117.462)"
        />
        {/* 5 */}
        <rect x="65" y="104" width="13" height="39" rx="6.5" />
        {/* 6 */}
        <rect
          x="43.9229"
          y="89.8848"
          width="13"
          height="39"
          rx="6.5"
          transform="rotate(45 43.9229 89.8848)"
        />
        {/* 7 */}
        <rect
          x="39"
          y="65"
          width="13"
          height="39"
          rx="6.5"
          transform="rotate(90 39 65)"
        />
        {/* 8 */}
        <rect
          x="53.1152"
          y="43.9229"
          width="13"
          height="39"
          rx="6.5"
          transform="rotate(135 53.1152 43.9229)"
        />
      </svg>
    </div>
  );
};

export default SpinnerA;
