import React from 'react';

import { Meta } from '@storybook/react';

const Page = () => {
  return <h1>Shadows</h1>;
};

export default {
  title: 'System/Shadows',
  parameters: {
    docs: {
      page: Page,
    },
  },
} as Meta;

export const Shadows = Page;
