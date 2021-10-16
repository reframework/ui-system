import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxComponent from './Checkbox';

export default {
  title: 'Data Entry/Checkbox',
  component: CheckboxComponent,
  argTypes: {
    // checked: {
    //   options: ['left', 'center', 'right'],
    //   control: { type: 'select' },
    // },
  },
} as ComponentMeta<typeof CheckboxComponent>;

const Template: ComponentStory<typeof CheckboxComponent> = ({ ...props }) => (
  <CheckboxComponent {...props} />
);

export const Checkbox = Template.bind({});

Checkbox.args = {
  checked: true,
};
