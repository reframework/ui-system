import React from 'react';
import { PaperProps } from '../../Containers/Paper/Paper';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import styles from './Select.css?module';
import Option from './Option';
import { getClassName } from '@reframework/classnames';
import { useAriaActiveDescendant, useControlledState, typeOf } from './utils';
import ListBox from './ListBox';

type OptionSelectedEvent = CustomEvent<{ value: string }>;

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
  dropdownMatchSelectWidth?: true;
  renderValue?: (value: string) => string;
  openOnFocus?: boolean;
  // listHeight = 200,
  // multiple?: boolean;
  // readOnly?: () => void;

  // -- Search (Autocomplete)
  // inputValue,
  // searchValue,
  // onSearch,
  // autoClearSearchValue = true,

  // -- A11y
  'aria-label'?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  listBoxId?: string;
  tabIndex?: number;
}

const Select = ({
  autoFocus = false,
  children,
  defaultOpen,
  defaultValue,
  disabled,
  dropdownMatchSelectWidth = true,
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
  renderValue = (v: string) => v,
  value: $value,
  // keepOpen?: boolean;
  // A11y
  id,
  listBoxId,
  ariaLabel,
  tabIndex,
  ariaLabelledBy,
}: SelectProps) => {
  const comboboxRef = React.useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useControlledState({
    controlled: $value,
    default: defaultValue || '',
  });

  const hasValue = Boolean(value?.trim());

  const [open, setOpen] = useControlledState({
    controlled: $open,
    default: defaultOpen || false,
  });

  const comboboxClassName = getClassName({
    [styles.combobox]: true,
    [styles.placeholder]: hasValue,
  });

  const items = React.useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null;
      return React.cloneElement(child, {
        selected: child.props.value === value,
      });
    });
  }, [children, value]);

  const handleClick = (event: React.MouseEvent) => {
    if (typeOf.function(onClick)) onClick(event);
    if (!open) setOpen(true);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleFocus = (event: React.SyntheticEvent) => {
    if (typeOf.function(onFocus)) onFocus(event);
    if (openOnFocus) setOpen(true);
  };

  const handleOptionSelect = React.useCallback((event: OptionSelectedEvent) => {
    setOpen(false);
    setValue(event.detail.value);
    onChange(event.detail.value);
  }, []);

  const {
    activeDescendant,
    onFocus: handleOptionFocus,
    onBlur: handleOptionBlur,
  } = useAriaActiveDescendant();

  const subscriptions = React.useMemo(
    () => ({
      'rf:option-select': handleOptionSelect,
      'rf:option-focus': handleOptionFocus,
      'rf:option-blur': handleOptionBlur,
    }),
    []
  );

  React.useEffect(() => {
    if (autoFocus) comboboxRef.current?.focus();
  }, []);

  return (
    <div
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
      {hasValue ? renderValue(value) : placeholder}
      <Popover
        placement="start-after"
        {...PopoverProps}
        anchorEl={comboboxRef.current}
        anchorWidth={dropdownMatchSelectWidth}
        onClickAway={handleClickAway}
        open={open}
      >
        <ListBox
          {...PaperProps}
          aria-labelledby={ariaLabelledBy}
          id={listBoxId}
          subscriptions={subscriptions}
        >
          {items}
        </ListBox>
      </Popover>
    </div>
  );
};

Select.Option = Option;

export default Select;
