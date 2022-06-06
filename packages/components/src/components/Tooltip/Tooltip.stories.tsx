import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '@components/Button';
import { Box } from '@wip/Box';
import Tooltip from './Tooltip';

export default {
  title: 'Popups/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Tooltip>;

const placements = [
  'top-start',
  'top-center',
  'top-end',
  //
  'left-start',
  '',
  'right-start',
  'left-center',
  '',
  'right-center',
  'left-end',
  '',
  'right-end',
  //
  'bottom-start',
  'bottom-center',
  'bottom-end',
] as const;

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  maxWidth: 'max-content',
  justifyItems: 'center',
  gap: 30,
  padding: 'var(--spacing-m)',
} as const;

export const Uncontrolled = () => {
  return (
    <Box style={wrapperStyle}>
      {placements.map((placement) => {
        if (!placement) {
          return <div />;
        }

        return (
          <Tooltip title={<Box p="xxs">Tooltip</Box>} placement={placement}>
            <Button stretch variant="outlined" size="large">
              {placement.toUpperCase()}
            </Button>
          </Tooltip>
        );
      })}
    </Box>
  );
};
