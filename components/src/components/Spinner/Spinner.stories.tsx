import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SpinnerComponent from './Spinner';
import Spinner2Component from './Spinner2';

export default {
  title: 'Processing/Spinner',
  component: SpinnerComponent,
} as ComponentMeta<typeof SpinnerComponent>;

const Template: ComponentStory<typeof SpinnerComponent> = ({ size, color }) => (
  <Spinner2Component size={size} color={color} />
);

export const Spinner = Template.bind({});

Spinner.args = {
  size: 100,
  color: 'blue',
};
