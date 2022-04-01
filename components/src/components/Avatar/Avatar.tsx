import React from 'react';
import './Avatar.css';
import { getClassName } from '@reframework/classnames';

interface ImageEl extends React.HTMLProps<HTMLImageElement> {}

const Image: React.FC<ImageEl> = (props) => {
  const handleLoad = (event: React.SyntheticEvent) => {
    console.log('123');
  };
  return <img {...props} onLoad={handleLoad} />;
};

enum AvatarClassNames {
  container = 'ref:avatar-container',
  picture = 'ref:avatar-picture',
  status = 'ref:avatar-status',
  size = 'ref:avatar-size',
  // Badge
  badge = 'ref:avatar-badge',
  'top-left' = 'ref:avatar-top-left',
  'top-right' = 'ref:avatar-top-right',
  'bottom-left' = 'ref:avatar-bottom-left',
  'bottom-right' = 'ref:avatar-bottom-right',
  // Status
  online = 'ref:avatar-status-online',
  offline = 'ref:avatar-status-offline',
  away = 'ref:avatar-status-away',
  busy = 'ref:avatar-status-busy',
}

type BadgePosition = `${'top' | 'bottom'}-${'left' | 'right'}`;
type Status = 'online' | 'offline' | 'away' | 'busy';
type Size = 's' | 'm' | 'l';

interface AvatarProps {
  srcSet: Record<string, string>;
  sizes: string;
  src: string;
  status?: Status;
  statusContent: React.ReactNode;
  statusPosition: BadgePosition;
  badgeContent?: React.ReactNode;
  badgePosition?: BadgePosition;
  size?: Size | string;
  fallback?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  srcSet: _srcSet,
  src,
  sizes,
  badgeContent = null,
  status = null,
  badgePosition = 'top-right',
  statusPosition = 'bottom-right',
  size = 100,
  fallback = null,
}) => {
  const classNames = getClassName({
    [AvatarClassNames.container]: true,
    // [`${AvatarClassNames.size}-${size}`]: true,
  });

  const badgeClassNames = getClassName({
    [AvatarClassNames.badge]: true,
    [AvatarClassNames[badgePosition]]: true,
  });

  const statusClassNames = getClassName({
    [AvatarClassNames.status]: true,
    [AvatarClassNames[status!]]: Boolean(status),
    [AvatarClassNames[statusPosition]]: true,
  });

  const srcSet = Object.entries(_srcSet)
    .map(([size, source]) => `${source} ${size}`)
    .join(', ');

  console.log(status, 'status', statusClassNames);

  return (
    <div className={classNames} style={{ '--_size': `${size}px` }}>
      <Image
        sizes={sizes}
        className={AvatarClassNames.picture}
        src={src}
        srcSet={srcSet}
      >
        {fallback}
      </Image>
      {status && <div className={statusClassNames} />}
      {badgeContent && <div className={badgeClassNames}>{badgeContent}</div>}
    </div>
  );
};

export default Avatar;
