import React from 'react';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import Popover, {
  isFunction,
  PopoverProps,
} from '../../Messaging/Popover/Popover';
import styles from './Select.css?module';
import Option, { OptionProps } from './Option';
import { getClassName } from '@reframework/classnames';
import {
  useAriaActiveDescendant,
  useControlledState,
  typeOf,
  Optional,
  // pipeEventHandlers,
} from './utils';

/**
 * @see https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/#combobox
 *
 * The nature of possible values presented by a popup and the way they are presented
 * is called the autocomplete behavior. Comboboxes can have one of four forms of autocomplete:
 *
 * 1. No autocomplete: The combobox is editable, and when the popup is triggered,
 * the suggested values it contains are the same regardless of the characters typed in the combobox.
 * For example, the popup suggests a set of recently entered values,
 * and the suggestions do not change as the user types.
 *
 * 2. List autocomplete with manual selection: When the popup is triggered, it presents suggested values.
 * If the combobox is editable, the suggested values complete or logically correspond to the characters
 * typed in the combobox. The character string the user has typed will become the value of the combobox
 * unless the user selects a value in the popup.
 *
 * 3. List autocomplete with automatic selection: The combobox is editable, and when the popup is triggered,
 * it presents suggested values that complete or logically correspond to the characters typed in the combobox,
 * and the first suggestion is automatically highlighted as selected. The automatically selected suggestion
 * becomes the value of the combobox when the combobox loses focus unless the user chooses
 * a different suggestion or changes the character string in the combobox.
 *
 * 4. List with inline autocomplete: This is the same as list with automatic selection with one additional feature.
 * The portion of the selected suggestion that has not been typed by the user,
 * a completion string, appears inline after the input cursor in the combobox.
 * The inline completion string is visually highlighted and has a selected state.
 */

interface OptionItem {
  value: string;
  label: React.ReactNode;
}

export interface SelectProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  onBlur?: (e: React.SyntheticEvent) => void;
  onChange: (value: string) => void;
  onClose?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onOpen?: () => void;
  open?: boolean;
  PaperProps?: PaperProps;
  placeholder?: string;
  PopoverProps?: PopoverProps;
  value?: string;
  dropdownMatchSelectWidth?: true | number;
  openOnFocus?: boolean;
  filterSelectedOptions: Boolean;

  // ----- > editable boolean false
  // inputValue string
  // onInputChange function(value) -
  // includeInputInList bool false
  // renderInput: () => React.ReactNode;
  // readOnly?: () => void;
  // ----- > multiple?: boolean;
  // allowClear boolean false
  // renderCombobox: (props: ComboboxProps) => React.ReactNode;
  // ---- > backfill boolean false // keyboard autocomplete only

  notFoundContent?: React.ReactNode;
  options: OptionItem[];
  renderValue?: (value: string) => string;
  renderOption: (
    props: Partial<OptionProps>,
    option: OptionItem
  ) => React.ReactNode;
  getOptionDisabled?: (option: OptionItem) => boolean;
  getOptionSelected?: (option: OptionItem, value: Optional<string>) => boolean;
  getOptionLabel?: (option: OptionItem) => React.ReactNode;
  getOptionFiltered?: (option: OptionItem) => boolean;
  // -- A11y
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  listBoxId?: string;
  tabIndex?: number;
}

