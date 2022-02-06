import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PaperComponent from './Paper';

export default {
  title: 'Containers/Paper',
  component: PaperComponent,
  argTypes: {
    reflection: {
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      control: 'select',
    },
  },
} as ComponentMeta<typeof PaperComponent>;

const Template: ComponentStory<typeof PaperComponent> = (props) => (
  <PaperComponent {...props} />
);

export const Paper = Template.bind({});

Paper.args = {
  reflection: 1,
  square: false,
  children: <div>Paper</div>,
};
