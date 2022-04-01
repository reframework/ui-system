import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from './Avatar';
import { Badge, OnlineStatus } from '../Badge';
import { Box } from '../Box';
import { Spinner } from '../Spinner';
import Text from '../Typography/Typography';
import { Flex } from '../Flex';

import testImage3 from './assets/maxresdefault2x.jpeg';

export default {
  title: 'Avatar/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const testImage1 =
  'https://media.istockphoto.com/photos/closeup-on-a-striped-mixedbreed-cat-licking-lips-isolated-on-white-picture-id1217839490?k=20&m=1217839490&s=612x612&w=0&h=qc-dihIXz5xvCIGwrY2tcb-g1KdcEkLyAT7_AMDcJyc=';

const testImage2 =
  'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/cat-home-441939.jpg?h=83a2eac3&itok=RHVSjYLN';

const Template: ComponentStory<typeof Avatar> = (props) => (
  <Flex alignItems="center" justifyContent="center" p="xxxl">
    <Flex mr="xxxl" p="xl" direction="column" alignItems="center">
      <Box mb="m">
        <Text>Badge</Text>
      </Box>
      <Badge content="🙂">
        <Avatar {...props} src={testImage3} />
      </Badge>
    </Flex>
    <Flex mr="xxxl" p="xl" direction="column" alignItems="center">
      <Box mb="m">
        <Text>Online status</Text>
      </Box>
      <OnlineStatus animated status="online" size={18}>
        <Avatar
          {...props}
          src={testImage2}
          size={`${(100 / 16).toFixed(1)}rem`}
        />
      </OnlineStatus>
    </Flex>
    <Flex p="xl" direction="column" alignItems="center">
      <Box mb="m">
        <Text>Do not disturb</Text>
      </Box>
      <OnlineStatus position="bottom-left" status="busy" size="1.5rem">
        <Avatar {...props} src={testImage1} size={150} />
      </OnlineStatus>
    </Flex>
  </Flex>
);

export const SandAvatar = Template.bind({});

SandAvatar.args = {
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
