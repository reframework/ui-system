import React from 'react';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import Input, { InputProps, Refs } from '../Input/Input';
import styles from './Select.css?module';
import Option from './Option';

type OptionSelectedEvent = CustomEvent<{ value: string }>;

// utils
const useControlled = <T extends unknown>(params: {
  controlled: T;
  default: NonNullable<T>;
}) => {
  const { controlled, default: _default } = params;

  // isControlled should never change
  const { current: isControlled } = React.useRef(
    params.controlled !== undefined
  );

  const [uncontrolled, setUncontrolled] = React.useState(_default);
  const noOp = React.useCallback(() => {}, []) as typeof setUncontrolled;

  return isControlled
    ? ([controlled as NonNullable<T>, noOp] as const)
    : ([uncontrolled, setUncontrolled] as const);
};

const typeOf = {
  function: <T extends Function>(f: unknown): f is T => typeof f === 'function',
};

type ListBoxProps = {
  // subscriptions
  onOptionSelected: (event: OptionSelectedEvent) => void;
  id?: string;
};

const isEventListener = (f: Function): f is EventListener => {
  return typeOf.function(f);
};

const ListBox: React.FC<ListBoxProps & React.HTMLProps<HTMLDivElement>> = ({
  children,
  onOptionSelected,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Subscribes to the custom event
    if (!ref.current) return;
    if (!isEventListener(onOptionSelected)) return;

    ref.current.addEventListener('rf:option-select', onOptionSelected);

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('rf:option-select', onOptionSelected);
    };
  }, [onOptionSelected]);

  return (
    <Paper ref={ref} {...props} role="listbox">
      {children}
    </Paper>
  );
};

export interface SelectProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  InputProps?: InputProps;
  keepOpen?: boolean;
  name?: string;
  onBlur?: (e: React.SyntheticEvent) => void;
  onChange: (value: string) => void;
  onClose?: () => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onOpen?: () => void;
  open?: boolean;
  PaperProps?: PaperProps;
  placeholder?: string;
  PopoverProps?: PopoverProps;
  value?: string;
  dropdownMatchSelectWidth?: true;
  renderValue?: (value: string) => string;
  // listHeight = 200,
  // multiple?: boolean;
  // readOnly?: () => void;

  // -- Search (Autocomplete)
  // inputValue,
  // searchValue,
  // onSearch,
  // autoClearSearchValue = true,

  // -- Ally
  id?: string;
  'aria-describedby?': string;
  'aria-label'?: string;
  tabIndex?: number;
  listBoxId?: string;
  ariaLabelledBy?: string;
  // catching `type` from Input which makes no sense for SelectInput
  // type,
}

const Select = ({
  autoFocus = false,
  children,
  defaultOpen,
  defaultValue,
  disabled,
  dropdownMatchSelectWidth = true,
  InputProps,
  keepOpen = false,
  name,
  onBlur,
  onChange,
  onFocus,
  open: $open,
  PaperProps,
  placeholder,
  PopoverProps,
  renderValue: renderValue,
  value: $value,
  // A11y
  id,
  listBoxId,
  ariaLabelledBy,
}: SelectProps) => {
  const ref = React.useRef<Refs>();
  const selectedOptionId = React.useRef<string>();

  const [value, setValue] = useControlled({
    controlled: $value,
    default: defaultValue || '',
  });

  const [open, setOpen] = useControlled({
    controlled: $open,
    default: defaultOpen || false,
  });

  const handleFocus = (event: React.SyntheticEvent) => {
    if (typeOf.function(onFocus)) onFocus(event);
    setOpen(true);
  };

  const handleBlur = (event: React.SyntheticEvent) => {
    if (typeOf.function(onBlur)) onBlur(event);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, []);

  const handleSelect = React.useCallback((event: OptionSelectedEvent) => {
    setValue(event.detail.value);
    onChange(event.detail.value);

    if (!keepOpen) {
      setOpen(false);
    }
  }, []);

  const handleInputClick = (event: React.MouseEvent) => {
    if (open) {
      event.stopPropagation();
    }

    if (typeof InputProps?.onClick === 'function') {
      InputProps.onClick(event);
    }
  };

  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;

    const isSelected = value === child.props.value;
    if (isSelected) selectedOptionId.current = child.props.id;
    return React.cloneElement(child, { selected: isSelected });
  });

  return (
    <div
      role="combobox"
      aria-activedescendant={selectedOptionId.current}
      aria-controls={listBoxId}
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-labelledby={ariaLabelledBy}
      id={id}
      tabIndex={0}
    >
      <Input
        {...InputProps}
        disabled={disabled}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={ref}
        value={typeOf.function(renderValue) ? renderValue(value) : value}
        onClick={handleInputClick}
        placeholder={placeholder}
      />
      <Popover
        placement="start-after"
        {...PopoverProps}
        anchorEl={ref.current?.wrapperNode}
        anchorWidth={dropdownMatchSelectWidth}
        onClickAway={handleClickAway}
        open={open}
      >
        <ListBox
          {...PaperProps}
          onOptionSelected={handleSelect}
          id={listBoxId}
          aria-labelledby={ariaLabelledBy}
          tabIndex={-1}
        >
          {items}
        </ListBox>
      </Popover>
    </div>
  );
};

Select.Option = Option;

export default Select;
