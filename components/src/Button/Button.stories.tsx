import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonComponent from './Button';

export default {
  title: 'Button/Button',
  component: ButtonComponent,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'success',
        'neutral',
      ],
      control: 'select',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'select',
    },
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: 'select',
    },
    shape: {
      options: ['circle', 'square'],
      control: 'select',
    },
  },
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = ({
  children,
  ...props
}) => <ButtonComponent {...props} children={children} />;

export const Button = Template.bind({});

Button.args = {
  children: 'Button',
  color: 'primary',
  variant: 'contained',
  disabled: false,
  shape: 'square',
  size: 'medium',
  stretch: false,
};
