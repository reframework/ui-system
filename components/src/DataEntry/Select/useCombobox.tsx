import {
  isArray,
  isFunction,
  useAriaActiveDescendant,
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
  OptionItem,
  SelectValue,
  UseComboboxProps,
  UseComboboxReturnType,
} from './types';

const useCombobox = ({
  defaultOpen,
  defaultValue,
  disabled,
  getOptionDisabled = defaultGetOptionDisabled,
  getOptionFiltered = defaultGetOptionFiltered,
  getOptionSelected = defaultGetOptionSelected,
  multiple = false,
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
  const {
    activeDescendant,
    onFocus: handleOptionFocus,
    onBlur: handleOptionBlur,
  } = useAriaActiveDescendant();

  const handleClickAway = (event: Event) => {
    if (isFunction(onClickAway)) onClickAway(event);
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (isFunction(onClick)) onClick(event);
    if (openOnClick && !open) setOpen(true);
  };

  const handleFocus = (event: React.SyntheticEvent) => {
    if (isFunction(onFocus)) onFocus(event);
    if (openOnFocus && !open) setOpen(true);
  };

  /**
   * Option Click Handler
   */
  const handleOptionClick = (option: OptionItem) => () => {
    let nextValue: SelectValue;

    if (isArray(value)) {
      if (value.indexOf(option.value) === -1) {
        // Multiple mode selection
        nextValue = [...value, option.value];
      } else {
        // Multiple mode deselection
        nextValue = value.filter((it) => it !== option.value);
      }
    } else if (value !== option.value) {
      // Single mode selection
      nextValue = option.value;
    } else {
      // Single mode deselection
      nextValue = '';
    }

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

    return {
      disabled: getOptionDisabled(option),
      id: `opt-${option.value}`,
      onBlur: handleOptionBlur,
      onClick: handleOptionClick(option),
      onFocus: handleOptionFocus,
      selected: getOptionSelected(option, value),
      tabIndex: 0,
      ...option,
    };
  };

  return {
    open,
    disabled: Boolean(disabled),
    hasValue,
    setValue,
    onFocus: handleFocus,
    onClick: handleClick,
    onClickAway: handleClickAway,
    setOpen: setOpen,
    activeDescendant: activeDescendant,
    rawValue: value,
    value: renderValue(value),
    // @ts-expect-error
    options: options.map(getOptionProps).filter(Boolean),
  };
};

export default useCombobox;
