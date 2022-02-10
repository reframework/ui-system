import React from 'react';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import styles from './Select.css?module';
import Option from './Option';
import { getClassName } from '@reframework/classnames';
import {
  useAriaActiveDescendant,
  useControlledState,
  typeOf,
  pipeEventHandlers,
} from './utils';

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
  renderValue = (value: string) => value,
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

  const items = React.useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null;
      return React.cloneElement(child, {
        selected: child.props.value === value,
        onClick: pipeEventHandlers(child.props.onClick, handleOptionClick),
        onFocus: pipeEventHandlers(child.props.onFocus, handleOptionFocus),
        onBlur: pipeEventHandlers(child.props.onBlur, handleOptionBlur),
      });
    });
  }, [children, value]);

  React.useEffect(() => {
    if (autoFocus) comboboxRef.current?.focus();
  }, []);

  const hasValue = Boolean(value?.trim());

  const comboboxClassName = getClassName({
    [styles.combobox]: true,
    [styles.placeholder]: hasValue,
    [styles.disabled]: Boolean(disabled),
  });

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
      {hasValue ? renderValue(value) : placeholder}
      <Popover
        placement="start-after"
        {...PopoverProps}
        anchorEl={comboboxRef.current}
        anchorWidth={dropdownMatchSelectWidth}
        onClickAway={handleClickAway}
        open={open}
      >
        <Paper {...PaperProps} role="listbox" tabIndex={-1}>
          {items}
        </Paper>
      </Popover>
    </div>
  );
};

Select.Option = Option;

export default Select;
