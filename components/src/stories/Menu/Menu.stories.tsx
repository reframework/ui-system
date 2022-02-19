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
  <Menu {...props} trigger={<Button variant="outlined">Open Menu</Button>}>
    <Menu.MenuItem key="1">Share...</Menu.MenuItem>
    <Menu.MenuItem key="3">Move...</Menu.MenuItem>
    <Menu.MenuItem key="4">Rename...</Menu.MenuItem>
    <Menu.MenuItem key="5" disabled>
      Delete...
    </Menu.MenuItem>
  </Menu>
);

export const RenderTrigger: ComponentStory<typeof Menu> = (props) => (
  <Menu
    {...props}
    trigger={(params: { isOpen: boolean }) => (
      <Button variant={params.isOpen ? 'outlined' : 'solid'}>
        {params.isOpen ? 'Close Menu' : 'Open Menu'}
      </Button>
    )}
  >
    <Menu.MenuItem key="1">Share...</Menu.MenuItem>
    <Menu.MenuItem key="3">Move...</Menu.MenuItem>
    <Menu.MenuItem key="4">Rename...</Menu.MenuItem>
    <Menu.MenuItem key="5" disabled>
      Delete...
    </Menu.MenuItem>
  </Menu>
);

export const Anchors: ComponentStory<typeof Menu> = (props) => (
  <Menu
    {...props}
    trigger={(params: { isOpen: boolean }) => (
      <Button variant={params.isOpen ? 'outlined' : 'solid'}>
        {params.isOpen ? 'Close Menu' : 'Open Menu'}
      </Button>
    )}
  >
    <Menu.MenuItem
      href={'https://reactjs.org'}
      target="_blank"
      rel="noopener noreferrer"
      key="1"
    >
      React
    </Menu.MenuItem>
    <Menu.MenuItem
      href={'https://angularjs.org'}
      target="_blank"
      rel="noopener noreferrer"
      key="3"
    >
      Angular
    </Menu.MenuItem>
    <Menu.MenuItem
      href={'https://vuejs.org'}
      target="_blank"
      rel="noopener noreferrer"
      key="4"
    >
      Vue
    </Menu.MenuItem>
    <Menu.MenuItem
      href={'https://emberjs.com/'}
      target="_blank"
      rel="noopener noreferrer"
      key="5"
      disabled
    >
      Ember
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

const options = Array(100)
  .fill(0)
  .map(() => Math.random() * 1000000);

export const Scrollable: ComponentStory<typeof Menu> = (props) => (
  <Menu
    {...props}
    trigger={(params: { isOpen: boolean }) => (
      <Button variant={params.isOpen ? 'outlined' : 'solid'}>
        {params.isOpen ? 'Close Menu' : 'Open Menu'}
      </Button>
    )}
  >
    {options.map((it, idx) => {
      return <Menu.MenuItem key={idx}>{it}</Menu.MenuItem>;
    })}
  </Menu>
);

Scrollable.parameters = {
  layout: 'centered',
};

export const Resize: ComponentStory<typeof Menu> = (props) => {
  const [flag, setFlag] = React.useState(0);

  const onClick = () => {
    setFlag(1);
    setTimeout(() => setFlag(2), 1000);
  };

  return (
    <Menu
      {...props}
      watchResizing
      trigger={
        <Button variant={'solid'} onClick={onClick}>
          {flag === 0 && 'Open Menu'}
          {flag === 1 && 'Loading ...'}
          {flag === 2 && 'So looooooooooooong button label'}
        </Button>
      }
    >
      <Menu.MenuItem key="1">Share...</Menu.MenuItem>
      <Menu.MenuItem key="3">Move...</Menu.MenuItem>
      <Menu.MenuItem key="4">Rename...</Menu.MenuItem>
      <Menu.MenuItem key="5" disabled>
        Delete...
      </Menu.MenuItem>
    </Menu>
  );
};

Resize.parameters = {
  layout: 'centered',
};
