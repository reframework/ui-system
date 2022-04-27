import React from 'react';

import { Meta } from '@storybook/react';

const Page = () => {
  return <h1>Shapes</h1>;
};

export default {
  title: 'System/Shapes',
  parameters: {
    docs: {
      page: Page,
    },
  },
} as Meta;

export const Shapes = Page;
