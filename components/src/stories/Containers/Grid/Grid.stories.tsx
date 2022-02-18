import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from '../../../components/Flex';

export default {
  title: 'Containers/Grid',
  component: Flex,
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = () => <Flex m="xs" px="l" />;

export const Sandbox = Template.bind({});

Sandbox.args = {};
