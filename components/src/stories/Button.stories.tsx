import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button as ButtonComponent } from '../Button';

export default {
  title: 'Button/Button',
  component: ButtonComponent,
  layout: 'centered',
  parameters: {
    layout: 'centered',
  },
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
} as ComponentMeta<typeof ButtonComponent>;

export const Variants: ComponentStory<typeof ButtonComponent> = ({
  children,
  ...props
}) => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Button variants</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ButtonComponent variant="solid">Solid</ButtonComponent>
      <ButtonComponent variant="outlined">Outlined</ButtonComponent>
      <ButtonComponent variant="ghost">Ghost</ButtonComponent>
      <ButtonComponent variant="link">Text</ButtonComponent>
    </div>
  </div>
);

Variants.parameters = {
  actions: { onClick: { action: 'clicked' } },
};

export const Solid: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Solid button</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ButtonComponent variant="solid" color="primary">
        Primary
      </ButtonComponent>
      <ButtonComponent variant="solid" color="secondary">
        Secondary
      </ButtonComponent>
      <ButtonComponent variant="solid" color="success">
        Success
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="solid" color="warning">
        Warning
      </ButtonComponent>
      <ButtonComponent variant="solid" color="error">
        Error
      </ButtonComponent>
      <ButtonComponent variant="solid" color="neutral">
        Outlined
      </ButtonComponent>
    </div>
  </div>
);

export const Outlined: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Outlined button</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ButtonComponent variant="outlined" color="primary">
        Primary
      </ButtonComponent>
      <ButtonComponent variant="outlined" color="secondary">
        Secondary
      </ButtonComponent>
      <ButtonComponent variant="outlined" color="success">
        Success
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="outlined" color="warning">
        Warning
      </ButtonComponent>
      <ButtonComponent variant="outlined" color="error">
        Error
      </ButtonComponent>
      <ButtonComponent variant="outlined" color="neutral">
        Outlined
      </ButtonComponent>
    </div>
  </div>
);

export const Ghost: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Ghost button</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ButtonComponent variant="ghost" color="primary">
        Primary
      </ButtonComponent>
      <ButtonComponent variant="ghost" color="secondary">
        Secondary
      </ButtonComponent>
      <ButtonComponent variant="ghost" color="success">
        Success
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="ghost" color="warning">
        Warning
      </ButtonComponent>
      <ButtonComponent variant="ghost" color="error">
        Error
      </ButtonComponent>
      <ButtonComponent variant="ghost" color="neutral">
        Neutral
      </ButtonComponent>
    </div>
  </div>
);

export const Link: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Link button</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ButtonComponent variant="link" color="primary">
        Primary
      </ButtonComponent>
      <ButtonComponent variant="link" color="secondary">
        Secondary
      </ButtonComponent>
      <ButtonComponent variant="link" color="success">
        Success
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="link" color="warning">
        Warning
      </ButtonComponent>
      <ButtonComponent variant="link" color="error">
        Error
      </ButtonComponent>
      <ButtonComponent variant="link" color="neutral">
        Outlined
      </ButtonComponent>
    </div>
  </div>
);

export const Disabled: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Disabled button</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ButtonComponent variant="solid">Solid</ButtonComponent>
      <ButtonComponent variant="outlined">Outlined</ButtonComponent>
      <ButtonComponent variant="ghost">Ghost</ButtonComponent>
      <ButtonComponent variant="link">Text</ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="solid" disabled>
        Solid
      </ButtonComponent>
      <ButtonComponent variant="outlined" disabled>
        Outlined
      </ButtonComponent>
      <ButtonComponent variant="ghost" disabled>
        Ghost
      </ButtonComponent>
      <ButtonComponent variant="link" disabled>
        Text
      </ButtonComponent>
    </div>
  </div>
);

export const Shape: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Shape of button</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <ButtonComponent variant="solid" shape="circle">
        Circle
      </ButtonComponent>
      <ButtonComponent variant="outlined" shape="circle">
        Circle
      </ButtonComponent>
      <ButtonComponent variant="ghost" shape="circle">
        Circle
      </ButtonComponent>
    </div>

    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="solid" shape="square">
        Square
      </ButtonComponent>
      <ButtonComponent variant="outlined" shape="square">
        Square
      </ButtonComponent>
      <ButtonComponent variant="ghost" shape="square">
        Square
      </ButtonComponent>
    </div>
  </div>
);

export const Stretch: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Stretched button</h1>

    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="solid" stretch>
        Solid
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="outlined" stretch>
        Outlined
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="ghost" stretch>
        Ghost
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="link" stretch>
        Text
      </ButtonComponent>
    </div>
  </div>
);

export const Sizes: ComponentStory<typeof ButtonComponent> = () => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Button sizes</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ButtonComponent variant="solid" size="large">
        Large
      </ButtonComponent>
      <ButtonComponent variant="solid" size="medium">
        Medium
      </ButtonComponent>
      <ButtonComponent variant="solid" size="small">
        Small
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="outlined" size="large">
        Large
      </ButtonComponent>
      <ButtonComponent variant="outlined" size="medium">
        Medium
      </ButtonComponent>
      <ButtonComponent variant="outlined" size="small">
        Small
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="ghost" size="large">
        Large
      </ButtonComponent>
      <ButtonComponent variant="ghost" size="medium">
        Medium
      </ButtonComponent>
      <ButtonComponent variant="ghost" size="small">
        Small
      </ButtonComponent>
    </div>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <ButtonComponent variant="link" size="large">
        Large
      </ButtonComponent>
      <ButtonComponent variant="link" size="medium">
        Medium
      </ButtonComponent>
      <ButtonComponent variant="link" size="small">
        Small
      </ButtonComponent>
    </div>
  </div>
);

export const Example: ComponentStory<typeof ButtonComponent> = (props) => (
  <div style={{ maxWidth: 500, width: '100vw' }}>
    <h1 style={{ textAlign: 'center' }}>Change props</h1>
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ButtonComponent {...props} />
    </div>
  </div>
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
