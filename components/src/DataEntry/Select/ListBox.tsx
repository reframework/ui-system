import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import React from 'react';
import { isFunction } from './utils';
import Option from './Option';
import { SelectProps } from './_Select';
import { UseSelectReturnType } from './types';

type ListBoxProps = {
  getOptionLabel: NonNullable<SelectProps['getOptionLabel']>;
  id?: string;
  options: UseSelectReturnType['options'];
  renderOption: SelectProps['renderOption'];
  tabIndex?: number;
  PaperProps?: PaperProps;
};

const ListBox: React.FC<ListBoxProps & React.HTMLProps<HTMLDivElement>> = ({
  getOptionLabel,
  id,
  options,
  renderOption,
  tabIndex = -1,
  PaperProps,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <Paper {...PaperProps} ref={ref} id={id} role="listbox" tabIndex={tabIndex}>
      {options.map(({ value, label, ...optionProps }) => {
        const option = { value, label };

        if (isFunction(renderOption)) {
          return renderOption(optionProps, option);
        }

        return (
          <Option {...optionProps} value={value}>
            {getOptionLabel(option)}
          </Option>
        );
      })}
    </Paper>
  );
};

export default ListBox;
