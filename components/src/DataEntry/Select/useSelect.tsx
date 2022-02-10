import {
  defaultGetOptionDisabled,
  defaultGetOptionFiltered,
  defaultGetOptionSelected,
  getDefaultValue,
  isArray,
  isFunction,
  isString,
  useAriaActiveDescendant,
  useControlledState,
} from './utils';
import {
  OptionItem,
  SelectValue,
  UseSelectProps,
  UseSelectReturnType,
} from './types';

const useSelect = ({
  defaultOpen,
  defaultValue,
  disabled,
  getOptionDisabled = defaultGetOptionDisabled,
  getOptionFiltered = defaultGetOptionFiltered,
  getOptionSelected = defaultGetOptionSelected,
  multiple = false,
  onChange,
  open: $open,
  options = [],
  // ---- > backfill boolean false // keyboard autocomplete only
  value: $value,
}: UseSelectProps): UseSelectReturnType => {
  /**
   * Value
   */
  const [value, setValue] = useControlledState({
    controlled: $value,
    // todo: check default value if multiple should be an array
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

  /**
   * Option Click Handler
   */
  const handleOptionClick = (option: OptionItem) => () => {
    let nextValue: SelectValue;

    if (isArray(value)) {
      if (value.indexOf(option.value) === -1) {
        // select
        nextValue = [...value, option.value];
      } else {
        // deselect
        nextValue = value.filter((it) => it !== option.value);
      }
    } else if (isString(value) && value === option.value) {
      // deselect
      nextValue = '';
    } else {
      // select
      nextValue = option.value;
    }

    setValue(nextValue);

    if (isFunction(onChange)) {
      onChange(nextValue);
    }

    setOpen(false);
  };

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
    setOpen: setOpen,
    activeDescendant: activeDescendant,
    value: value,
    // @ts-expect-error
    options: options.map(getOptionProps).filter(Boolean),
  };
};

export default useSelect;