const Select = ({
  autoFocus = false,
  defaultOpen,
  defaultValue,
  disabled,
  dropdownMatchSelectWidth = true,
  /**
   * @see https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/#combobox
   * It is displayed when the Down Arrow key is pressed or the Open button is activated.
   * 1. Optionally, if the combobox is editable and contains a string that does not match an allowed value, expansion does not occur.
   * 2. It is displayed when the combobox receives focus even if the combobox is editable and empty.
   * 3. If the combobox is editable, the popup is displayed only if a certain number of characters are
   * typed in the combobox and those characters match some portion of one of the suggested values.
   * @param {boolean?} openOnFocus
   */
  openOnFocus = false,
  name,
  onBlur,
  onChange,
  onClick,
  onFocus,
  open: $open,
  PaperProps,
  placeholder,
  PopoverProps,
  filterSelectedOptions = false,
  options = [],
  renderOption,
  renderValue = (value: string) => value,
  getOptionDisabled = (opt: OptionItem) => false,
  getOptionSelected = (opt: OptionItem, value?: string) => value === opt.value,
  getOptionLabel = (opt: OptionItem) => opt.label,
  getOptionFiltered = (_: OptionItem) => false,
  notFoundContent = 'Not Found',
  value: $value,
  // A11y
  id,
  listBoxId,
  ariaLabel,
  tabIndex,
  ariaLabelledBy,
  // Next
  editable = false,
}: SelectProps) => {
  const comboboxRef = React.useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useControlledState({
    controlled: $value,
    default: defaultValue || '',
  });

  const [open, setOpen] = useControlledState({
    controlled: $open,
    default: defaultOpen || false,
  });

  const {
    activeDescendant,
    onFocus: handleOptionFocus,
    onBlur: handleOptionBlur,
  } = useAriaActiveDescendant();

  const handleOptionClick = React.useCallback(
    ({ target }: React.MouseEvent) => {
      const targetValue = (target as Element).getAttribute('data-value') || '';
      setValue(targetValue);
      onChange(targetValue);
      setOpen(false);
    },
    []
  );

  const handleClick = (event: React.MouseEvent) => {
    if (typeOf.function(onClick)) onClick(event);
    if (!open) setOpen(true);
  };

  const handleFocus = (event: React.SyntheticEvent) => {
    if (typeOf.function(onFocus)) onFocus(event);
    if (openOnFocus) setOpen(true);
  };

  const handleClickAway = (event: Event) => {
    const { onClickAway } = PopoverProps || {};
    if (typeOf.function(onClickAway)) onClickAway(event);
    setOpen(false);
  };

  React.useEffect(() => {
    if (autoFocus) comboboxRef.current?.focus();
  }, []);

  const hasValue = Boolean(value?.trim());

  const comboboxClassName = getClassName({
    [styles.combobox]: true,
    [styles.placeholder]: hasValue,
    [styles.disabled]: Boolean(disabled),
  });

  const getOptionProps = (option: OptionItem) => {
    if (getOptionFiltered(option)) return null;
    const selected = getOptionSelected(option, value);
    if (filterSelectedOptions && selected) return null;
    const disabled = getOptionDisabled(option);

    return {
      ['aria-disabled']: disabled,
      ['aria-selected']: selected,
      ['data-value']: option.value,
      id: `opt-${option.value}`,
      key: `opt-${option.value}`,
      onBlur: handleOptionBlur,
      onClick: handleOptionClick,
      onFocus: handleOptionFocus,
      role: 'option',
      selected,
      tabIndex: 0,
    };
  };

  // TODO: handleKeyDown
  // multiple
  // search

  const renderContent = () => {
    if (editable) {
      return <input value={value} placeholder={placeholder} />;
    }

    return hasValue ? renderValue(value) : placeholder;
  };

  return (
    <div
      aria-autocomplete="none"
      aria-activedescendant={activeDescendant}
      aria-controls={listBoxId}
      aria-disabled={disabled}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-placeholder={hasValue ? placeholder : undefined}
      className={comboboxClassName}
      data-name={name}
      id={id}
      onBlur={onBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      ref={comboboxRef}
      role="combobox"
      tabIndex={tabIndex || 0}
    >
      {renderContent()}
      <Popover
        placement="start-after"
        {...PopoverProps}
        anchorEl={comboboxRef.current}
        anchorWidth={dropdownMatchSelectWidth}
        onClickAway={handleClickAway}
        open={open}
      >
        <Paper {...PaperProps} role="listbox" tabIndex={-1}>
          {options.length === 0 && notFoundContent}
          {options.map((option) => {
            const optionProps = getOptionProps(option);

            if (optionProps === null) return null;

            if (isFunction(renderOption)) {
              return renderOption(optionProps, option);
            }

            return (
              <Option {...optionProps} value={option.value}>
                {getOptionLabel(option)}
              </Option>
            );
          })}
        </Paper>
      </Popover>
    </div>
  );
};

Select.Option = Option;

export default Select;
