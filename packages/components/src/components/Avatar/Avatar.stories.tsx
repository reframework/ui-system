import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { Box } from '@wip/Box';
import { Spinner } from '@components/Spinner';
import { Text } from '@components/Text';
import { OnlineStatus } from '../Badge';
import AvatarComponent from './Avatar';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof AvatarComponent>;

const testImage1 =
  'https://media.istockphoto.com/photos/closeup-on-a-striped-mixedbreed-cat-licking-lips-isolated-on-white-picture-id1217839490?k=20&m=1217839490&s=612x612&w=0&h=qc-dihIXz5xvCIGwrY2tcb-g1KdcEkLyAT7_AMDcJyc=';

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

export const Online: ComponentStory<typeof AvatarComponent> = () => {
  return (
    <OnlineStatus animated status="online" size={30}>
      <AvatarComponent src={testImage1} size={300} />
    </OnlineStatus>
  );
};

export const Placeholder: ComponentStory<typeof AvatarComponent> = () => {
  return <AvatarComponent placeholder={placeholder} size={300} src={''} />;
};

export const Fallback: ComponentStory<typeof AvatarComponent> = () => {
  return (
    <AvatarComponent
      fallback={fallback}
      placeholder={placeholder}
      size={300}
      src={'%%%-error'}
    />
  );
};
