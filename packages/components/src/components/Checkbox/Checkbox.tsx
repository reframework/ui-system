import { getClassName } from '@reframework/classnames';
import React from 'react';
import { useControlledState } from '@utils/useControlledState';
import { DOMFocus } from '@utils/focus';
import './Checkbox.css';

enum CheckboxClassName {
  wrapper = 'ref:checkbox-wrapper',
  checkbox = 'ref:checkbox',
}
export interface CheckboxProps {
  autofocus?: boolean;
  checked?: boolean;
  /** */
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  indeterminate?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent) => void;
}

const Checkbox = ({
  autofocus,
  checked,
  defaultChecked,
  disabled,
  id,
  indeterminate = false,
  name,
  onChange,
}: CheckboxProps) => {
  const innerClassName = getClassName({
    [CheckboxClassName.checkbox]: true,
  });

  const checkboxRef = React.useRef<HTMLInputElement>(null);

  const { state: internalChecked, setState: setInternalChecked } =
    useControlledState({
      default: !!defaultChecked,
      controlled: checked,
    });

  React.useEffect(() => {
    if (!checkboxRef.current) return;
    /**
     * Changes indeterminate flag depending on a `indeterminate` prop
     */
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalChecked(event.target.checked);
    onChange?.(event);
  };

  React.useEffect(() => {
    if (autofocus && checkboxRef.current) {
      DOMFocus.set(checkboxRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={CheckboxClassName.wrapper}>
      <input
        checked={internalChecked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={handleChange}
        type="checkbox"
        ref={checkboxRef}
      />
      <span className={innerClassName} aria-hidden="true" />
    </div>
  );
};

export default Checkbox;
