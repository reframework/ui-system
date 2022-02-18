import React from 'react';
import { Story, Canvas, ArgsTable, Source } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../components/Button';
import { Menu } from '../../components/Menu';

export default {
  title: 'Menu/Menu',
  id: 'Menu/Menu',
  component: Menu,
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
} as ComponentMeta<typeof Menu>;

//

export const Intro: ComponentStory<typeof Menu> = (props) => (
  <Menu {...props} trigger={<Button variant="outlined">Open menu</Button>}>
    <Menu.MenuItem key="1">Share...</Menu.MenuItem>
    <Menu.MenuItem key="3">Move...</Menu.MenuItem>
    <Menu.MenuItem key="4">Rename...</Menu.MenuItem>
    <Menu.MenuItem key="5" disabled>
      Delete...
    </Menu.MenuItem>
  </Menu>
);

export const SourceStory: ComponentStory<typeof Menu> = () => (
  <div style={{ zIndex: 0, position: 'relative' }}>
    <Source of="Intro" dark />
  </div>
);

export const ArgsTableStory: ComponentStory<typeof Menu> = () => (
  <div style={{ zIndex: 0, position: 'relative' }}>
    <ArgsTable of="." />
  </div>
);

Intro.args = {
  children: 'Popover',
  placement: 'start-after',
  anchorWidth: true,
  // disablePortal: false,
  autoFocus: false,
  keepOpen: false,
  // Popover props
};
