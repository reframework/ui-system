import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MenuComponent, { MenuProps } from './Menu';
import MenuItem from './MenuItem';

import Box from '../../Containers/Box/Box';
import Button from '../../Button/Button';
import Paper from '../../Containers/Paper/Paper';

export default {
  title: 'Data Display/Menu',
  component: MenuComponent,
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
} as ComponentMeta<typeof MenuComponent>;

const Page = ({ children, open, ...props }: MenuProps) => {
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
      <MenuComponent {...props} anchorEl={ref.current} open={open}>
        <MenuItem key="1">Monday</MenuItem>
        <MenuItem key="2" active>
          Tuesday
        </MenuItem>
        <MenuItem key="3">Wednesday</MenuItem>
        <MenuItem key="4" disabled>
          Thursday
        </MenuItem>
        <MenuItem key="5" disabled>
          Friday
        </MenuItem>
      </MenuComponent>
    </Box>
  );
};
const Template: ComponentStory<typeof MenuComponent> = (props) => (
  <Page {...props} />
);

export const Menu = Template.bind({});

Menu.args = {
  children: 'Popover',
  placement: 'start-start',
  offsetX: 0,
  offsetY: 0,
  open: false,
  zIndex: 1,
};
