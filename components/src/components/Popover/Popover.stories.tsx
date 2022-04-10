import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '@components/Button';
import { Paper } from '@components/Paper';
import Box from '../../components-wip/Box/Box';
import PopoverComponent, { PopoverProps } from './Popover';

export default {
  title: 'Feedback/Popover',
  component: PopoverComponent,
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
      <Button variant="solid" ref={ref} onClick={() => setOpen(true)}>
        Click me!
      </Button>
      <PopoverComponent
        {...props}
        originElement={ref.current}
        onClickAway={() => setOpen(false)}
        open={open}
        paperProps={{
          style: {
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        {children}
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
  placement: 'bottom-start',
  // offsetX: 0,
  // offsetY: 0,
  open: false,
};
