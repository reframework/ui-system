import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResponsiveComponent from './Responsive';

export default {
  title: 'Containers/Responsive',
  component: ResponsiveComponent,
} as ComponentMeta<typeof ResponsiveComponent>;

const Template: ComponentStory<typeof ResponsiveComponent> = () => (
  <ResponsiveComponent aspectRatio="16:2">
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'green',
        color: 'white',
      }}
    >
      Responsive
    </div>
  </ResponsiveComponent>
);

export const Responsive = Template.bind({});

Responsive.args = {};
