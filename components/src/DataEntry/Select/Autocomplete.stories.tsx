import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AutocompleteComponent from './Autocomplete';

export default {
  title: 'Data Entry/Autocomplete',
  component: AutocompleteComponent,
} as ComponentMeta<typeof AutocompleteComponent>;

const Template: ComponentStory<typeof AutocompleteComponent> = ({
  value: valueProp,
  ...props
}) => {
  return <AutocompleteComponent {...props} multiple />;
};

export const Autocomplete = Template.bind({});

Autocomplete.args = {
  autoFocus: false,
  defaultValue: '1',
  defaultOpen: false,
  placeholder: 'Placeholder',
  onChange: () => {},
  options: [
    { label: 'ololo', value: '1' },
    { label: 'kokoko', value: '2' },
    { label: 'trololo', value: '31' },
    { label: 'trokokoko', value: '412' },
  ],
};
