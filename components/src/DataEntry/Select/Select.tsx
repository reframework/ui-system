import React from 'react';
import Popover from '../../Messaging/Popover/Popover';
import styles from './Select.css?module';
import { getClassName } from '@reframework/classnames';
import {
  defaultRenderValue,
  defaultGetOptionLabel,
  useAutoFocus,
} from './utils';
import useSelect from './useSelect';
import { SelectProps } from './types';
import ListBox from './ListBox';

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
  renderValue = defaultRenderValue,
  tabIndex,
  // to autocomplete
  // filterSelectedOptions = true,

  ...useSelectProps
}: SelectProps) => {
  const comboboxRef = React.useRef<HTMLDivElement | null>(null);

  useAutoFocus(!!autoFocus, comboboxRef.current);

  const {
    activeDescendant,
    disabled,
    hasValue,
    onClick,
    onClickAway,
    onFocus,
    open,
    options,
    value,
  } = useSelect(useSelectProps);

  const renderedValue = renderValue(value);

  const comboboxClassName = getClassName({
    [styles.combobox]: true,
    [styles.placeholder]: hasValue,
    [styles.disabled]: disabled,
  });

  return (
    <div>
      <div
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        role="combobox"
        aria-activedescendant={activeDescendant}
        aria-controls={listBoxId}
        aria-disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-placeholder={renderedValue ? undefined : placeholder}
        id={id}
        tabIndex={tabIndex || 0}
        aria-autocomplete="none"
        className={comboboxClassName}
        ref={comboboxRef}
      >
        {renderedValue || placeholder}
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
