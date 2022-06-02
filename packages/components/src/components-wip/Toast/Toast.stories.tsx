import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@components/Button';
import Toast from './Toast';
import toast from './toasts';

export default {
  title: 'Components/Toast',
  component: () => <div></div>,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Toast>;

const placements = [
  'top-center',
  'top-left',
  'top-right',
  'bottom-center',
  'bottom-left',
  'bottom-right',
] as const;

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  maxWidth: 'max-content',
  justifyItems: 'center',
  gap: 30,
} as const;

export const Variants: ComponentStory<typeof Toast> = () => (
  <div style={{ ...wrapperStyle, gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
    <Button
      size="medium"
      variant="solid"
      onClick={() =>
        toast.success({
          content: 'This is a success toast.',
          placement: 'top-center',
        })
      }
    >
      Success
    </Button>
    <Button
      size="medium"
      variant="outlined"
      onClick={() => {
        toast.warning({
          content: 'This is a warning toast.',
          placement: 'top-center',
        });
      }}
    >
      Warning
    </Button>
    <Button
      size="medium"
      color="secondary"
      variant="outlined"
      onClick={() =>
        toast.error({
          content: 'This is an error toast.',
          placement: 'top-center',
        })
      }
    >
      Error
    </Button>
    <Button
      size="medium"
      color="neutral"
      variant="outlined"
      onClick={() => {
        toast.info({
          content: 'This is an info toast.',
          placement: 'top-center',
        });
      }}
    >
      Info
    </Button>
    <Toast />
  </div>
);

export const Placement: ComponentStory<typeof Toast> = () => {
  return (
    <div style={wrapperStyle}>
      {placements.map((placement) => {
        return (
          <Button
            size="medium"
            stretch
            variant="outlined"
            onClick={() =>
              toast.info({
                placement,
                content: `Placement: \`${placement}\``,
              })
            }
          >
            {placement}
          </Button>
        );
      })}

      <Toast />
    </div>
  );
};

export const Mutations: ComponentStory<typeof Toast> = () => (
  <div style={{ ...wrapperStyle, gridTemplateColumns: '1fr' }}>
    <Button
      size="medium"
      variant="outlined"
      onClick={() => {
        const key = 'toast-key';

        toast.error({
          content: 'Error! Please wait 3 (three) seconds!',
          key,
          duration: Infinity,
          placement: 'top-center',
        });

        setTimeout(() => {
          toast.success({
            placement: 'top-center',
            content: 'Done! Toast is changed successfully!',
            key,
          });
        }, 3000);
      }}
    >
      Toast mutation
    </Button>

    <Toast />
  </div>
);
