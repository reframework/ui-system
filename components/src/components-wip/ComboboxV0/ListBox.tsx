import { Paper, PaperProps } from '@components/Paper';
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
} & React.HTMLProps<HTMLDivElement>;

const ListBox = React.forwardRef<any, ListBoxProps>((props, ref) => {
  const { getOptionLabel, id, options, renderOption, tabIndex, PaperProps } =
    props;

  return (
    <Paper {...PaperProps} ref={ref} id={id} role="listbox" tabIndex={tabIndex}>
      {options.map(({ value, label, ...optionProps }) => {
        if (isFunction(renderOption)) {
          return renderOption(optionProps, { value, label });
        }

        return (
          <Option
            {...optionProps}
            key={optionProps.id}
            value={value}
            label={getOptionLabel({ value, label })}
          />
        );
      })}
    </Paper>
  );
});

export default ListBox;
