import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MenuComponent, { MenuProps } from './Menu';

import Box from '../../Containers/Box/Box';
import Button from '../../Button/Button';

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

const { MenuItem } = MenuComponent;

const Page = ({ children, ...props }: MenuProps) => {
  const [ref, setRef] = useState<HTMLButtonElement | null>(null);

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      <MenuComponent
        {...props}
        anchorEl={ref}
        trigger={
          <Button ref={setRef} onClick={() => console.log('Clicks')}>
            Click me!
          </Button>
        }
      >
        <MenuItem key="1">Monday</MenuItem>
        <MenuItem key="2" selected>
          Tuesday
        </MenuItem>
        <MenuItem key="3">Wednesday</MenuItem>
        <MenuItem key="4">Thursday</MenuItem>
        <MenuItem key="5">Friday</MenuItem>
        <MenuItem key="6" disabled>
          Saturday
        </MenuItem>
        <MenuItem key="7" disabled>
          Sunday
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
  zIndex: 1,
};
