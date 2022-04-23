import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@wip/Box';
import { Text } from '@components/Text';
import CheckboxComponent from './Checkbox';

export default {
  title: 'Reframework:UI/Checkbox',
  component: CheckboxComponent,
} as ComponentMeta<typeof CheckboxComponent>;

const Template: ComponentStory<typeof CheckboxComponent> = ({ ...props }) => (
  <Box>
    <Box mt="s">
      <Text>Controlled:</Text>
      <CheckboxComponent {...props} />
    </Box>
    <Box mt="l">
      <Text>Uncontrolled:</Text>
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
