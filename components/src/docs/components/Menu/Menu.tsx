import React from 'react';

import { Button } from '../../../components/Button';
import { Menu } from '../../../components/Menu';
import CircularLoader from '../../../components/CircularProgress/Circular';
import { Flex } from '../../../components/Flex';
import { Box } from '../../../components/Box';
import styles from './index.module.css?module';

export const Div = () => <div className={styles.ololo}>dcsdcs</div>;

export const Intro = (props) => {
  return (
    <Menu {...props} trigger={<Button variant="outlined">Open Menu</Button>}>
      <Menu.MenuItem key="1">Share...</Menu.MenuItem>
      <Menu.MenuItem key="3">Move...</Menu.MenuItem>
      <Menu.MenuItem key="4">Rename...</Menu.MenuItem>
      <Menu.MenuItem key="5" disabled>
        Delete...
      </Menu.MenuItem>
    </Menu>
  );
};

export const RenderTrigger = (props) => (
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
 *
 *
 *
 *
 */
const options = Array(20)
  .fill(0)
  .map(() => Math.random() * 1000000);

export const Scrollable = (props) => (
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
 *
 *
 *
 */

export const WatchResizing = (props) => {
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
