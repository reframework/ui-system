import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Box from './Box';

export default {
  title: 'WIP/Box',
  component: Box,
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = () => <Box m="xs" px="l" />;

export const Sandbox = Template.bind({});

Sandbox.args = {};
