import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextComponent from './Text';

export default {
  title: 'UI:Components/Text',
  component: TextComponent,
  argTypes: {
    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'select' },
    },
    component: {
      options: [
        'a',
        'button',
        'em',
        'h1',
        'h2',
        'h3',
        'p',
        'pre',
        'small',
        'span',
        'strong',
      ],
      control: { type: 'select' },
    },
    font: {
      options: ['primary', 'secondary', 'monospace', 'italic'],
      control: { type: 'select' },
    },
    size: {
      options: ['xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
      control: { type: 'select' },
    },
    color: {
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'success',
        'neutral',
        'default',
      ],
      control: { type: 'select' },
    },
    weight: {
      options: [
        'thin',
        'light',
        'regular',
        'medium',
        'semibold',
        'bold',
        'black',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof TextComponent>;

const Template: ComponentStory<typeof TextComponent> = ({
  children,
  ...props
}) => (
  <div
    style={{
      width: '100%',
      overflow: 'hidden',
      margin: 'auto',
      maxWidth: '500px',
    }}
  >
    <TextComponent {...props} children={children} />
  </div>
);

export const Text = Template.bind({});

Text.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  component: 'p',
  align: 'left',
  ellipsis: false,
  font: 'primary',
  nowrap: false,
  size: 'm',
  underline: false,
  uppercase: false,
  color: 'primary',
  weight: 'regular',
  stretch: true,
};
