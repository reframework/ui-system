import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@components/Button';
import { Box } from '@wip/Box';
import { Text } from '@components/Text';
import Tooltip from './Tooltip';
import styles from './stories.css?module';

export default {
  title: 'Popups/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Tooltip>;

const placements = [
  { placement: 'top-start', label: 'top-start' },
  { placement: 'top-center', label: 'top' },
  { placement: 'top-end', label: 'top-end' },
  { placement: 'left-start', label: 'left-start' },
  { placement: null },
  { placement: 'right-start', label: 'right-start' },
  { placement: 'left-center', label: 'left' },
  { placement: null },
  { placement: 'right-center', label: 'right' },
  { placement: 'left-end', label: 'left-end' },
  { placement: null },
  { placement: 'right-end', label: 'right-end' },
  { placement: 'bottom-start', label: 'bottom-start' },
  { placement: 'bottom-center', label: 'bottom' },
  { placement: 'bottom-end', label: 'bottom-end' },
] as const;

export const Placement = () => {
  const match = matchMedia('(max-width: 400px)');

  console.log(match);

  const buttonSize = match.matches ? 'small' : 'large';
  return (
    <Box>
      <Box mb="xs">
        <Text weight="bold" size="xl" component="h2">
          Positioned tooltips
        </Text>
      </Box>
      <Box mb="s">
        <Text size="s">The Tooltip has 12 placements choice.</Text>
      </Box>
      <Box className={styles.wrapper}>
        {placements.map((item, idx) => {
          if (!item.placement) {
            return <div key={idx} />;
          }

          return (
            <Tooltip
              key={idx}
              title={<Box p="xxs">Tooltip</Box>}
              placement={item.placement}
            >
              <Button variant="outlined" size={buttonSize}>
                {item.label}
              </Button>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export const Uncontrolled = () => {
  return (
    <Box className={styles.wrapper}>
      <Tooltip title={<Box p="xxs">Tooltip</Box>} placement="bottom-start">
        <Button stretch variant="outlined" size="large">
          Click
        </Button>
      </Tooltip>
    </Box>
  );
};
