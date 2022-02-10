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
