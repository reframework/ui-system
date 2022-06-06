import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpinnerComponent from './Spinner';

export default {
  title: 'Processing/Spinner',
  component: SpinnerComponent,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof SpinnerComponent>;

const Template: ComponentStory<typeof SpinnerComponent> = ({ size, color }) => (
  <SpinnerComponent size={size} color={color} />
);

export const Spinner = Template.bind({});

Spinner.args = {
  size: 100,
  color: 'blue',
};
