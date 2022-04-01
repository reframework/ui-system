import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Cat1xJpeg from './assets/maxresdefault1x.jpg';
import Cat2xJpeg from './assets/maxresdefault2x.jpeg';
import Cat1xWebp from './assets/maxresdefault1x.webp';
import Cat2xWebp from './assets/maxresdefault2x.webp';

import Avatar from './Avatar';
import { Badge } from './Badge';
import { Box } from '../Box';

export default {
  title: 'Avatar/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const testImage =
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg';

const Template: ComponentStory<typeof Avatar> = (props) => (
  <Box>
    <Badge content={<div>🙂</div>}>
      <Avatar {...props} />
    </Badge>
  </Box>
);

export const SandAvatar = Template.bind({});

SandAvatar.args = {
  src: Cat1xJpeg,
};
