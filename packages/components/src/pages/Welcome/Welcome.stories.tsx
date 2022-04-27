import React from 'react';

import { Meta } from '@storybook/react';
import { Button } from '@components/Button';

const Intro = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>
        <img
          alt="reframework logo"
          width="250"
          src="https://user-images.githubusercontent.com/49458012/164946096-5a60ae09-90b4-41fe-90df-909afa0d45b6.png"
        />
      </div>
      <div>
        <img
          alt="reframework intro"
          width="700"
          src="https://user-images.githubusercontent.com/49458012/165349158-8836184e-a69c-4d7b-9a96-eec4293dc817.jpeg"
        />
      </div>
    </div>
  );
};

export default {
  title: 'Welcome',
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <Intro />
          {/* <Subtitle /> */}
          {/* <Description /> */}
        </>
      ),
    },
  },
} as Meta;

export const Welcome = () => {
  return null;
};
