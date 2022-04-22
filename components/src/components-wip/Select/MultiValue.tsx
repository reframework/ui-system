import React from 'react';
import './MultiValue.css';

enum MultiValueClassNames {
  button = 'ref:select-multi-value-button',
  label = 'ref:select-multi-value-label',
  multiValue = 'ref:select-multi-value',
}

export interface MultiValueProps {
  onClose: () => void;
  label: string;
}

export const MultiValue: React.FC<MultiValueProps> = ({ onClose, label }) => {
  return (
    <div className={MultiValueClassNames.multiValue}>
      <div className={MultiValueClassNames.label}>{label}</div>
      <button className={MultiValueClassNames.button} onClick={onClose}>
        ✖️
      </button>
    </div>
  );
};
