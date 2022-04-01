import React from 'react';
import './Avatar.css';
import { getClassName } from '@reframework/classnames';
import { Image, ImageProps } from '../Image';

enum AvatarClassNames {
  container = 'ref:avatar-container',
  picture = 'ref:avatar-picture',
  status = 'ref:avatar-status',
  size = 'ref:avatar-size',
}

interface AvatarProps extends ImageProps {
  // TODO:
  shape?: 'square' | 'circle' | 'rounded';
}

const Avatar: React.FC<AvatarProps> = ({ className, ...props }) => {
  const classNames = getClassName({
    [AvatarClassNames.container]: true,
    [className!]: Boolean(className),
  });

  return (
    <div className={classNames}>
      {/* override placeholder and fallback for current project */}
      <Image
        placeholder={<div>LOADING</div>}
        fallback={<div>ERROR</div>}
        {...props}
        aspectRatio="1 / 1"
        className={AvatarClassNames.picture}
      />
    </div>
  );
};

export default Avatar;
