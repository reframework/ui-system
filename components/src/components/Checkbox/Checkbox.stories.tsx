import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxComponent from './Checkbox';
import { Box } from '../Box';

export default {
  title: 'Data Entry/Checkbox',
  component: CheckboxComponent,
} as ComponentMeta<typeof CheckboxComponent>;

const Template: ComponentStory<typeof CheckboxComponent> = ({ ...props }) => (
  <Box>
    <Box mt="s">
      Controlled:
      <CheckboxComponent {...props} />
    </Box>
    <Box mt="l">
      Uncontrolled:
      <CheckboxComponent defaultChecked={false} />
    </Box>
  </Box>
);

export const Checkbox = Template.bind({});

Checkbox.args = {
  id: 'example',
  disabled: false,
  checked: false,
  indeterminate: false,
  name: 'example',
};
