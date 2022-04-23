import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@wip/Box';
import { Spinner } from '@components/Spinner';
import { Text } from '@components/Text';
import { Badge, OnlineStatus } from '../Badge';
import AvatarComponent from './Avatar';

export default {
  title: 'Avatar/Avatar',
  component: AvatarComponent,
} as ComponentMeta<typeof AvatarComponent>;

const testImage1 =
  'https://media.istockphoto.com/photos/closeup-on-a-striped-mixedbreed-cat-licking-lips-isolated-on-white-picture-id1217839490?k=20&m=1217839490&s=612x612&w=0&h=qc-dihIXz5xvCIGwrY2tcb-g1KdcEkLyAT7_AMDcJyc=';

const testImage2 =
  'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/08/cat-home-441939.jpg?h=83a2eac3&itok=RHVSjYLN';

// @ts-expect-error investigating
export const Avatar: ComponentStory<typeof Avatar> = () => {
  const placeholder = (
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
  );
  const fallback = (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'var(--color-scale-red-2)',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Text size="m" weight="bold" color="error">
        😥 Error
      </Text>
    </div>
  );

  return (
    <Box p="xxxl">
      <Box mr="xxxl" p="xl">
        <Box mb="m">
          <Text>Badge</Text>
        </Box>
        <Badge content="🙂">
          <AvatarComponent
            size={100}
            fallback={fallback}
            placeholder={placeholder}
            src={testImage2}
          />
        </Badge>
      </Box>
      <Box mr="xxxl" p="xl">
        <Box mb="m">
          <Text>Status: Online</Text>
        </Box>
        <OnlineStatus animated status="online" size={30}>
          <AvatarComponent
            src={testImage2}
            size={`${(250 / 16).toFixed(1)}rem`}
          />
        </OnlineStatus>
      </Box>
      <Box p="xl">
        <Box mb="m">
          <Text>Status: Away</Text>
        </Box>
        <OnlineStatus position="bottom-left" status="away" size="1.8rem">
          <AvatarComponent
            fallback={fallback}
            placeholder={placeholder}
            size={200}
            src={testImage1}
          />
        </OnlineStatus>
      </Box>
      <Box p="xl">
        <Box mb="m">
          <Text>Fallback</Text>
        </Box>
        <OnlineStatus status="busy" size="1.5rem">
          <AvatarComponent
            fallback={fallback}
            placeholder={placeholder}
            size={150}
            src={'%%%-error'}
          />
        </OnlineStatus>
      </Box>
    </Box>
  );
};
