/* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */

import React from 'react';
import { getClassName } from '@reframework/classnames';
import { Popover } from '@components/Popover';
import { useAutoFocus } from '@utils/index';
import styles from './Select.css?module';
import { defaultGetOptionLabel } from './utils';
import useCombobox from './useCombobox';
import { SelectProps } from './types';
import ListBox from './ListBox';

const Select = ({
  ariaLabel,
  ariaLabelledBy,
  autoFocus,
  matchWidth = true,
  getOptionLabel = defaultGetOptionLabel,
  id,
  listBoxId,
  notFoundContent,
  onBlur,
  openOnFocus,
  PaperProps,
  placeholder,
  PopoverProps,
  renderOption,
  placement = 'bottom-start',
  tabIndex,
  // to autocomplete
  // filterSelectedOptions = true,
  ...useComboboxProps
}: SelectProps) => {
  const {
    activeDescendant,
    disabled,
    hasValue,
    onClick,
    onKeyDown,
    onClickAway,
    onFocus,
    open,
    options,
    value,
  } = useCombobox(useComboboxProps);

  /**
   * Ref of the combobox (input/select container)
   */
  const comboboxRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * Autofocus
   */
  useAutoFocus(!!autoFocus, comboboxRef.current);

  const className = getClassName({
    [styles.combobox]: true,
    [styles.placeholder]: hasValue,
    [styles.disabled]: disabled,
  });

  return (
    <div>
      <div
        aria-activedescendant={activeDescendant}
        aria-autocomplete="none"
        aria-controls={listBoxId}
        aria-disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-owns={listBoxId}
        aria-placeholder={value ? undefined : placeholder}
        className={className}
        id={id}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        ref={comboboxRef}
        role="combobox"
        tabIndex={tabIndex || 0}
      >
        {value || placeholder}
      </div>
      <Popover
        placement={placement}
        {...PopoverProps}
        originElement={comboboxRef.current}
        matchWidth={matchWidth}
        onClickAway={onClickAway}
        open={open}
      >
        <ListBox
          PaperProps={PaperProps}
          options={options}
          renderOption={renderOption}
          getOptionLabel={getOptionLabel}
          id={listBoxId}
        />
      </Popover>
    </div>
  );
};

export default Select;
