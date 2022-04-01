import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cat1xJpeg from './assets/maxresdefault1x.jpg';
import Cat2xJpeg from './assets/maxresdefault2x.jpeg';
import Cat1xWebp from './assets/maxresdefault1x.webp';
import Cat2xWebp from './assets/maxresdefault2x.webp';

import Avatar from './Avatar';

export default {
  title: 'Avatar/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (props) => (
  <Avatar {...props} />
);

export const SandAvatar = Template.bind({});

SandAvatar.args = {
  srcSet: {
    '375w': Cat1xJpeg,
    '1280w': Cat2xJpeg,
  },
  status: 'online',
  badgeContent: <div>X</div>,
  size: 100,
};
