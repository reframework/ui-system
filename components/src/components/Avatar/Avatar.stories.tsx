import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cat1xJpeg from './assets/maxresdefault1x.jpg';
import Cat2xJpeg from './assets/maxresdefault2x.jpeg';
import Cat1xWebp from './assets/maxresdefault1x.webp';
import Cat2xWebp from './assets/maxresdefault2x.webp';

import Avatar from './Avatar';
import { Badge, StatusBadge } from './Badge';
import { Box } from '../Box';
import { Spinner } from '../Spinner';

export default {
  title: 'Avatar/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const testImage =
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const Template: ComponentStory<typeof Avatar> = (props) => (
  <Box>
    <Badge content={<div>🙂</div>}>
      <Avatar {...props} />
    </Badge>

    <StatusBadge status="online">
      <Avatar {...props} />
    </StatusBadge>
  </Box>
);

export const SandAvatar = Template.bind({});

SandAvatar.args = {
  src: testImage,
  placeholder: (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'goldenrod',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Spinner size={30} color="white" />
    </div>
  ),
  fallback: (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'tomato',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      😥 Error
    </div>
  ),
};
