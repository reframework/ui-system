/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */

import React from 'react';
import { PaperProps } from '@components/Paper';
import {
  getFirstMatchingItem,
  isArray,
  isFunction,
  isNumber,
  preventDefault,
  stopPropagation,
} from '@utils/index';
import { Popover, PopoverProps } from '@components/Popover';
import { useControlledState } from '@utils/useControlledState';
import { useKeyboardHandler, Space } from '@utils/useKeyboardHandler';
import { getClassName } from '@reframework/classnames';
import {
  DescendantProvider,
  useActiveDescendant,
} from '@utils/useActiveDescendant';
import { DOMFocus } from '@utils/focus';
import { MultiValue } from '@wip/Select/MultiValue';
import { Optional, OptionItem, SelectValue } from './types';
import Option, { OptionProps } from './Option';
import {
  defaultGetOptionDisabled,
  defaultGetOptionLabel,
  defaultGetOptionMatch,
  defaultGetOptionSelected,
  getDefaultValue,
} from './utils';

import './Select.css';

enum SelectClassNames {
  combobox = 'ref:select-combobox',
  readOnly = 'ref:select-read-only',
  listbox = 'ref:select-listbox',
  container = 'ref:select-container',
  valueContainer = 'ref:select-value-container',
  clearButton = 'ref:select-clear-button',
  // visuallyHidden = 'ref:select-listbox-hidden',
}

const isItemFocusable = (node: Element | null | undefined) => {
  return node?.getAttribute('aria-disabled') !== 'true';
};

export interface SelectProps {
  // Combobox props, add a11y
  ariaLabel?: string;
  ariaLabelledBy?: string;
  autoFocus?: boolean;
  className?: string;
  id?: string;
  tabIndex?: number;

  // Popover props
  PaperProps?: PaperProps;
  PopoverProps?: PopoverProps;
  placement?: PopoverProps['placement'];
  portal?: boolean;
  // portalTarget?:null | HTMLElement
  //
  // List props
  listBoxClassName?: string;
  listBoxId?: string;
  onClickOutside?: (e: Event) => void;
  // Select props
  closeOnSelect?: boolean;
  defaultOpen?: boolean;
  defaultValue?: SelectValue;
  disabled?: boolean;
  // modes
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  //
  name?: string;
  onBlur?: (e: React.SyntheticEvent) => void;
  onChange: (value: SelectValue) => void;
  onClick?: (e: React.MouseEvent) => void;
  onClose?: () => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onOpen?: () => void;
  open?: boolean;
  openOnFocus?: boolean;
  options: OptionItem[];
  placeholder?: string;
  value?: SelectValue;
  renderValue?: (v: Optional<SelectValue>) => string;
  renderOption: (
    props: Partial<Omit<OptionProps, keyof OptionItem>>,
    option: OptionItem,
  ) => React.ReactNode;
  getOptionDisabled?: (option: OptionItem) => boolean;
  getOptionSelected?: (
    option: OptionItem,
    value: Optional<SelectValue>,
  ) => boolean;
  getOptionMatching?: (option: OptionItem, value: string) => boolean;
  getOptionLabel?: (option: OptionItem) => React.ReactNode;
  // Autocomplete props
  // getOptionFiltered?: (option: OptionItem, value: SelectValue) => boolean;
  notFoundContent?: React.ReactNode;
  skipSelectedOptions?: boolean;
  inputValue?: string;
  InputProps: {}; // InputProps;
  onInputChange: (event: React.ChangeEvent) => void;
  includeInputInList?: boolean;
  renderInput: () => React.ReactNode;
  readOnly?: boolean;
}

/**
 * TODO: change logic of keyboard handler nad then run ref.onKeyDown()
 */
