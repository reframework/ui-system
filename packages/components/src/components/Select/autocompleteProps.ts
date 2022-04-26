/**
 * MUI
 * @see https://mui.com/api/autocomplete/
 * renderInput* fun Render the input. (params: object) => ReactNode
 * autoComplete false
 * autoHighlight bool false
 * autoSelect bool false
 * blurOnSelect 'mouse' | 'touch' bool false
 * ChipProps object
 * clearIcon node <ClearIcon fontSize="small" />
 * clearOnBlur bool !props.freeSolo
 * clearOnEscape bool false
 * clearText string 'Clear'
 * closeText string 'Close'
 * defaultValue any props.multiple ? [] : null
 * disableClearable bool false
 * disableCloseOnSelect bool false
 * disabledItemsFocusable bool false
 * disableListWrap bool false
 * disablePortal bool false
 * filterOptions func function(options: Array<T>, state: object) => Array<T>
 * filterSelectedOptions bool false
 * forcePopupIcon 'auto' | bool 'auto'
 * freeSolo bool false // If true, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
 * fullWidth bool false // If true, the input will take up the full width of its container.
 * getLimitTagsText func (more) => `+${more}` function(more: number) => ReactNode
 * getOptionDisabled func function(option: T) => boolean
 * option: The option to test.
 * getOptionLabel func (option) => option.label ?? option function(option: T) => string
 * groupBy func function(options: T) => string
 * options: The options to group.
 * handleHomeEndKeys bool !props.freeSolo
 * id string
 * includeInputInList bool false
 * inputValue string
 * isOptionEqualToValue func function(option: T, value: T) => boolean
 * limitTags integer -1
 * ListboxComponent elementType 'ul'
 * ListboxProps object
 * loading bool false
 * multiple bool false
 * noOptionsText node 'No options'
 * onChange func function(event: React.SyntheticEvent, value: T | Array<T>, reason: string, details?: string) => void
 * event: The event source of the callback.
 * value: The new value of the component.
 * reason: One of "createOption", "selectOption", "removeOption", "blur" or "clear".
 * onClose func function(event: React.SyntheticEvent, reason: string) => void
 * onHighlightChange func function(event: React.SyntheticEvent, option: T, reason: string) => void
 * onInputChange func function(event: React.SyntheticEvent, value: string, reason: string (input|clear|reset)) => void
 * onOpen func function(event: React.SyntheticEvent) => void
 * open bool false
 * openOnFocus bool false
 * openText string 'Open'
 * PaperComponent elementType Paper
 * PopperComponent elementType Popper
 * popupIcon node <ArrowDropDownIcon />
 * readOnly bool false
 * renderGroup func function(params: AutocompleteRenderGroupParams) => ReactNode
 * params: The group to render.
 * renderOption func function(props: object, option: T, state: object) => ReactNode
 * renderTags func function(value: Array<T>, getTagProps: function) => ReactNode
 * value: The value provided to the component.
 * getTagProps: A tag props getter.
 * selectOnFocus bool !props.freeSolo
 * size 'small' | 'medium' | string 'medium'
 * value any
 *
 * ANTD
 * @see https://ant.design/components/auto-complete/
 * allowClear boolean false
 * autoFocus boolean false
 * backfill boolean false // If backfill selected item the input when using keyboard
 * children (for customize input element) Customize input element HTMLInputElement | HTMLTextAreaElement | React.ReactElement<InputProps> <Input />
 * children (for dataSource) Data source to auto complete React.ReactElement<OptionProps> | Array<React.ReactElement<OptionProps>> -
 * defaultActiveFirstOption boolean true
 * defaultOpen boolean -
 * defaultValue string -
 * disabled boolean false
 * dropdownClassName string -
 * dropdownMatchSelectWidth boolean | number true
 * filterOption function(inputValue, option) true
 * notFoundContent string Not Found
 * open boolean -
 * options { label, value }[] -
 * placeholder string -
 * value string -
 * onBlur function() -
 * onChange function(value) -
 * onDropdownVisibleChange function(open) -
 * onFocus function() -
 * onSearch function(value) -
 * onSelect function(value, option) -
 */

