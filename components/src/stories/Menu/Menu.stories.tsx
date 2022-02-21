import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../components/Button';
import { Menu } from '../../components/Menu';
import CircularLoader from '../../components/CircularProgress/Circular';
import { Flex } from '../../components/Flex';
import { Box } from '../../components/Box';
import { Docs } from './MenuDocs';
// import source from '!!raw-loader!./Menu.mdx';

export default {
  title: 'Menu/Menu',
  id: 'Menu/Menu',
  component: Menu,
  subcomponents: {
    MenuList: Menu.MenuList,
    MenuItem: Menu.MenuItem,
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
  argTypes: {
    placement: {
      options: [
        'start-after',
        'end-after',
        'start-before',
        'before-start',
        'before-before',
        'after-after',
        'start-end',
        'start-center',
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
      }}
    >
      <Menu {...props} trigger={<Button variant="outlined">Open Menu</Button>}>
        <Menu.MenuItem key="1">Share...</Menu.MenuItem>
        <Menu.MenuItem key="3">Move...</Menu.MenuItem>
        <Menu.MenuItem key="4">Rename...</Menu.MenuItem>
        <Menu.MenuItem key="5" disabled>
          Delete...
        </Menu.MenuItem>
      </Menu>
    </div>
  );
};

Intro.bind({});

Intro.args = {
  children: 'Popover',
  placement: 'start-after',
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

RenderTrigger.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};

/**
 *
 *
 *
 *
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

Scrollable.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};

/**
 *
 *
 *
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
                <CircularLoader size={15} />
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

WatchResizing.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};
