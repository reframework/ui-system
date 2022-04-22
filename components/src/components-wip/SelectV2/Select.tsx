/* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
import React from 'react';
import { PaperProps } from '@components/Paper';
import { isArray, isFunction, isNumber, preventDefault } from '@utils/index';
import { Popover, PopoverProps } from '@components/Popover';
import { useControlledState } from '@utils/useControlledState';
import { useKeyboardHandler, Space } from '@utils/useKeyboardHandler';
import { getClassName } from '@reframework/classnames';
import { useList } from '@wip/List';
import { Optional, OptionItem, SelectValue } from './types';
import Option, { OptionProps } from './Option';
import {
  defaultGetOptionDisabled,
  defaultGetOptionFiltered,
  defaultGetOptionSelected,
  defaultRenderValue,
  getDefaultValue,
  defaultGetOptionLabel,
} from './utils';

import styles from './ListBox.css?module';

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
  multiple?: boolean;
  searchable?: boolean;
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
  getOptionLabel?: (option: OptionItem) => React.ReactNode;
  // Autocomplete props
  getOptionFiltered?: (option: OptionItem) => boolean;
  notFoundContent?: React.ReactNode;
  skipSelectedOptions?: boolean;
  inputValue?: string;
  InputProps: {}; // InputProps;
  onInputChange: (event: React.ChangeEvent) => void;
  includeInputInList?: boolean;
  renderInput: () => React.ReactNode;
  readOnly?: boolean;
  match?: (optionValue: string, value: string) => boolean;
}

/**
 * TODO: change logic of keyboard handler nad then run ref.onKeyDown()
 */
