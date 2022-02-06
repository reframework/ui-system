import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectComponent from './Select';

export default {
  title: 'Data Entry/Select',
  component: SelectComponent,
  argTypes: {
    // size: {
    //   options: ['small', 'medium', 'large'],
    //   control: { type: 'select' },
    // },
  },
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = (props) => (
  <SelectComponent {...props} />
);

export const Input = Template.bind({});

Input.args = {
  value: '123',
  onChange: ()=> {},
  children: (
    <>
      <div>123</div>
      <div>321</div>
    </>
  ),
  options: [
    {
      value: '123',
      label: '321',
    },
  ],
};
