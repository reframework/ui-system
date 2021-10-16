import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioComponent from './Radio';

export default {
  title: 'Data Entry/Radio',
  component: RadioComponent,
  argTypes: {
    // checked: {
    //   options: ['left', 'center', 'right'],
    //   control: { type: 'select' },
    // },
  },
} as ComponentMeta<typeof RadioComponent>;

const Template: ComponentStory<typeof RadioComponent> = ({ ...props }) => (
  <>
    <RadioComponent {...props} />
    <RadioComponent {...props} checked={false} />
    <RadioComponent {...props} disabled={true} />
  </>
);

export const Radio = Template.bind({});

Radio.args = {
  checked: true,
};
