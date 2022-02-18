import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Button } from '../../components/Button';
import { Box } from '../../components/Box';

const disabledAddons = {
  parameters: {
    actions: {
      disabled: true,
    },
    controls: {
      disabled: true,
    },
  },
};

const grid = {
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'repeat( auto-fit, minmax(100px, 1fr) )',
  gridGap: 30,
  justifyItems: 'center',
};

export const Variants: ComponentStory<typeof Button> = () => (
  <div style={grid}>
    <Button variant="solid">Solid</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
);

export const Colors: ComponentStory<typeof Button> = () => (
  <div style={grid}>
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="success">
      Success
    </Button>
    <Button variant="outlined" color="warning">
      Warning
    </Button>
    <Button variant="outlined" color="error">
      Error
    </Button>
    <Button variant="outlined" color="neutral">
      Neutral
    </Button>
  </div>
);

export const Disabled: ComponentStory<typeof Button> = () => (
  <div style={grid}>
    <Button variant="solid" disabled>
      Solid
    </Button>
    <Button variant="outlined" disabled>
      Outlined
    </Button>
    <Button variant="ghost" disabled>
      Ghost
    </Button>
    <Button variant="link" disabled>
      Text
    </Button>
  </div>
);

export const Shape: ComponentStory<typeof Button> = () => (
  <div style={grid}>
    <Button variant="solid" shape="square">
      Square
    </Button>
    <Button variant="outlined" shape="circle">
      Circle
    </Button>
    <Button variant="ghost" shape="circle">
      Circle
    </Button>
  </div>
);

export const Stretch: ComponentStory<typeof Button> = () => (
  <div style={grid}>
    <Box alignItems="center" flex flexWrap="wrap" justifyContent="center">
      <Button variant="outlined" color="success" stretch>
        Button
      </Button>
    </Box>
  </div>
);

export const Sizes: ComponentStory<typeof Button> = () => (
  <div style={grid}>
    <Button variant="outlined" size="large">
      Large
    </Button>
    <Button variant="outlined" size="medium">
      Medium
    </Button>
    <Button variant="outlined" size="small">
      Small
    </Button>
  </div>
);

export const Sandbox: ComponentStory<typeof Button> = (props) => {
  return (
    <Button
      className={props.className}
      color={props.color}
      disabled={props.disabled}
      shape={props.shape}
      size={props.size}
      stretch={props.stretch}
      variant={props.variant}
    >
      {props.children}
    </Button>
  );
};

Variants.story = disabledAddons;
Sizes.story = disabledAddons;
Shape.story = disabledAddons;
Disabled.story = disabledAddons;
Colors.story = disabledAddons;
Stretch.story = disabledAddons;

Sandbox.args = {
  children: 'Button',
  color: 'primary',
  disabled: false,
  shape: 'square',
  size: 'medium',
  stretch: false,
  variant: 'solid',
};

Sandbox.story = {
  parameters: {
    actions: {
      disabled: true,
    },
  },
};
