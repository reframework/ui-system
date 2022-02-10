import React from 'react';
import { PaperProps } from '../../Containers/Paper/Paper';
import { PopoverProps } from '../../Messaging/Popover/Popover';
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
  dropdownMatchSelectWidth?: true | number;
  openOnFocus?: boolean;
  filterSelectedOptions: Boolean;
  multiple?: boolean;
  notFoundContent?: React.ReactNode;
  options: OptionItem[];
  renderValue?: (v: Optional<SelectValue>) => string;
  renderOption: (
    props: Partial<OptionProps>,
    option: OptionItem
  ) => React.ReactNode;
  getOptionDisabled?: (option: OptionItem) => boolean;
  getOptionSelected?: (
    option: OptionItem,
    value: Optional<SelectValue>
  ) => boolean;
  getOptionLabel?: (option: OptionItem) => React.ReactNode;
  getOptionFiltered?: (option: OptionItem) => boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  listBoxId?: string;
  tabIndex?: number;
}

export interface UseSelectReturnType {
  activeDescendant?: string;
  disabled: boolean;
  hasValue: boolean;
  open: boolean;
  role: 'combobox';
  setOpen: (v: boolean) => void;
  value: SelectValue;
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
}

export type UseSelectProps = Pick<
  SelectProps,
  | 'defaultOpen'
  | 'defaultValue'
  | 'disabled'
  | 'onChange'
  | 'open'
  | 'options'
  | 'getOptionDisabled'
  | 'getOptionSelected'
  | 'getOptionFiltered'
  | 'value'
  | 'multiple'
>;
