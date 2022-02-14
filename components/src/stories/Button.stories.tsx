import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../Button';
import { StoryLayout } from './Layout';

const flex = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
};

export default {
  title: 'Button/Button',
  component: Button,
  layout: 'centered',
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'error',
        'warning',
        'success',
        'neutral',
      ],
      control: 'select',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'select',
    },
    variant: {
      options: ['solid', 'outlined', 'ghost', 'text'],
      control: 'select',
    },
    shape: {
      options: ['circle', 'square'],
      control: 'select',
    },
  },
} as ComponentMeta<typeof Button>;

export const Variants: ComponentStory<typeof Button> = ({
  children,
  ...props
}) => (
  <StoryLayout title="Button variants">
    <div style={flex}>
      <Button variant="solid">Solid</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  </StoryLayout>
);

Variants.parameters = {
  actions: { onClick: { action: 'clicked' } },
};

export const Solid: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Solid button colors">
    <div style={flex}>
      <Button variant="solid" color="primary">
        Primary
      </Button>
      <Button variant="solid" color="secondary">
        Secondary
      </Button>
      <Button variant="solid" color="success">
        Success
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="solid" color="warning">
        Warning
      </Button>
      <Button variant="solid" color="error">
        Error
      </Button>
      <Button variant="solid" color="neutral">
        Neutral
      </Button>
    </div>
  </StoryLayout>
);

export const Outlined: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Outlined button colors">
    <div style={flex}>
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" color="success">
        Success
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
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
  </StoryLayout>
);

export const Ghost: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Ghost button colors">
    <div style={flex}>
      <Button variant="ghost" color="primary">
        Primary
      </Button>
      <Button variant="ghost" color="secondary">
        Secondary
      </Button>
      <Button variant="ghost" color="success">
        Success
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="ghost" color="warning">
        Warning
      </Button>
      <Button variant="ghost" color="error">
        Error
      </Button>
      <Button variant="ghost" color="neutral">
        Neutral
      </Button>
    </div>
  </StoryLayout>
);

export const Link: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Link button colors">
    <div style={flex}>
      <Button variant="link" color="primary">
        Primary
      </Button>
      <Button variant="link" color="secondary">
        Secondary
      </Button>
      <Button variant="link" color="success">
        Success
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="link" color="warning">
        Warning
      </Button>
      <Button variant="link" color="error">
        Error
      </Button>
      <Button variant="link" color="neutral">
        Neutral
      </Button>
    </div>
  </StoryLayout>
);

export const Disabled: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Disabled button">
    <div style={flex}>
      <Button variant="solid">Solid</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Text</Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
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
  </StoryLayout>
);

export const Shape: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Shape of button">
    <div style={flex}>
      <Button variant="solid" shape="circle">
        Circle
      </Button>
      <Button variant="outlined" shape="circle">
        Circle
      </Button>
      <Button variant="ghost" shape="circle">
        Circle
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="solid" shape="square">
        Square
      </Button>
      <Button variant="outlined" shape="square">
        Square
      </Button>
      <Button variant="ghost" shape="square">
        Square
      </Button>
    </div>
  </StoryLayout>
);

export const Stretch: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Stretched button">
    <div style={{ ...flex }}>
      <Button variant="solid" stretch>
        Solid
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="outlined" stretch>
        Outlined
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="ghost" stretch>
        Ghost
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="link" stretch>
        Text
      </Button>
    </div>
  </StoryLayout>
);

export const Sizes: ComponentStory<typeof Button> = () => (
  <StoryLayout title="Button sizes">
    <div style={flex}>
      <Button variant="solid" size="large">
        Large
      </Button>
      <Button variant="solid" size="medium">
        Medium
      </Button>
      <Button variant="solid" size="small">
        Small
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
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
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="ghost" size="large">
        Large
      </Button>
      <Button variant="ghost" size="medium">
        Medium
      </Button>
      <Button variant="ghost" size="small">
        Small
      </Button>
    </div>
    <div style={{ ...flex, marginTop: 20 }}>
      <Button variant="link" size="large">
        Large
      </Button>
      <Button variant="link" size="medium">
        Medium
      </Button>
      <Button variant="link" size="small">
        Small
      </Button>
    </div>
  </StoryLayout>
);

export const Example: ComponentStory<typeof Button> = (props) => (
  <StoryLayout title="Sandbox">
    <div style={flex}>
      <Button {...props} />
    </div>
  </StoryLayout>
);

Example.args = {
  children: 'Button',
  color: 'primary',
  variant: 'solid',
  disabled: false,
  shape: 'square',
  size: 'medium',
  stretch: false,
};
