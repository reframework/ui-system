import React from 'react';
import Popover from '../../Messaging/Popover/Popover';
import styles from './Select.css?module';
import { getClassName } from '@reframework/classnames';
import { defaultGetOptionLabel } from './utils';
import useCombobox from './useCombobox';
import { SelectProps } from './types';
import ListBox from './ListBox';
import { useAutoFocus } from '../../utils';

const Select = ({
  ariaLabel,
  ariaLabelledBy,
  autoFocus,
  dropdownMatchSelectWidth = true,
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
   * Ref
   */
  const comboboxRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * Autofocus
   */
  useAutoFocus(!!autoFocus, comboboxRef.current);

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
        aria-placeholder={value ? undefined : placeholder}
        aria-owns={listBoxId}
        className={getClassName({
          [styles.combobox]: true,
          [styles.placeholder]: hasValue,
          [styles.disabled]: disabled,
        })}
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
        placement="start-after"
        {...PopoverProps}
        anchorEl={comboboxRef.current}
        anchorWidth={dropdownMatchSelectWidth}
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
