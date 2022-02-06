import React from 'react';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import Input, { InputProps, Refs } from '../Input/Input';
import styles from './Select.css?module';
import Option from './Option';

const useBoolean = (initialState = false) => {
  const [state, setState] = React.useState(initialState);

  const setTrue = React.useCallback(() => {
    setState(true);
  }, []);

  const setFalse = React.useCallback(() => {
    setState(false);
  }, []);

  const toggle = React.useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return {
    state,
    setTrue,
    setFalse,
    toggle,
  };
};

export interface SelectProps {
  // Options
  children: React.ReactNode;
  // Styled components support
  className?: string;
  // nested
  InputProps: InputProps;
  PopoverProps: PopoverProps;
  PaperProps: PaperProps;

  // -- Select Core
  autoFocus?: boolean;
  disabled?: boolean;
  name: string;
  onChange: (value: string) => void;
  value: string;
  onBlur?: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;

  // readOnly?: () => void;
  // multiple?: boolean;
  // -- change input
  // renderValue?: (value: string) => React.ReactNode;
  // -- uncontrolled
  // defaultValue?: string;
  // defaultOpen?:boolean;
  // open,

  // -- Dropdown
  keepOpen?: boolean;
  // autoWidth,
  // dropdownMatchSelectWidth = true,
  // listHeight = 200,
  // onClose,
  // onOpen,
  // showFirst = 5

  // -- Search (Autocomplete)
  // inputValue,
  // searchValue,
  // onSearch,
  // autoClearSearchValue = true,

  // -- Refs
  // inputRef: inputRefProp,

  // -- Ally
  // 'aria-describedby': ariaDescribedby,
  // 'aria-label': ariaLabel,
  // tabIndex: tabIndexProp,
  // catching `type` from Input which makes no sense for SelectInput
  // type,
}

const Select = ({
  autoFocus = false,
  disabled,
  onChange,
  value,
  onFocus,
  onBlur,
  name,
  //
  children,
  PaperProps,
  PopoverProps,
  InputProps,
  keepOpen = false,
}: SelectProps) => {
  const ref = React.useRef<Refs>();

  const { state: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

  React.useEffect(() => {
    if (!autoFocus) return;
    // Autofocus
    ref.current?.input?.current?.focus?.();
  }, []);

  const handleFocus = (event: React.SyntheticEvent) => {
    open();

    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.SyntheticEvent) => {
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  };

  const handleClickAway = ({ target }: Event) => {
    if (target === ref.current?.input.current) return;
    close();
  };

  const handleItemClick =
    (child: React.ReactElement) => (event: React.MouseEvent) => {
      if (typeof child.props.onClick === 'function') {
        // calls Option's own onClick
        child.props.onClick(event);
      }

      if (child.props.disabled) {
        return;
      }

      if (!keepOpen) {
        close();
      }

      onChange(child.props.value);
    };

  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    // TODO: check
    const selected = value === child.props.value;

    return React.cloneElement(child, {
      onClick: handleItemClick(child),
      selected,
    });
  });

  return (
    <>
      <Input
        {...InputProps}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        role="listbox"
        disabled={disabled}
        name={name}
      />
      <Popover
        placement="start-after"
        {...PopoverProps}
        anchorEl={ref.current?.wrapper.current}
        anchorWidth
        onClickAway={handleClickAway}
        open={isOpen}
      >
        <Paper {...PaperProps}>
          <ul className={styles.list}>{items}</ul>
        </Paper>
      </Popover>
    </>
  );
};

Select.Option = Option;

export default Select;
