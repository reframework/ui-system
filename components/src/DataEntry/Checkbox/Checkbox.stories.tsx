import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxComponent from './Checkbox';

export default {
  title: 'Data Entry/Checkbox',
  component: CheckboxComponent,
} as ComponentMeta<typeof CheckboxComponent>;

const Template: ComponentStory<typeof CheckboxComponent> = ({ ...props }) => (
  <CheckboxComponent {...props} />
);

export const Checkbox = Template.bind({});

Checkbox.args = {
  id: 'example',
  disabled: false,
  checked: false,
  value: 'example',
  name: 'example',
};