const Select = ({
  ariaLabel,
  ariaLabelledBy,
  autoFocus = false,
  className,
  closeOnSelect = true,
  defaultOpen,
  defaultValue,
  disabled,
  getOptionDisabled = defaultGetOptionDisabled,
  getOptionFiltered = defaultGetOptionFiltered,
  getOptionLabel = defaultGetOptionLabel,
  getOptionSelected = defaultGetOptionSelected,
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
  PaperProps,
  placeholder,
  placement = 'bottom-start',
  PopoverProps,
  portal = false,
  renderOption,
  renderValue = defaultRenderValue,
  // ---- > backfill boolean false // keyboard autocomplete only
  tabIndex = 0,
  value: valueProp,
}: SelectProps) => {
  /**
   * Value
   */
  const { state: value, setState: setValue } = useControlledState({
    controlled: valueProp,
    default: getDefaultValue(defaultValue, multiple),
  });

  /**
   * Boolean determines to show placeholder
   */
  const hasValue = Boolean((isArray(value) ? value[0] : value)?.trim());

  /** Computes value */
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
   * Ref of the combobox (input/select container)
   * Saves ref to the state in order to catch the un/mounting
   */
  const [comboboxRef, setComboboxRef] =
    React.useState<HTMLElement | null>(null);

  const setupComboboxRef = (node: HTMLElement | null) => {
    if (!node) return;
    setComboboxRef(node);
    if (autoFocus) node?.focus?.();
  };

  const [autoFocusItem, setAutofocusItem] = React.useState<Optional<number>>();

  const [activeOptionId, setActiveOptionId] =
    React.useState<string | undefined>();

  const onActiveItemChange = (
    _: HTMLElement | null,
    next: HTMLElement | null,
  ) => {
    setActiveOptionId(next?.id);
  };

  const {
    Provider: ListProvider,
    providerProps,
    listProps,
    activeItem: activeOption,
  } = useList({
    onActiveItemChange,
    autoFocusItem,
    id: listBoxId,
    role: 'listbox',
    className: listBoxClassName,
    // isItemFocusable,
  });

  const { setState: setIsOpen, state: isOpen } = useControlledState({
    controlled: openProp,
    // shouldn't be undefined because goes as controlled state in popper
    default: !!defaultOpen,
  });

  /**
   * Opens menu
   */
  const openMenu = (options?: { focusItem?: number }) => {
    if (isOpen) return;
    if (false) {
      // if selected focus will appear automatically
    }
    if (isNumber(options?.focusItem)) {
      setAutofocusItem(options?.focusItem);
    }
    /**
     * Save the focus when List appears in order to restore when it disappears
     */
    setIsOpen(true);
    onOpen?.();
  };

  /**
   * Closes menu
   */
  const closeMenu = React.useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
    setAutofocusItem(undefined);
    onClose?.();
  }, [onClose, setAutofocusItem, setIsOpen, isOpen]);

  const openWithTheFirstFocused = () => {
    openMenu({ focusItem: 0 });
  };

  const openWithTheLastFocused = () => {
    openMenu({ focusItem: -1 });
  };

  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event);
    if (isOpen) {
      closeMenu();
      return;
    }
    openWithTheFirstFocused();
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
        setValue(multiple ? [] : '');
      }
    },
    onArrowDown: () => {
      if (isOpen) {
        activeOption.setNext();
        return;
      }
      openWithTheFirstFocused();
    },
    onArrowUp: () => {
      if (isOpen) {
        activeOption.setPrevious();
        return;
      }
      openWithTheLastFocused();
    },
    onTab: () => {
      // TODO
    },
    onEnter: () => {
      if (isOpen) {
        activeOption.current?.click();
        return;
      }
      openWithTheFirstFocused();
    },
    onPrintableCharacter: (event) => {
      if (searchable) {
        // Do autocomplete
      } else {
        if (event.key === Space) {
          if (isOpen) {
            console.log(activeOption.current, 'current');
            activeOption.current?.click();
            return;
          }

          openWithTheFirstFocused();
        }
        // Do autocomplete
      }
    },
  });

  const comboboxClassName = getClassName({
    [styles.combobox]: true,
    [styles.placeholder]: false,
    [styles.disabled]: disabled,
    [className!]: !!className,
  });

  /**
   * Option Click Handler
   */
  const handleOptionClick = (option: OptionItem) => () => {
    console.log(option, 'OPTION');
    const nextValue = getNextValue(option.value);
    setValue(nextValue);
    onChange?.(nextValue);

    if (closeOnSelect) {
      closeMenu();
    }
  };

  // TODO: rerenders twice
  console.log('$$ Select: updated $$');

  return (
    <>
      <div
        aria-activedescendant={activeOptionId}
        aria-autocomplete="none"
        aria-controls={listBoxId}
        aria-disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-owns={listBoxId}
        aria-placeholder={value ? undefined : placeholder}
        className={comboboxClassName}
        id={id}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={setupComboboxRef}
        tabIndex={tabIndex}
        onFocus={handleFocus}
        onBlur={handleBlur}
        role="combobox"
      >
        {hasValue ? renderValue(value) : placeholder}
      </div>

      <Popover
        matchWidth={true}
        placement={placement}
        disablePortal={!portal}
        offsetY={10}
        {...PopoverProps}
        originElement={comboboxRef}
        onClickAway={handleClickOutside}
        open={isOpen}
        paperProps={PaperProps}
        onOpen={openMenu}
        onClose={closeMenu}
      >
        <ListProvider {...providerProps}>
          <ul {...listProps}>
            {options.map((option: any) => {
              // Filter option (autocomplete case)
              if (!getOptionFiltered(option, value)) return null;

              const optionId = `ref:select-option-${option.value}-id`;
              const selected = !multiple && getOptionSelected(option, value);

              const optionProps = {
                autoFocus: selected,
                disabled: getOptionDisabled(option),
                focused: activeOptionId === optionId,
                id: optionId,
                onClick: handleOptionClick(option),
                selected,
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
            })}
          </ul>
        </ListProvider>
      </Popover>
    </>
  );
};

export default Select;
