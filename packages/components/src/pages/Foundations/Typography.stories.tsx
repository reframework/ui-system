import React from 'react';

import { Meta } from '@storybook/react';

const Page = () => {
  return <h1>Typography</h1>;
};

export default {
  title: 'System/Typography',
  parameters: {
    docs: {
      page: Page,
    },
  },
} as Meta;

export const Typography = Page;
