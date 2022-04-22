import React from 'react';
import { useControlledState } from '@utils/useControlledState';
import { useKeyboardHandler } from '@utils/useKeyboardHandler';
import { isArray, isNumber, preventDefault } from '@utils/index';
import { useActiveDescendant } from '@utils/useActiveDescendant';
import {
  defaultGetOptionDisabled,
  defaultGetOptionFiltered,
  defaultGetOptionSelected,
  defaultRenderValue,
  getDefaultValue,
} from './utils';
import {
  // Optional,
  OptionItem,
  UseComboboxProps,
  UseComboboxReturnType,
} from './types';

enum FocusState {
  first = 'first',
  last = 'last',
  index = 'index',
  selected = 'selected',
}

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
  closeOnSelect = true,
  onClickOutside,
  onFocus,
  open: openProp,
  openOnClick = true,
  openOnFocus,
  options = [],
  renderValue = defaultRenderValue,
  // ---- > backfill boolean false // keyboard autocomplete only
  value: valueProp,
}: UseComboboxProps): UseComboboxReturnType => {
  /**
   * Ref of listbox
   */
  const listBoxRef = React.useRef<HTMLElement | null>(null);
  /**
   * Ref of the combobox (input/select container)
   */
  const comboboxRef = React.useRef<HTMLElement | null>(null);

  /**
   * Value
   */
  const { state: value, setState: setValue } = useControlledState({
    controlled: valueProp,
    default: getDefaultValue(defaultValue, multiple),
  });

  const isMulti = isArray(value);

  /**
   * Active Descendant
   */
  const [activeDescendant, setActiveDescendant] =
    React.useState<HTMLOptionElement | null>(null);

  // TODO add generic for type
  const ActiveDescendant = useActiveDescendant({
    listRef: listBoxRef,
    // filterElement
    onChange: (_, next) => {
      setActiveDescendant(next as HTMLOptionElement);
    },
  });

  /**
   * Open
   */
  const { state: isOpen, setState: setIsOpen } = useControlledState({
    controlled: openProp,
    default: Boolean(defaultOpen),
  });

  const openMenu = (options?: { autofocusIndex: number }) => {
    if (isOpen) return;
    setIsOpen(true);
    if (activeDescendant || isMulti) return;
    if (!isNumber(options?.autofocusIndex)) return;
    ActiveDescendant.setByIndex(options?.autofocusIndex as number);
  };

  const closeMenu = () => {
    if (!isOpen) return;
    setIsOpen(false);
  };

  const getNextValue = (nextValue: string) => {
    if (isMulti) {
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

  const handleClickOutside = (event: Event) => {
    onClickOutside?.(event);
    ActiveDescendant.reset();
    closeMenu();
  };

  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event);
    if (openOnClick) openMenu();
  };

  const handleFocus = (event: React.SyntheticEvent) => {
    onFocus?.(event);
    ActiveDescendant.reset();
    if (openOnFocus) openMenu();
  };

  const handleBlur = (event: React.SyntheticEvent) => {
    onBlur?.(event);
    ActiveDescendant.reset();
  };

  /**
   * Option Mouse Over Handler
   */
  const handleOptionMouseEnter = ({ currentTarget }: React.MouseEvent) => {
    ActiveDescendant.set(currentTarget as HTMLElement);
  };

  /**
   * Option Click Handler
   */
  const handleOptionClick = (option: OptionItem) => () => {
    const nextValue = getNextValue(option.value);
    setValue(nextValue);
    onChange?.(nextValue);

    if (closeOnSelect) {
      closeMenu();
    }
  };

  /**
   * Boolean determines to show placeholder
   */
  const hasValue = Boolean((isMulti ? value[0] : value)?.trim());

  /**
   * Option mapping function
   */
  const getOptionProps = (option: OptionItem) => {
    const id = `ref:select-option-${option.value}-id`;

    return {
      disabled: getOptionDisabled(option),
      focused: activeDescendant?.id === id,
      id,
      onClick: handleOptionClick(option),
      onMouseEnter: handleOptionMouseEnter,
      selected: getOptionSelected(option, value),
      tabIndex: -1,
      ...option,
    };
  };

  const filteredOptions = options.filter(getOptionFiltered).map(getOptionProps);

  const handleKeyDown = useKeyboardHandler({
    onArrowUp: (event) => {
      preventDefault(event);
      if (!filteredOptions.length) return;
      openMenu();
      ActiveDescendant.setPrevious();
    },
    onArrowDown: (event) => {
      preventDefault(event);
      if (!filteredOptions.length) return;
      openMenu();
      ActiveDescendant.setNext();
    },
    onEscape: (event) => {
      preventDefault(event);
      ActiveDescendant.reset();
      if (isOpen) {
        closeMenu();
      } else {
        setValue(multiple ? [] : '');
      }
    },
    onEnter: () => activeDescendant?.click?.(),
    onSpace: () => activeDescendant?.click?.(),
    // onArrowLeft: ActiveDescendant.setFirst,
    // onArrowRight: ActiveDescendant.setLast,
    // onHome: ActiveDescendant.setFirst,
    // onEnd: ActiveDescendant.setLast,
    onPrintableCharacter: () => {
      // if autocomplete === backfill
    },
  });

  return {
    // todo: placeholder
    activeDescendant,
    disabled: Boolean(disabled),
    hasValue,
    onBlur: handleBlur,
    onClick: handleClick,
    onClickOutside: handleClickOutside,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    isOpen,
    isMulti,
    rawValue: value,
    setOpen: openMenu,
    setValue,
    value: renderValue(value),
    // @ts-expect-error something weird
    options: filteredOptions,
    comboboxRef,
    listBoxRef,
  };
};

export default useCombobox;
