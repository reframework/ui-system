const useAutocomplete = ({
  autoComplete = false,
  autoHighlight = false,
  autoSelect = false,
  blurOnSelect = false,
  disabled: disabledProp,
  clearOnBlur = !props.freeSolo,
  clearOnEscape = false,
  componentName = 'useAutocomplete',
  defaultValue = props.multiple ? [] : null,
  disableClearable = false,
  disableCloseOnSelect = false,
  disabledItemsFocusable = false,
  disableListWrap = false,
  filterOptions = defaultFilterOptions,
  filterSelectedOptions = false,
  freeSolo = false,
  getOptionDisabled,
  getOptionLabel: getOptionLabelProp = (option) => option.label ?? option,
  isOptionEqualToValue = (option, value) => option === value,
  groupBy,
  handleHomeEndKeys = !props.freeSolo,
  id: idProp,
  includeInputInList = false,
  inputValue: inputValueProp,
  multiple = false,
  onChange,
  onClose,
  onHighlightChange,
  onInputChange,
  onOpen,
  open: openProp,
  openOnFocus = false,
  options,
  readOnly = false,
  selectOnFocus = !props.freeSolo,
  value: valueProp,
}: any) => {
  return null;
};

function validOptionIndex(index, direction) {
  if (!listboxRef.current || index === -1) {
    return -1;
  }

  let nextFocus = index;

  while (true) {
    // Out of range
    if (
      (direction === 'next' && nextFocus === filteredOptions.length) ||
      (direction === 'previous' && nextFocus === -1)
    ) {
      return -1;
    }

    const option = listboxRef.current.querySelector(
      `[data-option-index="${nextFocus}"]`
    );

    // Same logic as MenuList.js
    const nextFocusDisabled = disabledItemsFocusable
      ? false
      : !option ||
        option.disabled ||
        option.getAttribute('aria-disabled') === 'true';

    if ((option && !option.hasAttribute('tabindex')) || nextFocusDisabled) {
      // Move to the next element.
      nextFocus += direction === 'next' ? 1 : -1;
    } else {
      return nextFocus;
    }
  }
}

const setHighlightedIndex = useEventCallback(
  ({ event, index, reason = 'auto' }) => {
    highlightedIndexRef.current = index;

    // does the index exist?
    if (index === -1) {
      inputRef.current.removeAttribute('aria-activedescendant');
    } else {
      inputRef.current.setAttribute(
        'aria-activedescendant',
        `${id}-option-${index}`
      );
    }

    if (onHighlightChange) {
      onHighlightChange(
        event,
        index === -1 ? null : filteredOptions[index],
        reason
      );
    }

    if (!listboxRef.current) {
      return;
    }

    const prev = listboxRef.current.querySelector(
      '[role="option"].Mui-focused'
    );
    if (prev) {
      prev.classList.remove('Mui-focused');
      prev.classList.remove('Mui-focusVisible');
    }

    const listboxNode =
      listboxRef.current.parentElement.querySelector('[role="listbox"]');

    // "No results"
    if (!listboxNode) {
      return;
    }

    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }

    const option = listboxRef.current.querySelector(
      `[data-option-index="${index}"]`
    );

    if (!option) {
      return;
    }

    option.classList.add('Mui-focused');
    if (reason === 'keyboard') {
      option.classList.add('Mui-focusVisible');
    }

    // Scroll active descendant into view.
    // Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
    //
    // Consider this API instead once it has a better browser support:
    // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
    if (
      listboxNode.scrollHeight > listboxNode.clientHeight &&
      reason !== 'mouse'
    ) {
      const element = option;

      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (
        element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) <
        listboxNode.scrollTop
      ) {
        listboxNode.scrollTop =
          element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  }
);
