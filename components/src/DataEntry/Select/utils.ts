import { isArray, isString } from '../../utils';
import { Optional, OptionItem, SelectValue } from './types';

export const defaultRenderValue = (value: Optional<string | string[]>) => {
  if (isArray(value)) return value.join(', ');
  if (isString(value)) return value as string;
  return '';
};

export const defaultGetOptionLabel = (opt: OptionItem) => opt.label;

export const getDefaultValue = (
  defaultValue: Optional<SelectValue>,
  multiple: boolean
) => {
  if (multiple) {
    if (isArray(defaultValue)) return defaultValue;
    if (isString(defaultValue)) return [defaultValue];
    return [];
  }

  if (isString(defaultValue)) return defaultValue;
  return '';
};

export const defaultGetOptionDisabled = (_: OptionItem) => false;

export const defaultGetOptionSelected = (
  opt: OptionItem,
  value?: SelectValue
) => {
  if (isArray(value)) {
    return value.findIndex((it) => it === opt.value) >= 0;
  }
  return value === opt.value;
};

export const defaultGetOptionFiltered = (_: OptionItem) => true;

export const defaultMatch = (optionValue: string, value: string) => {
  return new RegExp(value as string, 'ig').test(optionValue);
};
