import React from 'react';

import { Meta } from '@storybook/react';

const Page = () => {
  return <h1>Spacing</h1>;
};

export default {
  title: 'System/Spacing',
  parameters: {
    docs: {
      page: Page,
    },
  },
} as Meta;

export const Spacing = Page;
