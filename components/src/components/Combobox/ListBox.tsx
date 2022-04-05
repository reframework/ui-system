import Paper, { PaperProps } from '../Paper/Paper';
import React from 'react';
import { isFunction } from '../../utils';
import Option from './Option';
import { SelectProps, UseComboboxReturnType } from './types';

type ListBoxProps = {
  getOptionLabel: NonNullable<SelectProps['getOptionLabel']>;
  id?: string;
  options: UseComboboxReturnType['options'];
  PaperProps?: PaperProps;
  renderOption: SelectProps['renderOption'];
  tabIndex?: number;
};

const ListBox: React.FC<ListBoxProps & React.HTMLProps<HTMLDivElement>> = ({
  getOptionLabel,
  id,
  options,
  renderOption,
  tabIndex,
  PaperProps,
}) => {
  return (
    <Paper {...PaperProps} id={id} role="listbox" tabIndex={tabIndex}>
      {options.map(({ value, label, ...optionProps }) => {
        if (isFunction(renderOption)) {
          return renderOption(optionProps, { value, label });
        }

        return (
          <Option
            {...optionProps}
            value={value}
            label={getOptionLabel({ value, label })}
          />
        );
      })}
    </Paper>
  );
};

export default ListBox;
