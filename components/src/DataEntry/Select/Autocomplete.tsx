import React from 'react';
import Popover from '../../Messaging/Popover/Popover';
import {
  isFunction,
  defaultRenderValue,
  defaultGetOptionLabel,
  defaultMatch,
  useAutoFocus,
} from './utils';
import useSelect from './useSelect';
import { AutocompleteProps } from './types';
import Input, { InputRef } from '../Input/Input';
import ListBox from './ListBox';

const Autocomplete = ({
  ariaLabel,
  ariaLabelledBy,
  autoFocus,
  dropdownMatchSelectWidth = true,
  getOptionLabel = defaultGetOptionLabel,
  id,
  includeInputInList,
  InputProps,
  inputValue: $inputValue,
  listBoxId,
  notFoundContent,
  onBlur,
  onInputChange,
  openOnFocus,
  options: $options,
  PaperProps,
  placeholder,
  PopoverProps,
  readOnly,
  // todo: renderInput,
  renderOption,
  tabIndex,
  // defaultInputValue = '',
  // openOnMatchingValue: string | Regexp
  // skip multiple
  match = defaultMatch,
  multiple: _,
  ...useSelectProps
}: AutocompleteProps) => {
  const inputRef = React.useRef<InputRef | null>(null);

  const [matchingOptions, setMatchingOptions] = React.useState($options);

  const {
    activeDescendant,
    disabled,
    onClick,
    onClickAway,
    onFocus,
    open,
    options,
    setOpen,
    setValue,
    value,
  } = useSelect({
    ...useSelectProps,
    options: matchingOptions,
  });

  /**
   * Input change handler
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isFunction(onInputChange)) onInputChange(event);
    if (!open) setOpen(true);
    setValue(event.target.value);
  };

  /**
   * Autocomplete
   */
  React.useEffect(() => {
    if (!isFunction(match)) return;
    setMatchingOptions(
      $options.filter((it) => match(it.value, value as string))
    );
  }, [value, $options, match]);

  /**
   * Autofocus
   */
  useAutoFocus(!!autoFocus, inputRef.current?.inputNode);

  return (
    <div>
      <Input
        {...InputProps}
        aria-activedescendant={activeDescendant}
        aria-autocomplete="list"
        aria-controls={listBoxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={handleInputChange}
        onClick={onClick}
        onFocus={onFocus}
        placeholder={placeholder}
        ref={inputRef}
        role="combobox"
        tabIndex={tabIndex || 0}
        value={value as string}
      />
      <Popover
        placement="start-after"
        {...PopoverProps}
        anchorEl={inputRef.current?.wrapperNode}
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

export default Autocomplete;
