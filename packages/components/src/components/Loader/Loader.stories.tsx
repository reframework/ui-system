import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CircularProgress from './Loader';

export default {
  title: 'Processing/Loader',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = ({
  size,
  progress,
  color,
  thickness,
}) => (
  <CircularProgress
    size={size}
    progress={progress}
    color={color}
    thickness={thickness}
  />
);

export const Undetermined = Template.bind({});
export const Determined = Template.bind({});

Undetermined.args = {
  size: 100,
  color: 'blue',
  thickness: 5,
};

Determined.args = {
  size: 100,
  progress: 50,
  color: 'blue',
  thickness: 5,
};
