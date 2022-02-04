import React, { useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PopoverComponent, { PopoverProps } from './Popover';
import Box from '../../Containers/Box/Box';
import Button from '../../Button/Button';
import Paper from '../../Containers/Paper/Paper';

export default {
  title: 'Popover/Popover',
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

const Page = ({ children, ...props }: PopoverProps) => {
  const ref = useRef();

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      <Button ref={ref}>Click me!</Button>
      <PopoverComponent {...props} anchorEl={ref.current}>
        <Paper
          style={{
            width: '200px',
            height: '200px',
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
