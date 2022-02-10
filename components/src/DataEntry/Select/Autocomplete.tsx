import React from 'react';
import Paper from '../../Containers/Paper/Paper';
import Popover from '../../Messaging/Popover/Popover';
import styles from './Select.css?module';
import Option from './Option';
import { getClassName } from '@reframework/classnames';
import {
  isFunction,
  defaultRenderValue,
  defaultGetOptionLabel,
  useControlledState,
  defaultMatch,
} from './utils';
import useSelect from './useSelect';
import { AutocompleteProps } from './types';
import Input, { InputRef } from '../Input/Input';

const Autocomplete = ({
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
  InputProps,
  renderOption,
  renderValue = defaultRenderValue,
  tabIndex,
  // to autocomplete
  filterSelectedOptions = true,
  inputValue: $inputValue,
  onInputChange,
  includeInputInList,
  renderInput,
  readOnly,
  options: $options,
  // defaultInputValue = '',
  // openOnMatchingValue: string | Regexp
  // skip multiple
  match = defaultMatch,
  multiple: _,
  ...useSelectProps
}: AutocompleteProps) => {
  const comboboxRef = React.useRef<InputRef | null>(null);

  const [matchingOptions, setMatchingOptions] = React.useState($options);

  const {
    activeDescendant,
    disabled,
    setValue,
    open,
    options,
    setOpen,
    value,
  } = useSelect({
    ...useSelectProps,
    options: matchingOptions,
  });

  // todo:
  const [inputValue, setInputValue] = useControlledState({
    controlled: $inputValue,
    default: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isFunction(onInputChange)) onInputChange(event);
    if (!open) setOpen(true);
    if (!inputValue?.trim()) return setInputValue(event.target.value);
    setValue(event.target.value);
  };

  const handleClickAway = (event: Event) => {
    const { onClickAway } = PopoverProps || {};
    if (isFunction(onClickAway)) onClickAway(event);
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (isFunction(onClick)) onClick(event);
    if (!open) setOpen(true);
  };

  const handleFocus = (event: React.SyntheticEvent) => {
    if (isFunction(onFocus)) onFocus(event);
    if (openOnFocus) setOpen(true);
  };

  React.useEffect(() => {
    if (autoFocus) comboboxRef.current?.focus?.();
  }, []);

  React.useEffect(() => {
    if (!isFunction(match)) return;
    setMatchingOptions($options.filter(({ value }) => match(value, value)));
  }, [value, $options, match]);

  const renderedValue = renderValue(value);

  return (
    <div>
      <Input
        {...InputProps}
        aria-activedescendant={activeDescendant}
        aria-autocomplete="none"
        aria-controls={listBoxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={handleInputChange}
        onClick={handleClick}
        onFocus={handleFocus}
        placeholder={placeholder}
        ref={comboboxRef}
        role="combobox"
        tabIndex={tabIndex || 0}
        value={renderedValue}
      />
      <Popover
        placement="start-after"
        {...PopoverProps}
        anchorEl={comboboxRef.current?.wrapperNode}
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

export default Autocomplete;
