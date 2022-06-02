import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '@components/Button';
import { Box } from '@wip/Box';
import PopoverComponent, { PopoverProps } from './Popover';

export default {
  title: 'Components/Popover',
  component: PopoverComponent,
  argTypes: {
    placement: {
      options: [
        'bottom-center',
        'bottom-end',
        'bottom-start',
        'left-center',
        'left-end',
        'left-start',
        'right-center',
        'right-end',
        'right-start',
        'top-center',
        'top-end',
        'top-start',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof PopoverComponent>;

const Page = ({ children, open: openProp, ...props }: PopoverProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!openProp);
  }, [openProp]);

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      <Button variant="solid" ref={ref} onClick={() => setOpen(true)}>
        Click me!
      </Button>
      <PopoverComponent
        {...props}
        originElement={ref.current}
        onClickAway={() => setOpen(false)}
        open={open}
        matchWidth
        paperProps={{
          style: {
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        {children}
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
  placement: 'bottom-start',
  // offsetX: 0,
  // offsetY: 0,
  open: false,
};

export const Uncontrolled = () => {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      <Button variant="solid" ref={ref}>
        Click me!
      </Button>
      <PopoverComponent
        originElement={ref.current}
        paperProps={{
          style: {
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        Uncontrolled
      </PopoverComponent>
    </Box>
  );
};

export const ContextMenu = () => {
  const [origin, setOrigin] = React.useState(null);

  const onClose = () => {
    // if (!origin) return;
    setOrigin(null);
    console.log('123');
  };

  useEffect(() => {
    const openMenu = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      event.preventDefault();
      event.stopPropagation();

      const origin = {};
      origin.getBoundingClientRect = (): DOMRect => {
        return {
          bottom: clientY + 1,
          height: 1,
          left: clientX,
          right: clientX + 1,
          top: clientY,
          width: 1,
          x: clientX,
          y: clientY,
          toJSON: () => '',
        };
      };

      setOrigin(origin as any);
    };

    document.addEventListener('contextmenu', openMenu);

    return () => {
      document.removeEventListener('contextmenu', openMenu);
    };
  }, []);

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      Right click
      <PopoverComponent
        matchWidth={200}
        onClickAway={onClose}
        open={!!origin}
        originElement={origin}
        placement="bottom-start"
      >
        <div
          style={{
            padding: 20,
          }}
        >
          Context Menu
        </div>
      </PopoverComponent>
    </Box>
  );
};

export const Modal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
      }}
    >
      <Button variant="solid" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <PopoverComponent
        matchWidth={300}
        onClickAway={() => {
          // setOpen(false);
        }}
        open={open}
        originElement={
          {
            getBoundingClientRect: () => ({
              bottom: window.innerHeight,
              height: window.innerHeight,
              left: 0,
              right: window.innerWidth,
              top: 0,
              width: window.innerWidth,
              x: 0,
              y: 0,
              toJSON: () => '',
            }),
          } as any
        }
        placement="center-center"
      >
        <div
          style={{
            padding: 50,
          }}
        >
          Modal
        </div>
      </PopoverComponent>
    </Box>
  );
};