export interface Props<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> {
  /** HTML ID of an element containing an error message related to the input**/
  'aria-errormessage'?: AriaAttributes['aria-errormessage'];
  /** Indicate if the value entered in the field is invalid **/
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  /** Aria label (for assistive tech) */
  'aria-label'?: AriaAttributes['aria-label'];
  /** HTML ID of an element that should be used as the label (for assistive tech) */
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  /** Used to set the priority with which screen reader should treat updates to live regions. The possible settings are: off, polite (default) or assertive */
  'aria-live'?: AriaAttributes['aria-live'];
  /** Customize the messages used by the aria-live component */
  ariaLiveMessages?: AriaLiveMessages<Option, IsMulti, Group>;
  /** Focus the control when it is mounted */
  autoFocus?: boolean;
  /** Remove the currently focused option when the user presses backspace when Select isClearable or isMulti */
  backspaceRemovesValue: boolean;
  /** Remove focus from the input when the user selects an option (handy for dismissing the keyboard on touch devices) */
  blurInputOnSelect: boolean;
  /** When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent  */
  captureMenuScroll: boolean;
  /** Sets a className attribute on the outer component */
  className?: string;
  /**
   * If provided, all inner components will be given a prefixed className attribute.
   *
   * This is useful when styling via CSS classes instead of the Styles API approach.
   */
  classNamePrefix?: string | null;
  /** Close the select menu when the user selects an option */
  closeMenuOnSelect: boolean;
  /**
   * If `true`, close the select menu when the user scrolls the document/body.
   *
   * If a function, takes a standard javascript `ScrollEvent` you return a boolean:
   *
   * `true` => The menu closes
   *
   * `false` => The menu stays open
   *
   * This is useful when you have a scrollable modal and want to portal the menu out,
   * but want to avoid graphical issues.
   */
  closeMenuOnScroll: boolean | ((event: Event) => boolean);
  /**
   * This complex object includes all the compositional components that are used
   * in `react-select`. If you wish to overwrite a component, pass in an object
   * with the appropriate namespace.
   *
   * If you only wish to restyle a component, we recommend using the `styles` prop
   * instead. For a list of the components that can be passed in, and the shape
   * that will be passed to them, see [the components docs](/components)
   */
  components: SelectComponentsConfig<Option, IsMulti, Group>;
  /** Whether the value of the select, e.g. SingleValue, should be displayed in the control. */
  controlShouldRenderValue: boolean;
  /** Delimiter used to join multiple values into a single HTML Input value */
  delimiter?: string;
  /** Clear all values when the user presses escape AND the menu is closed */
  escapeClearsValue: boolean;
  /** Custom method to filter whether an option should be displayed in the menu */
  filterOption:
    | ((option: FilterOptionOption<Option>, inputValue: string) => boolean)
    | null;
  /**
   * Formats group labels in the menu as React components
   *
   * An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.
   */
  formatGroupLabel: (group: Group) => ReactNode;
  /** Formats option labels in the menu and control as React components */
  formatOptionLabel?: (
    data: Option,
    formatOptionLabelMeta: FormatOptionLabelMeta<Option>,
  ) => ReactNode;
  /**
   * Resolves option data to a string to be displayed as the label by components
   *
   * Note: Failure to resolve to a string type can interfere with filtering and
   * screen reader support.
   */
  getOptionLabel: GetOptionLabel<Option>;
  /** Resolves option data to a string to compare options and specify value attributes */
  getOptionValue: GetOptionValue<Option>;
  /** Hide the selected option from the menu */
  hideSelectedOptions?: boolean;
  /** The id to set on the SelectContainer component. */
  id?: string;
  /** The value of the search input */
  inputValue: string;
  /** The id of the search input */
  inputId?: string;
  /** Define an id prefix for the select components e.g. {your-id}-value */
  instanceId?: number | string;
  /** Is the select value clearable */
  isClearable?: boolean;
  /** Is the select disabled */
  isDisabled: boolean;
  /** Is the select in a state of loading (async) */
  isLoading: boolean;
  /**
   * Override the built-in logic to detect whether an option is disabled
   *
   * An example can be found in the [Replacing builtins](/advanced#replacing-builtins) documentation.
   */
  isOptionDisabled: (option: Option, selectValue: Options<Option>) => boolean;
  /** Override the built-in logic to detect whether an option is selected */
  isOptionSelected?: (option: Option, selectValue: Options<Option>) => boolean;
  /** Support multiple selected options */
  isMulti: IsMulti;
  /** Is the select direction right-to-left */
  isRtl: boolean;
  /** Whether to enable search functionality */
  isSearchable: boolean;
  /** Async: Text to display when loading options */
  loadingMessage: (obj: { inputValue: string }) => ReactNode;
  /** Minimum height of the menu before flipping */
  minMenuHeight: number;
  /** Maximum height of the menu before scrolling */
  maxMenuHeight: number;
  /** Whether the menu is open */
  menuIsOpen: boolean;
  /**
   * Default placement of the menu in relation to the control. 'auto' will flip
   * when there isn't enough space below the control.
   */
  menuPlacement: MenuPlacement;
  /** The CSS position value of the menu, when "fixed" extra layout management is required */
  menuPosition: MenuPosition;
  /**
   * Whether the menu should use a portal, and where it should attach
   *
   * An example can be found in the [Portaling](/advanced#portaling) documentation
   */
  menuPortalTarget?: HTMLElement | null;
  /** Whether to block scroll events when the menu is open */
  menuShouldBlockScroll: boolean;
  /** Whether the menu should be scrolled into view when it opens */
  menuShouldScrollIntoView: boolean;
  /** Name of the HTML Input (optional - without this, no input will be rendered) */
  name?: string;
  /** Text to display when there are no options */
  noOptionsMessage: (obj: { inputValue: string }) => ReactNode;
  /** Handle blur events on the control */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Handle change events on the select */
  onChange: (
    newValue: OnChangeValue<Option, IsMulti>,
    actionMeta: ActionMeta<Option>,
  ) => void;
  /** Handle focus events on the control */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /** Handle change events on the input */
  onInputChange: (newValue: string, actionMeta: InputActionMeta) => void;
  /** Handle key down events on the select */
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  /** Handle the menu opening */
  onMenuOpen: () => void;
  /** Handle the menu closing */
  onMenuClose: () => void;
  /** Fired when the user scrolls to the top of the menu */
  onMenuScrollToTop?: (event: WheelEvent | TouchEvent) => void;
  /** Fired when the user scrolls to the bottom of the menu */
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
  /** Allows control of whether the menu is opened when the Select is focused */
  openMenuOnFocus: boolean;
  /** Allows control of whether the menu is opened when the Select is clicked */
  openMenuOnClick: boolean;
  /** Array of options that populate the select menu */
  options: OptionsOrGroups<Option, Group>;
  /** Number of options to jump in menu when page{up|down} keys are used */
  pageSize: number;
  /** Placeholder for the select value */
  placeholder: ReactNode;
  /** Status to relay to screen readers */
  screenReaderStatus: (obj: { count: number }) => string;
  /**
   * Style modifier methods
   *
   * A basic example can be found at the bottom of the [Replacing builtins](/advanced#replacing-builtins) documentation.
   */
  styles: StylesConfig<Option, IsMulti, Group>;
  /** Theme modifier method */
  theme?: ThemeConfig;
  /** Sets the tabIndex attribute on the input */
  tabIndex: number;
  /** Select the currently focused option when the user presses tab */
  tabSelectsValue: boolean;
  /** The value of the select; reflected by the selected option */
  value: PropsValue<Option>;
  /** Sets the form attribute on the input */
  form?: string;
}

export const defaultProps = {
  'aria-live': 'polite',
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabelBuiltin,
  getOptionLabel: getOptionLabelBuiltin,
  getOptionValue: getOptionValueBuiltin,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabledBuiltin,
  loadingMessage: () => 'Loading...',
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !isMobileDevice(),
  noOptionsMessage: () => 'No options',
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: ({ count }: { count: number }) =>
    `${count} result${count !== 1 ? 's' : ''} available`,
  styles: {},
  tabIndex: 0,
  tabSelectsValue: true,
};
