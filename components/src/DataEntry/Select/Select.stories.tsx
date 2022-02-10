import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectComponent from './Select';

const { Option } = SelectComponent;

export default {
  title: 'Data Entry/Select',
  component: SelectComponent,
  // argTypes: {},
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = ({
  value: valueProp,
  ...props
}) => {
  return <SelectComponent {...props} />;
};

export const Select = Template.bind({});

Select.args = {
  autoFocus: false,
  defaultValue: 'january',
  defaultOpen: false,
  placeholder: 'Placeholder',
  onChange: () => {},
  children: [
    <Option key="1" value="january" id="january">
      January ---
    </Option>,
    <Option key="2" value="february" id="february">
      February -
    </Option>,
    <Option key="3" value="march" id="march">
      March ++
    </Option>,
    <Option key="4" value="april" id="april">
      April +
    </Option>,
    <Option key="5" value="may" id="may">
      May +
    </Option>,
  ],
};
