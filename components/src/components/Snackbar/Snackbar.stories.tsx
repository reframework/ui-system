import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SnackbarComponent from './Snackbar';
import snackbar from './snackbars';

import { Button } from '../Button';
export default {
  title: 'Feedback/Snackbar',
  component: () => <div></div>,
} as ComponentMeta<typeof SnackbarComponent>;

const Template: ComponentStory<typeof SnackbarComponent> = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 150,
      width: 200,
    }}
  >
    <Button
      size="medium"
      onClick={() =>
        snackbar.success({
          content: 'This is a success Snackbar',
        })
      }
    >
      Success
    </Button>
    <Button
      size="medium"
      variant="outlined"
      onClick={() => {
        const key = '<< The Key >>';

        snackbar.warning({
          content: 'Warning! This Snackbar is changing in 5 (five) seconds',
          key,
          duration: Infinity,
        });

        setTimeout(() => {
          snackbar.success({
            content: 'Ok! Lets wait 5 (five) seconds more',
            key,
            duration: 5000,
          });
        }, 5000);
      }}
    >
      Warning
    </Button>
    <Button
      size="medium"
      color="secondary"
      variant="outlined"
      onClick={() =>
        snackbar.error({
          content: 'This is an error Snackbar',
          duration: 10000,
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
        const clearSnackbar = snackbar.info({
          content: 'This is an info snackbar.',
          duration: Infinity,
        });

        setTimeout(clearSnackbar, 5000);
      }}
    >
      Info
    </Button>
    <SnackbarComponent />
  </div>
);

export const Snackbar = Template.bind({});

Snackbar.args = {};
