import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Ripple from './Ripple';

export default {
  title: 'Ripple/Ripple',
  component: Ripple,
} as ComponentMeta<typeof Ripple>;

const Template: ComponentStory<typeof Ripple> = ({ children, ...props }) => (
  <Ripple {...props} children={children} />
);

export const Button = Template.bind({});

Button.args = {
  children: 'Ripple',
};
