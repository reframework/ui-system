import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@wip//Box';
import { Button } from '@components/Button';
import { Menu, MenuItem, MenuList } from '@components/Menu';
import { Text } from '@components/Text';

export default {
  title: 'Menu/Menu',
  id: 'Menu/Menu',
  component: Menu,
  subcomponents: {
    MenuList,
    MenuItem,
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

const wrapperStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundColor: 'white',
  display: 'flex',
  height: 100,
  justifyContent: 'center',
};

export const Intro: ComponentStory<typeof Menu> = () => {
  return (
    <Box style={wrapperStyle}>
      <Menu trigger={<Button variant="solid">Open Menu</Button>}>
        <MenuItem id="1">Share</MenuItem>
        <MenuItem id="2">Copy</MenuItem>
        <MenuItem id="3">Rename</MenuItem>
        <MenuItem id="4" disabled>
          Move
        </MenuItem>
        <MenuItem id="5">Delete...</MenuItem>
      </Menu>
    </Box>
  );
};

export const InternalState = () => {
  return (
    <>
      <Box pt="l" pb="l">
        <Text>Accessing the internal state</Text>
        <Text size="xs" weight="thin">
          access the internal state of the Menu, use a function as children
          (commonly known as a render prop). You'll get access to the internal
          state isOpen and method onClose.
        </Text>
      </Box>
      <Box style={wrapperStyle}>
        <Menu
          matchWidth
          trigger={(params: { isOpen: boolean }) => (
            <Button variant={params.isOpen ? 'outlined' : 'solid'}>
              {params.isOpen ? 'Close Menu' : 'Open Menu'}
            </Button>
          )}
        >
          <MenuItem key="1">Share...</MenuItem>
          <MenuItem key="3">Move...</MenuItem>
          <MenuItem key="4">Rename...</MenuItem>
          <MenuItem key="5" disabled>
            Delete...
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export const LetterNavigation = () => {
  return (
    <>
      <Box pt="l" pb="l">
        <Text>Letter Navigation.</Text>
        <Text size="xs" weight="thin">
          When focus is on the MenuButton or within the MenuList and you type a
          letter key, a search begins. Focus will move to the first MenuItem
          that starts with the letter you typed
        </Text>
      </Box>
      <Box style={wrapperStyle}>
        <Menu
          trigger={(params: { isOpen: boolean }) => (
            <Button variant={params.isOpen ? 'outlined' : 'solid'}>
              {params.isOpen ? 'Close Menu' : 'Open Menu'}
            </Button>
          )}
        >
          <MenuItem key="1">Share...</MenuItem>
          <MenuItem key="3">Move...</MenuItem>
          <MenuItem key="4">Rename...</MenuItem>
          <MenuItem key="5" disabled>
            Delete...
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export const Portal = () => {
  return (
    <>
      <Box pt="l" pb="l">
        <Text>Rendering menu in a portal .</Text>
        <Text size="xs" weight="thin">
          To render menus in a portal, import the Portal component and wrap the
          MenuList within the Portal.
        </Text>
      </Box>
      <Box style={wrapperStyle}>
        <Menu
          portal
          trigger={(params: { isOpen: boolean }) => (
            <Button variant={params.isOpen ? 'outlined' : 'solid'}>
              {params.isOpen ? 'Close Menu' : 'Open Menu'}
            </Button>
          )}
        >
          <MenuItem key="1">Share...</MenuItem>
          <MenuItem key="3">Move...</MenuItem>
          <MenuItem key="4">Rename...</MenuItem>
          <MenuItem key="5" disabled>
            Delete...
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <Box style={wrapperStyle}>
      <Menu
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        trigger={(params: { isOpen: boolean }) => (
          <Button variant={params.isOpen ? 'outlined' : 'solid'}>
            {params.isOpen ? 'Close Menu' : 'Open Menu'}
          </Button>
        )}
      >
        <MenuItem key="1">Share...</MenuItem>
        <MenuItem key="3">Move...</MenuItem>
        <MenuItem key="4">Rename...</MenuItem>
      </Menu>
    </Box>
  );
};

export const Selectable = () => {
  const [index, setIndex] = React.useState<number | undefined>();

  const onChange = (idx: number) => () => {
    if (idx === index) return setIndex(undefined);
    setIndex(idx);
  };

  const options = ['Белый доцент', 'Васек', 'Бомбочка', 'Кисуня', 'Дуся'];

  return (
    <Box style={wrapperStyle}>
      <Menu
        trigger={
          <Button
            style={{ width: 200 }}
            variant={index === undefined ? 'solid' : 'outlined'}
          >
            {options[index!] || 'Выбери васька'}
          </Button>
        }
      >
        {options.map((label, idx) => {
          return (
            <MenuItem key={label} onClick={onChange(idx)}>
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export const AutofocusItem = () => {
  const options = ['Белый доцент', 'Васек', 'Бомбочка', 'Кисуня', 'Дуся'];

  return (
    <Box style={wrapperStyle}>
      <Menu
        trigger={
          <Button style={{ width: 200 }} variant="outlined">
            Выбери васька
          </Button>
        }
      >
        {options.map((label, idx) => {
          return (
            <MenuItem key={label} autoFocus={idx === 2}>
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
