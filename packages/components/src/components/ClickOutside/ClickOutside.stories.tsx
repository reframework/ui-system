import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@wip/Box';
import { Paper } from '@components/Paper';
import UIClickOutside from './ClickOutside';

export default {
  title: 'Utils/ClickOutside',
  component: UIClickOutside,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof UIClickOutside>;

export const ClickEvent: ComponentStory<typeof UIClickOutside> = () => {
  const onClickOutside = () => alert('Clicked');

  return (
    <UIClickOutside onClickOutside={onClickOutside}>
      <Paper>
        <Box p="xxl">Click outside!</Box>
      </Paper>
    </UIClickOutside>
  );
};

export const MousedownEvent: ComponentStory<typeof UIClickOutside> = () => {
  const onClickOutside = () => alert('Clicked');

  return (
    <UIClickOutside onClickOutside={onClickOutside} mouseEvent="mousedown">
      <Paper>
        <Box p="xxl">Click outside!</Box>
      </Paper>
    </UIClickOutside>
  );
};
