import React from 'react';

import { Meta } from '@storybook/react';

const Page = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 'var(--spacing-xs)',
        justifyContent: 'space-around',
        // padding: 'var(--spacing-m)',
      }}
    >
      <div
        style={{
          width: '250px',
          // minWidth: '300px',
          boxSizing: 'border-box',
        }}
      >
        <img
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
          alt="reframework logo"
          src="https://user-images.githubusercontent.com/49458012/164946096-5a60ae09-90b4-41fe-90df-909afa0d45b6.png"
        />
      </div>
      <div style={{ maxWidth: '70%', boxSizing: 'border-box' }}>
        <img
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
          alt="reframework intro"
          src="https://user-images.githubusercontent.com/49458012/165349158-8836184e-a69c-4d7b-9a96-eec4293dc817.jpeg"
        />
      </div>
    </div>
  );
};

export default {
  title: 'Welcome',
  parameters: {
    docs: {
      page: Page,
    },
  },
} as Meta;

export const Welcome = Page;
