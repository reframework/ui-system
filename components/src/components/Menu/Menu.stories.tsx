import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@wip//Box';
import { Button } from '@components/Button';
import { CircularProgress } from '@components/CircularProgress';
import { Flex } from '@wip//Flex';
import { Menu } from '@components/Menu';

export default {
  title: 'Menu/Menu',
  id: 'Menu/Menu',
  component: Menu,
  subcomponents: {
    MenuList: Menu.MenuList,
    MenuItem: Menu.MenuItem,
  },

  argTypes: {
    placement: {
      options: [
        'bottom-start',
        'bottom-center',
        'bottom-end',
        'top-start',
        'top-center',
        'top-end',
        'left-start',
        'left-center',
        'left-end',
        'right-start',
        'right-center',
        'right-end',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Menu>;

export const Intro: ComponentStory<typeof Menu> = (props) => {
  return (
    <div
      style={{
        position: 'relative',
        marginTop: 50,
        height: 400,
        width: 500,
        marginLeft: 10,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Menu {...props} trigger={<Button variant="outlined">Open Menu</Button>}>
        <Menu.MenuItem id="1" key="1">
          Share...
        </Menu.MenuItem>
        <Menu.MenuItem id="2" key="3">
          Move...
        </Menu.MenuItem>
        <Menu.MenuItem id="3" key="4">
          Rename...
        </Menu.MenuItem>
        <Menu.MenuItem id="5" key="5" disabled>
          Delete...
        </Menu.MenuItem>
      </Menu>
    </div>
  );
};

Intro.bind({});

Intro.args = {
  children: 'Popover',
  placement: 'bottom-start',
  matchOriginWidth: true,
  // disablePortal: false,
  autoFocus: false,
  // Popover props
};

//

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

/**
 *
 */
const options = Array(20)
  .fill(0)
  .map(() => Math.random() * 1000000);

export const Scrollable: ComponentStory<typeof Menu> = (props) => (
  <Menu
    {...props}
    paperProps={{
      style: {
        maxHeight: 200,
        overflowY: 'auto',
      },
    }}
    trigger={<Button variant={'outlined'}>{'Open Menu'}</Button>}
  >
    {options.map((it, idx) => {
      return <Menu.MenuItem key={idx}>{it}</Menu.MenuItem>;
    })}
  </Menu>
);

/**
 *
 */

export const WatchResizing: ComponentStory<typeof Menu> = (props) => {
  const [step, setStep] = React.useState(0);
  const timeout = React.useRef<number>();

  const onClick = () => {
    if (step === 0) {
      setStep(1);
      timeout.current = window.setTimeout(() => setStep(2), 1000);
    }
  };

  const handleClose = () => {
    setStep(0);
    clearTimeout(timeout.current);
  };

  return (
    <Menu
      onClose={handleClose}
      watchResizing
      placement={props.placement}
      trigger={
        <Button variant={'solid'} onClick={onClick}>
          {step === 0 && 'Open Menu'}
          {step === 1 && (
            <Flex alignItems="center">
              <Box mr="xxs">
                <CircularProgress size={15} />
              </Box>
              Loading
            </Flex>
          )}
          {step === 2 && 'So looooooooooooong label'}
        </Button>
      }
    >
      <Menu.MenuItem key="1">Menu item</Menu.MenuItem>
      <Menu.MenuItem key="3">Menu item</Menu.MenuItem>
      <Menu.MenuItem key="4">Menu item</Menu.MenuItem>
      <Menu.MenuItem key="5" disabled>
        Menu item
      </Menu.MenuItem>
    </Menu>
  );
};
