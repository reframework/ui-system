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
  const [value, setValue] = useState(valueProp || '');

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const onChange = (nextValue: string) => {
    setValue(nextValue);
  };

  return <SelectComponent {...props} onChange={onChange} value={value} />;
};

export const Input = Template.bind({});

Input.args = {
  value: 'january',
  onChange: () => {},
  children: [
    <Option key="1" value="january">
      January ---
    </Option>,
    <Option key="2" value="february">
      February -
    </Option>,
    <Option key="3" value="march">
      March ++
    </Option>,
    <Option key="4" value="april">
      April +
    </Option>,
    <Option key="5" value="may">
      May +
    </Option>,
  ],
  options: [
    {
      value: '123',
      label: '321',
    },
  ],
};
