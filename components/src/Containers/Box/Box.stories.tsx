import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BoxComponent from './Box';

export default {
  title: 'Containers/Box',
  component: BoxComponent,
} as ComponentMeta<typeof BoxComponent>;

const Template: ComponentStory<typeof BoxComponent> = () => <BoxComponent />;

export const Box = Template.bind({});

Box.args = {};
