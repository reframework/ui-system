import React from 'react';
import Paper from '../../Containers/Paper/Paper';
import Popover from '../../Messaging/Popover/Popover';
import styles from './Select.css?module';
import Option from './Option';
import { getClassName } from '@reframework/classnames';
import { isFunction, defaultRenderValue, defaultGetOptionLabel } from './utils';
import useSelect from './useSelect';
import { SelectProps } from './types';

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
  onClick,
  onFocus,
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

  const {
    activeDescendant,
    disabled,
    hasValue,
    open,
    options,
    setOpen,
    value,
  } = useSelect(useSelectProps);

  const handleClickAway = (event: Event) => {
    const { onClickAway } = PopoverProps || {};
    if (isFunction(onClickAway)) onClickAway(event);
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (isFunction(onClick)) onClick(event);
    if (!open) setOpen(true);
  };

  console.log(open, 'isOpen');

  const handleFocus = (event: React.SyntheticEvent) => {
    if (isFunction(onFocus)) onFocus(event);
    if (openOnFocus) setOpen(true);
  };

  React.useEffect(() => {
    if (autoFocus) comboboxRef.current?.focus?.();
  }, []);

  const renderedValue = renderValue(value);

  const comboboxClassName = getClassName({
    [styles.combobox]: true,
    [styles.placeholder]: hasValue,
    [styles.disabled]: disabled,
  });

  console.log(options, 'opts');

  return (
    <div>
      <div
        onBlur={onBlur}
        onClick={handleClick}
        onFocus={handleFocus}
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
        onClickAway={handleClickAway}
        open={open}
      >
        <Paper {...PaperProps} role="listbox" tabIndex={-1}>
          {options.map(({ value, label, ...optionProps }) => {
            const option = { value, label };

            if (isFunction(renderOption)) {
              return renderOption(optionProps, option);
            }

            console.log('123');
            return (
              <Option {...optionProps} value={value}>
                {getOptionLabel(option)}
              </Option>
            );
          })}
        </Paper>
      </Popover>
    </div>
  );
};

export default Select;
