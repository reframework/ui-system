import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@wip/Box';
import { Paper } from '@components/Paper';
import Portal from './Portal';

export default {
  title: 'Utils/Portal',
  component: Portal,
} as ComponentMeta<typeof Portal>;

export const SimplePortal: ComponentStory<typeof Portal> = () => {
  return (
    <Portal
      id="portal-id"
      element="div"
      style={{
        left: '50%',
        position: 'fixed',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Paper shape="circle">
        <Box p="xxl">This box is inside a portal.</Box>
      </Paper>
    </Portal>
  );
};

// TODO: portalTarget, style,
