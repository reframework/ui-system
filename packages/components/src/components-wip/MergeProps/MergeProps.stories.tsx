import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@wip/Box';
import { Paper } from '@components/Paper';
import MergeProps from './MergeProps';

export default {
  title: 'Utils/MergeProps',
  component: MergeProps,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof MergeProps>;

export const MergedProps: ComponentStory<typeof MergeProps> = () => {
  const onClick = () => alert('Clicked');

  return (
    <MergeProps onClick={onClick} shadow={9}>
      <Paper shape="circle">
        <Box p="xxl">Merged Props</Box>
      </Paper>
    </MergeProps>
  );
};
