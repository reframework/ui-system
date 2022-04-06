import React from 'react';
import './Avatar.css';
import { getClassName } from '@reframework/classnames';
import { Image, ImageProps } from '@components/Image';
import { getCSSSize } from '../../utils';

enum AvatarClassName {
  container = 'ref:avatar-container',
  picture = 'ref:avatar-picture',
}

export interface AvatarProps extends ImageProps {
  size?: number | string;
  // TODO:
  shape?: 'square' | 'circle' | 'rounded';
}

const Avatar: React.FC<AvatarProps> = ({ className, size, ...props }) => {
  const classNames = getClassName({
    [AvatarClassName.container]: true,
    [className!]: Boolean(className),
  });

  console.log(classNames, 'classNames');

  const style = {
    '--avatar-size': getCSSSize(size),
  } as React.CSSProperties;

  return (
    <div className={classNames} style={style}>
      {/* override placeholder and fallback for current project */}
      <Image
        {...props}
        aspectRatio="1 / 1"
        className={AvatarClassName.picture}
      />
    </div>
  );
};

export default Avatar;
