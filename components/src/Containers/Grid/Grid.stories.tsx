import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GridComponent from './Grid';

export default {
  title: 'Containers/Grid',
  component: GridComponent,
} as ComponentMeta<typeof GridComponent>;

const Template: ComponentStory<typeof GridComponent> = () => <GridComponent />;

export const Grid = Template.bind({});

Grid.args = {};
