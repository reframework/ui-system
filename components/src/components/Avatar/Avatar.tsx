import React from 'react';
import './Avatar.css';
import { getClassName } from '@reframework/classnames';



enum AvatarClassNames {
  container = 'ref:avatar-container',
  picture = 'ref:avatar-picture',
  status = 'ref:avatar-status',
  size = 'ref:avatar-size',
}

interface AvatarProps {
  srcSet: Record<string, string>;
  sizes: string;
  src: string;
  //
  size?: Size | string;
  fallback?: React.ReactNode;
  className?: string;
  // TODO:
  shape?: 'square' | 'circle' | 'rounded';
}
const Avatar: React.FC<AvatarProps> = ({
  srcSet: _srcSet,
  src,
  sizes,
  size = 100,
  fallback = null,
  className,
}) => {
  const classNames = getClassName({
    [AvatarClassNames.container]: true,
    [className!]: Boolean(className),
  });

  const srcSet = Object.entries(_srcSet)
    .map(([size, source]) => `${source} ${size}`)
    .join(', ');

  return (
    <div className={classNames}>
      <Image
        sizes={sizes}
        className={AvatarClassNames.picture}
        src={src}
        srcSet={srcSet}
      >
        {fallback}
      </Image>
    </div>
  );
};

export default Avatar;
