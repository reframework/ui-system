import React from 'react';
import { defaultGetOptionLabel, defaultMatch } from './utils';
import useCombobox from './useCombobox';
import { AutocompleteProps } from './types';
import Input, { InputRef } from '../Input/Input';
import ListBox from './ListBox';
import { isFunction, useAutoFocus } from '../../utils';
import PopoverV2 from '../Popover/PopoverV2';

const Autocomplete = ({
  ariaLabel,
  ariaLabelledBy,
  autoFocus,
  dropdownMatchSelectWidth = true,
  getOptionLabel = defaultGetOptionLabel,
  id,
  includeInputInList,
  InputProps,
  // todo: inputValue: $inputValue,
  // todo: defaultInputValue = '',
  // todo: renderInput,
  listBoxId,
  notFoundContent,
  onInputChange,
  // todo: openOnKeyDown,
  options: $options,
  PaperProps,
  placeholder,
  PopoverProps,
  readOnly,
  renderOption,
  tabIndex,
  match = defaultMatch,
  // @ts-expect-error skip multiple
  multiple: _,
  ...useComboboxProps
}: AutocompleteProps) => {
  const inputRef = React.useRef<InputRef | null>(null);

  const [matchingOptions, setMatchingOptions] = React.useState($options);

  const {
    activeDescendant,
    disabled,
    onClick,
    onClickAway,
    onBlur,
    onFocus,
    onKeyDown,
    open,
    options,
    setOpen,
    setValue,
    value,
  } = useCombobox({
    ...useComboboxProps,
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
        onKeyDown={onKeyDown}
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
      <PopoverV2
        placement="start-after"
        {...PopoverProps}
        originElement={inputRef.current?.wrapperNode}
        matchOriginWidth={dropdownMatchSelectWidth}
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
      </PopoverV2>
    </div>
  );
};

export default Autocomplete;
