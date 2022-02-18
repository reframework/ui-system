import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu as MenuComponent, MenuProps } from '../../components/Menu';

import { Box } from '../../components/Box';
import { Button } from '../../components/Button';

export default {
  title: 'Menu/Menu',
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

const Page = ({ children, placement, ...props }: MenuProps) => {
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
        placement={placement}
        trigger={
          <Button variant="outlined" ref={setRef}>
            Click me!
          </Button>
        }
      >
        <MenuItem key="1">Share...</MenuItem>
        <MenuItem key="3">Move...</MenuItem>
        <MenuItem key="4">Rename...</MenuItem>
        <MenuItem key="5" disabled>
          Delete...
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
  placement: 'start-after',
};
