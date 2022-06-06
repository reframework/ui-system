import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@components/Button';
import { Paper } from '@components/Paper';
import Toast from './Toast';
import toast from './toasts';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Toast>;

const placements = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  maxWidth: 'max-content',
  justifyItems: 'center',
  gap: 30,
  padding: 'var(--spacing-m)',
} as const;

export const Variants: ComponentStory<typeof Toast> = () => (
  <Paper style={{ ...wrapperStyle, gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
    <Button
      size="medium"
      color="success"
      variant="outlined"
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
      color="warning"
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
      color="error"
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
  </Paper>
);

export const Placement: ComponentStory<typeof Toast> = () => {
  return (
    <Paper style={wrapperStyle}>
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
    </Paper>
  );
};

export const Mutations: ComponentStory<typeof Toast> = () => (
  <Paper style={{ ...wrapperStyle, gridTemplateColumns: '1fr' }}>
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
  </Paper>
);