const Select = ({
  ariaLabel,
  ariaLabelledBy,
  autoFocus = false,
  className,
  clearable = true,
  closeOnSelect = true,
  defaultOpen,
  defaultValue,
  disabled,
  id,
  searchable = false,
  listBoxId,
  listBoxClassName,
  multiple = false,
  onBlur,
  onChange,
  onClick,
  onClickOutside,
  onClose,
  onFocus,
  onOpen,
  open: openProp,
  openOnFocus,
  options = [],
  name,
  PaperProps,
  placeholder,
  placement = 'bottom-start',
  PopoverProps,
  portal = false,
  renderOption,
  tabIndex = 0,
  value: valueProp,
  //
  getOptionDisabled = defaultGetOptionDisabled,
  // getOptionFiltered = defaultGetOptionFiltered,
  getOptionLabel = defaultGetOptionLabel,
  getOptionSelected = defaultGetOptionSelected,
  getOptionMatching = defaultGetOptionMatch,
  // TODO:
  // TODO: InputProps,
  // TODO: renderInput,
  // TODO: name,
  // TODO: readOnly = false,
  // TODO: renderValue,
  onInputChange,
  includeInputInList,
  inputValue: inputValueProp,
  skipSelectedOptions,
  notFoundContent = 'No options found.',
}: SelectProps) => {
  /**
   * * Refs
   * *
   * *
   */
  const listBoxRef = React.useRef<HTMLUListElement | null>(null);
  const comboboxRef = React.useRef<HTMLElement | null>(null);
  const [containerRef, setContainerRef] =
    React.useState<HTMLElement | null>(null);

  /**
   * * Value management
   * *
   * *
   */

  const { state: value, setState: setValue } = useControlledState({
    controlled: valueProp,
    default: getDefaultValue(defaultValue, multiple),
  });

  const removeValueItem = (nextValue: string) => () => {
    setValue((prev) => {
      if (!isArray(prev)) return prev;
      return prev.filter((it) => it !== nextValue);
    });
  };

  const clearValue = () => {
    setInputValue('');
    setValue(multiple ? [] : '');
  };

  const getNextValue = (nextValue: string) => {
    if (isArray(value)) {
      if (value.indexOf(nextValue) === -1) {
        // Multiple mode selection
        return [...value, nextValue];
      }

      return value;
    }

    if (value === nextValue) {
      return value;
    }

    return nextValue;
  };

  const selectValue = (option: OptionItem) => {
    const nextValue = getNextValue(option.value);
    setInputValue(multiple ? '' : option.value);
    setValue(nextValue);
    onChange?.(nextValue);
  };

  /**
   * * Autocomplete management
   * *
   * *
   */

  const { state: inputValue, setState: setInputValue } = useControlledState({
    controlled: inputValueProp,
    default: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onInputChange?.(event);
  };

  /**
   * * Focus management
   * *
   * *
   */

  const [autoFocusItem, setAutofocusItem] = React.useState<Optional<number>>();

  const [activeOptionId, setActiveOptionId] =
    React.useState<string | undefined>();

  const activeOption = useActiveDescendant({
    parentRef: listBoxRef,
    filterElement: isItemFocusable,
    onChange: (_, next: HTMLElement | null) => {
      setActiveOptionId(next?.id);
    },
  });

  const focusCombobox = () => {
    if (comboboxRef.current) {
      DOMFocus.set(comboboxRef.current);
    }
  };

  /**
   * * Menu visibility management
   * *
   * *
   */

  const { state: isOpen, setState: setIsOpen } = useControlledState({
    controlled: openProp,
    default: !!defaultOpen,
  });

  const openMenu = (options?: { focusItem?: number }) => {
    if (isOpen) return;
    if (isNumber(options?.focusItem)) {
      setAutofocusItem(options?.focusItem);
    }
    setIsOpen(true);
    onOpen?.();
  };

  const closeMenu = React.useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
    setAutofocusItem(undefined);
    activeOption.reset();
    onClose?.();
  }, [onClose, setAutofocusItem, setIsOpen, isOpen, activeOption]);

  const openWithFirstFocused = openMenu.bind(null, { focusItem: 0 });
  const openWithLastFocused = openMenu.bind(null, { focusItem: -1 });

  /**
   * * Handlers
   * *
   * *
   */

  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event);
    focusCombobox();
    if (isOpen) {
      closeMenu();
      return;
    }
    openWithFirstFocused();
  };

  const handleClickOutside = (event: Event) => {
    onClickOutside?.(event);
    closeMenu();
  };

  const handleFocus = (event: React.SyntheticEvent) => {
    onFocus?.(event);
    if (openOnFocus) openMenu();
  };

  const handleBlur = (event: React.SyntheticEvent) => {
    onBlur?.(event);
  };

  const handleKeyDown = useKeyboardHandler({
    onEscape: (event) => {
      preventDefault(event);
      if (isOpen) {
        closeMenu();
      } else {
        clearValue();
      }
    },
    onArrowDown: () => {
      if (isOpen) {
        activeOption.setNext();
        return;
      }
      openWithFirstFocused();
    },
    onArrowUp: () => {
      if (isOpen) {
        activeOption.setPrevious();
        return;
      }
      openWithLastFocused();
    },
    onEnter: () => {
      if (isOpen) {
        activeOption.current?.click();
        return;
      }
      openWithFirstFocused();
    },
    onDelete: () => {
      clearValue();
    },
    onPrintableCharacter: (event) => {
      stopPropagation(event);

      if (searchable) {
        openMenu();
        return;
      }

      // TODO: ignore Backspace
      if (event.key === Space) {
        if (isOpen) {
          activeOption.current?.click();
          return;
        }

        openWithFirstFocused();
      }

      if (!listBoxRef.current) return;

      const options = Array.from(
        listBoxRef.current.querySelectorAll('[role="option"]'),
      ).filter(isItemFocusable);

      const matchingItem = getFirstMatchingItem({
        list: options as HTMLElement[],
        current: activeOption.current,
        searchString: event.key,
      });

      if (matchingItem) {
        activeOption.set(matchingItem);
      }
    },
  });

  /**
   * Option Click Handler
   */
  const handleOptionClick = (option: OptionItem) => () => {
    selectValue(option);

    if (closeOnSelect) {
      closeMenu();
    }
  };

  const handleClear = (event: React.MouseEvent) => {
    stopPropagation(event);
    clearValue();
  };

  /**
   * * Effects
   * *
   * *
   */

  React.useEffect(() => {
    if (autoFocus) focusCombobox();
  }, [autoFocus]);

  React.useEffect(() => {
    if (!isOpen) return;
    // Pedantic typescript
    if (!listBoxRef.current) {
      return;
    }

    if (activeOption.current) {
      /**
       * When active descendent already exist
       * means that some of item is already focused
       */
      return;
    }

    if (isNumber(autoFocusItem)) {
      activeOption.setByIndex(autoFocusItem);
    }
  }, [isOpen, autoFocusItem, activeOption]);

  /**
   * * ClassNames
   * *
   * *
   */

  const comboboxClassName = getClassName({
    [SelectClassNames.combobox]: true,
    [SelectClassNames.readOnly]: !searchable,
    // TODO: add combobox className
  });

  const listClassName = getClassName({
    [SelectClassNames.listbox]: true,
    [listBoxClassName!]: !!listBoxClassName,
  });

  const containerClassName = getClassName({
    [SelectClassNames.container]: true,
    [className!]: !!className,
  });

  const withValue = Boolean((isArray(value) ? value[0] : value)?.trim());
  // const withInputValue = Boolean(inputValue?.trim());

  const comboboxProps = {
    value: inputValue,
    placeholder,
    onChange: handleInputChange,
  };

  console.log(activeOptionId, '$$ Select: updated $$');

  const renderedOptions = options.map((option: OptionItem) => {
    if (searchable && !getOptionMatching(option, inputValue)) {
      return null;
    }
    const optionId = `ref:select-option-${option.value}-id`;
    const selected = getOptionSelected(option, value);

    if (selected) {
      if (skipSelectedOptions === true) {
        return null;
      }

      if (multiple && skipSelectedOptions !== false) {
        if (selected) return null;
      }
    }

    // TODO: first focused in autocomplete suggestions

    const optionProps = {
      autoFocus: selected,
      disabled: getOptionDisabled(option),
      focused: activeOptionId === optionId,
      id: optionId,
      onClick: handleOptionClick(option),
      selected: selected,
      tabIndex: -1,
    };

    if (isFunction(renderOption)) {
      return renderOption(optionProps, option);
    }

    return (
      <Option {...optionProps} key={optionId}>
        {getOptionLabel(option)}
      </Option>
    );
  });

  return (
    <div
      className={containerClassName}
      ref={setContainerRef}
      onClick={handleClick}
    >
      <div className={SelectClassNames.valueContainer}>
        {isArray(value) &&
          value.map((value) => {
            return (
              <MultiValue
                key={value}
                onClose={removeValueItem(value)}
                label={value}
              />
            );
          })}

        <input
          aria-activedescendant={activeOptionId}
          aria-autocomplete={searchable ? 'list' : 'none'}
          aria-controls={listBoxId}
          aria-disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-owns={listBoxId}
          className={comboboxClassName}
          id={id}
          onKeyDown={handleKeyDown}
          name={name}
          // @ts-expect-error not fun :(
          ref={comboboxRef}
          readOnly={!searchable}
          tabIndex={tabIndex}
          onFocus={handleFocus}
          onBlur={handleBlur}
          role="combobox"
          {...comboboxProps}
        />
      </div>
      {withValue && clearable && (
        <button className={SelectClassNames.clearButton} onClick={handleClear}>
          ✖️
        </button>
      )}

      <Popover
        matchWidth={true}
        placement={placement}
        disablePortal={!portal}
        offsetY={8}
        {...PopoverProps}
        originElement={containerRef}
        onClickAway={handleClickOutside}
        open={isOpen}
        paperProps={PaperProps}
        onOpen={openMenu}
        onClose={closeMenu}
      >
        <DescendantProvider
          value={{
            activeDescendant: activeOption,
          }}
        >
          <ul
            id={listBoxId}
            role={'listbox'}
            className={listClassName}
            tabIndex={-1}
            ref={listBoxRef}
          >
            {
              /* TODO: */ includeInputInList && (
                <Option
                  id={'ref:select-option-live-value-id'}
                  key={'ref:select-option--live-value-key'}
                  focused={'ref:select-option-live-value-id' === activeOptionId}
                  tabIndex={-1}
                >
                  {inputValue}
                </Option>
              )
            }
            {renderedOptions.length > 0 ? renderedOptions : notFoundContent}
          </ul>
        </DescendantProvider>
      </Popover>
    </div>
  );
};

export default Select;
