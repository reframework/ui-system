import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioComponent from './Radio';

export default {
  title: 'Data Entry/Radio',
  component: RadioComponent,
} as ComponentMeta<typeof RadioComponent>;

const Template: ComponentStory<typeof RadioComponent> = ({ ...props }) => (
  <RadioComponent {...props} />
);

export const Radio = Template.bind({});

Radio.args = {
  id: 'example',
  disabled: false,
  checked: false,
  value: 'example',
  name: 'example',
};
