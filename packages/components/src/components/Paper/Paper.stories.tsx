import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Paper } from '@components/Paper';
import { Box } from '@wip/Box';

export default {
  title: 'UI:Components/Paper',
  component: Paper,
  id: 'Paper/Paper',
  argTypes: {
    shadow: {
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      control: 'select',
    },
    shape: {
      options: ['square', 'circle'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof Paper>;

const StoryLayout: React.FC = (props) => {
  return (
    <Box
      style={{
        display: 'grid',
        width: '100%',
        justifyItems: 'center',
      }}
    >
      {props.children}
    </Box>
  );
};

export const Sandbox: ComponentStory<typeof Paper> = (props) => (
  <Paper shadow={props.shadow} shape={props.shape}>
    <Box px="xxl" py="m">
      Paper Content
    </Box>
  </Paper>
);

Sandbox.args = {
  shadow: 1,
  shape: 'circle',
};

export const Shapes: ComponentStory<typeof Paper> = () => (
  <StoryLayout>
    <Paper shape="circle">
      <Box p="xxl">Circle</Box>
    </Paper>
    <Paper shape="square">
      <Box p="xxl">Square</Box>
    </Paper>
  </StoryLayout>
);

export const shadow: ComponentStory<typeof Paper> = () => (
  <StoryLayout>
    {([0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((shadow) => {
      return (
        <Paper shadow={shadow}>
          <Box px="xl" py="l">
            shadow={shadow}
          </Box>
        </Paper>
      );
    })}
  </StoryLayout>
);
