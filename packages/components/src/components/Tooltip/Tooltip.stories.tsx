import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '@components/Button';
import { Box } from '@wip/Box';
import Tooltip, { TooltipProps } from './Tooltip';

export default {
  title: 'Popups/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: [
        'bottom-center',
        'bottom-end',
        'bottom-start',
        'left-center',
        'left-end',
        'left-start',
        'right-center',
        'right-end',
        'right-start',
        'top-center',
        'top-end',
        'top-start',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Tooltip>;

export const Uncontrolled = () => {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Tooltip
        title={'Tooltip'}
        placement="bottom-center"
        paperProps={{
          style: {
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Button variant="solid">Click me!</Button>
      </Tooltip>
    </Box>
  );
};
