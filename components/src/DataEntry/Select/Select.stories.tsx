import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectComponent from './Select';

const { Option } = SelectComponent;

export default {
  title: 'Data Entry/Select',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = ({
  value: valueProp,
  ...props
}) => {
  return <SelectComponent {...props} />;
};

export const Select = Template.bind({});

Select.args = {
  autoFocus: false,
  defaultValue: 'january',
  defaultOpen: false,
  placeholder: 'Placeholder',
  onChange: () => {},
  options: [{ label: '123', value: '123' }],
};
