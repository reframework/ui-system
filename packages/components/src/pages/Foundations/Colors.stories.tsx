import React from 'react';

import { Meta } from '@storybook/react';

const Page = () => {
  return <h1>Colors</h1>;
};

export default {
  title: 'System/Colors',
  parameters: {
    docs: {
      page: Page,
    },
  },
} as Meta;

export const Colors = Page;
