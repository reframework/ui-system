import {
  firstOf,
  isArray,
  isFunction,
  lastOf,
  nextOf,
  previousOf,
  useControlledState,
} from '../../utils';
import {
  defaultGetOptionDisabled,
  defaultGetOptionFiltered,
  defaultGetOptionSelected,
  defaultRenderValue,
  getDefaultValue,
} from './utils';
import {
  Optional,
  OptionItem,
  SelectValue,
  UseComboboxProps,
  UseComboboxReturnType,
} from './types';
import React from 'react';
import { OptionProps } from './Option';

const useCombobox = ({
  defaultOpen,
  defaultValue,
  disabled,
  getOptionDisabled = defaultGetOptionDisabled,
  getOptionFiltered = defaultGetOptionFiltered,
  getOptionSelected = defaultGetOptionSelected,
  multiple = false,
  onBlur,
  onChange,
  onClick,
  onClickAway,
  onFocus,
  open: $open,
  openOnClick = true,
  openOnFocus,
  options = [],
  renderValue = defaultRenderValue,
  // ---- > backfill boolean false // keyboard autocomplete only
  value: $value,
}: UseComboboxProps): UseComboboxReturnType => {
  /**
   * Value
   */
  const [value, setValue] = useControlledState({
    controlled: $value,
    default: getDefaultValue(defaultValue, multiple),
  });

  const getNextValue = (nextValue: string) => {
    if (isArray(value)) {
      if (value.indexOf(nextValue) === -1) {
        // Multiple mode selection
        return [...value, nextValue];
      } else {
        // Multiple mode deselection
        return value.filter((it) => it !== nextValue);
      }
    } else if (value !== nextValue) {
      // Single mode selection
      return nextValue;
    } else {
      // Single mode deselection
      return '';
    }
  };
  /**
   * Open
   */
  const [open, setOpen] = useControlledState({
    controlled: $open,
    default: defaultOpen || false,
  });

  /**
   * ActiveDescendant
   */
  const [highlighted, setHighlighted] = React.useState<Optional<OptionProps>>();

  const handleClickAway = (event: Event) => {
    if (isFunction(onClickAway)) onClickAway(event);
    setHighlighted(undefined);
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (isFunction(onClick)) onClick(event);
    if (openOnClick && !open) setOpen(true);
  };

  const handleFocus = (event: React.SyntheticEvent) => {
    if (isFunction(onFocus)) onFocus(event);
    setHighlighted(undefined);
    if (openOnFocus && !open) setOpen(true);
  };

  const handleBlur = (event: React.SyntheticEvent) => {
    if (isFunction(onBlur)) onBlur(event);
    setHighlighted(undefined);
  };

  /**
   * Option Mouse Over Handler
   */
  const handleOptionMouseEnter = (option: OptionProps) => () => {
    setHighlighted(option);
  };

  /**
   * Option Click Handler
   */
  const handleOptionClick = (option: OptionItem) => () => {
    const nextValue = getNextValue(option.value);
    setValue(nextValue);

    if (isFunction(onChange)) {
      onChange(nextValue);
    }

    setOpen(false);
  };

  /**
   * Boolean determines to show placeholder
   */
  const hasValue = Boolean((isArray(value) ? value[0] : value)?.trim());

  /**
   * Option mapping function
   */
  const getOptionProps = (option: OptionItem) => {
    if (!getOptionFiltered(option)) return null;
    const id = `opt-${option.value}`;

    return {
      disabled: getOptionDisabled(option),
      id,
      onClick: handleOptionClick(option),
      onMouseEnter: handleOptionMouseEnter,
      selected: getOptionSelected(option, value),
      highlighted: highlighted?.id === id,
      tabIndex: -1,
      ...option,
    };
  };

  const filteredOptions = options.map(getOptionProps).filter(Boolean);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let shouldCancelEvent = false;
    const altKey = event.altKey;

    if (event.ctrlKey || event.shiftKey) return;

    switch (event.key) {
      case 'Enter':
        shouldCancelEvent = true;
        if (highlighted) setValue(getNextValue(highlighted.value));
        setOpen(false);
        break;

      case 'Down':
      case 'ArrowDown': {
        shouldCancelEvent = true;
        if (!filteredOptions.length) break;
        setOpen(true);
        if (altKey) break;

        const optionIdx = filteredOptions.findIndex(
          (it) => it?.value === highlighted?.value
        );

        const nextHighlighted =
          optionIdx === -1 || optionIdx >= filteredOptions.length - 1
            ? firstOf(filteredOptions)
            : nextOf(filteredOptions, optionIdx);

        setHighlighted(nextHighlighted!);
        break;
      }

      case 'Up':
      case 'ArrowUp': {
        shouldCancelEvent = true;
        if (!filteredOptions.length) break;
        setOpen(true);
        if (altKey) break;

        const optionIdx = filteredOptions.findIndex(
          (it) => it?.value === highlighted?.value
        );

        const nextHighlighted =
          optionIdx <= 0
            ? lastOf(filteredOptions)
            : previousOf(filteredOptions, optionIdx);

        setHighlighted(nextHighlighted!);
        break;
      }

      case 'Esc':
      case 'Escape':
        if (open) {
          setOpen(false);
        } else {
          setValue(multiple ? [] : '');
        }
        setHighlighted(undefined);
        shouldCancelEvent = true;
        break;

      case 'Tab':
        setOpen(false);
        if (highlighted) setValue(getNextValue(highlighted.value));
        break;

      default:
        break;
    }

    if (shouldCancelEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    let shouldCancelEvent = false;

    switch (event.key) {
      case 'Left':
      case 'ArrowLeft':
      case 'Right':
      case 'ArrowRight':
      case 'Home':
      case 'End':
        setHighlighted(undefined);
        shouldCancelEvent = true;
        break;
      default:
        break;
    }

    if (shouldCancelEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return {
    open,
    disabled: Boolean(disabled),
    hasValue,
    setValue,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onClick: handleClick,
    onClickAway: handleClickAway,
    setOpen: setOpen,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    activeDescendant: highlighted?.id,
    rawValue: value,
    value: renderValue(value),
    // @ts-expect-error something weird
    options: filteredOptions,
  };
};

export default useCombobox;
