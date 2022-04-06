import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PopoverComponent, { PopoverProps } from './Popover';
import Box from '../Box/Box';
import { Button } from '@components/Button';
import { Paper } from '@components/Paper';

export default {
  title: 'Feedback/Popover',
  component: PopoverComponent,
  argTypes: {
    placement: {
      options: [
        'before-before',
        'before-end',
        'before-center',
        'before-start',
        'before-after',
        'end-before',
        'end-end',
        'end-center',
        'end-start',
        'end-after',
        'center-before',
        'center-end',
        'center-center',
        'center-start',
        'center-after',
        'start-before',
        'start-end',
        'start-center',
        'start-start',
        'start-after',
        'after-before',
        'after-end',
        'after-center',
        'after-start',
        'after-after',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof PopoverComponent>;

const Page = ({ children, open: openProp, ...props }: PopoverProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      <Button ref={ref} onClick={() => setOpen(true)}>
        Click me!
      </Button>
      <PopoverComponent
        {...props}
        anchorEl={ref.current}
        onClickAway={() => setOpen(false)}
        open={open}
      >
        <Paper
          style={{
            width: '200px',
            height: '200px',
            color: 'var(--color-scale-blue-4)',
            border: '1px solid currentColor',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
            backgroundColor: 'var(--color-scale-blue-1)',
          }}
        >
          {children}
        </Paper>
      </PopoverComponent>
    </Box>
  );
};
const Template: ComponentStory<typeof PopoverComponent> = (props) => (
  <Page {...props} />
);

export const Popover = Template.bind({});

Popover.args = {
  children: 'Popover',
  placement: 'start-start',
  offsetX: 0,
  offsetY: 0,
  open: false,
  zIndex: 1,
};
