import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectComponent from './hookedSelect';

const { Option } = SelectComponent;

export default {
  title: 'Data Entry/Select',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = ({
  value: valueProp,
  ...props
}) => {
  return <SelectComponent {...props} multiple />;
};

export const Select = Template.bind({});

Select.args = {
  autoFocus: false,
  defaultValue: '1',
  defaultOpen: false,
  placeholder: 'Placeholder',
  onChange: () => {},
  options: [
    { label: 'ololo', value: '1' },
    { label: 'kokoko', value: '2' },
  ],
};
