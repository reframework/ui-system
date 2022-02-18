import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Paper } from '../../../components/Paper';
import { Box } from '../../../components/Box';
import { Grid } from '../../../components/Grid';

const StoryLayout: React.FC = (props) => {
  return (
    <Grid
      style={{
        display: 'grid',
        width: '100%',
      }}
      justifyItems="center"
      cols={2}
      gap="m"
    >
      {props.children}
    </Grid>
  );
};

export const Sandbox: ComponentStory<typeof Paper> = (props) => (
  <Paper levitation={props.levitation} shape={props.shape}>
    <Box px="xxl" py="m">
      Paper Content
    </Box>
  </Paper>
);

Sandbox.args = {
  levitation: 1,
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

export const Levitation: ComponentStory<typeof Paper> = () => (
  <StoryLayout>
    {([0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((levitation) => {
      return (
        <Paper levitation={levitation}>
          <Box px="xl" py="l">
            levitation={levitation}
          </Box>
        </Paper>
      );
    })}
  </StoryLayout>
);
