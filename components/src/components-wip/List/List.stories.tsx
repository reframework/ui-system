import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@wip//Box';
import { Paper } from '@components/Paper';
import List from './List';
import ListItem from './ListItem';

export default {
  title: 'List/List',
  id: 'List/List',
  component: List,
} as ComponentMeta<typeof List>;

const wrapperStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: 'white',
  display: 'flex',
  height: 100,
  justifyContent: 'center',
};

export const Controlled = () => {
  return (
    <Box style={wrapperStyle}>
      <Paper>
        <List>
          <ListItem key="1">Share...</ListItem>
          <ListItem key="3">Move...</ListItem>
          <ListItem key="4">Rename...</ListItem>
        </List>
      </Paper>
    </Box>
  );
};
