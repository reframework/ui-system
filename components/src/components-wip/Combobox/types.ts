import React from 'react';
import { PopoverProps } from '@components/Popover';
import { PaperProps } from '@components/Paper';
import { InputProps } from '../Input/Input';
import { OptionProps } from './Option';

export type Optional<T> = T | undefined;

export interface OptionItem {
  value: string;
  label: React.ReactNode;
}

export type SelectValue = string | string[];

export interface SelectProps {
  autoFocus?: boolean;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  defaultValue?: SelectValue;
  disabled?: boolean;
  name?: string;
  onBlur?: (e: React.SyntheticEvent) => void;
  onChange: (value: SelectValue) => void;
  onClose?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onOpen?: () => void;
  open?: boolean;
  PaperProps?: PaperProps;
  placeholder?: string;
  PopoverProps?: PopoverProps;
  value?: SelectValue;
  matchWidth?: true | number;
  openOnFocus?: boolean;
  openOnClick?: boolean;
  onClickAway?: (e: Event) => void;
  multiple?: boolean;
  notFoundContent?: React.ReactNode;
  options: OptionItem[];
  renderValue?: (v: Optional<SelectValue>) => string;
  renderOption: (
    props: Partial<Omit<OptionProps, keyof OptionItem>>,
    option: OptionItem,
  ) => React.ReactNode;
  getOptionDisabled?: (option: OptionItem) => boolean;
  getOptionSelected?: (
    option: OptionItem,
    value: Optional<SelectValue>,
  ) => boolean;
  getOptionLabel?: (option: OptionItem) => React.ReactNode;
  getOptionFiltered?: (option: OptionItem) => boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  listBoxId?: string;
  tabIndex?: number;
  //
  placement: PopoverProps['placement'];
}

export interface UseComboboxReturnType {
  activeDescendant?: string;
  disabled: boolean;
  hasValue: boolean;
  onBlur: (e: React.FocusEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  onClickAway: (e: Event) => void;
  onFocus: (e: React.FocusEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
  open: boolean;
  options: {
    disabled: boolean;
    id: string;
    onBlur: (e: React.FocusEvent) => void;
    onClick: (e: React.MouseEvent) => void;
    onFocus: (e: React.FocusEvent) => void;
    selected: boolean;
    tabIndex: number;
    value: string;
    label: string;
  }[];
  rawValue: SelectValue;
  role: 'combobox';
  setOpen: (v: boolean) => void;
  setValue: (v: SelectValue) => void;
  value: React.ReactNode | undefined;
}

export type UseComboboxProps = Pick<
  SelectProps,
  | 'defaultOpen'
  | 'defaultValue'
  | 'disabled'
  | 'getOptionDisabled'
  | 'getOptionFiltered'
  | 'getOptionSelected'
  | 'multiple'
  | 'onBlur'
  | 'onChange'
  | 'onClick'
  | 'onClickAway'
  | 'onFocus'
  | 'open'
  | 'openOnClick'
  | 'openOnFocus'
  | 'options'
  | 'renderValue'
  | 'value'
>;

export interface AutocompleteProps extends Omit<SelectProps, 'multiple'> {
  filterSelectedOptions?: boolean;
  inputValue?: string;
  InputProps: InputProps;
  onInputChange: (event: React.ChangeEvent) => void;
  includeInputInList?: boolean;
  renderInput: () => React.ReactNode;
  readOnly?: boolean;
  match?: (optionValue: string, value: string) => boolean;
  openOnKeyDown?: boolean;
}
