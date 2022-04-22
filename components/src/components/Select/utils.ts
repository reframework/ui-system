import { isArray, isString } from '@utils/assert';
import { OptionItem, SelectValue } from './types';

export const defaultRenderValue = (value: SelectValue) => {
  if (isArray(value)) return value.join(', ');
  if (isString(value)) return value as string;
  return '';
};

export const defaultGetOptionLabel = (opt: OptionItem) => opt.label;

export const getDefaultValue = (
  defaultValue: SelectValue | undefined,
  multiple: boolean,
) => {
  if (multiple) {
    if (isArray(defaultValue)) return defaultValue;
    if (isString(defaultValue)) return [defaultValue];
    return [];
  }

  if (isString(defaultValue)) return defaultValue;
  return '';
};

export const defaultGetOptionDisabled = () => false;

export const defaultGetOptionMatch = (
  option: OptionItem,
  inputValue: string,
) => {
  return new RegExp(inputValue, 'ig').test(option.value as string);
};

export const defaultGetOptionSelected = (
  opt: OptionItem,
  value?: SelectValue,
) => {
  if (isArray(value)) {
    // Multiple mode
    return value.findIndex((it) => it === opt.value) !== -1;
  }

  return value === opt.value;
};

export const defaultMatch = (optionValue: string, value: string) => {
  return new RegExp(value as string, 'ig').test(optionValue);
};
