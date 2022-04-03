import React from 'react';
import './Image.css';
// import { getClassName } from '@reframework/classnames';

type OverrideProps = 'placeholder'; // | onClick;
const getClassName = () => '';

enum ImageClassName {
  container = 'ref:image-container',
  image = 'ref:image',
  fallback = 'ref:image-fallback',
}

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, OverrideProps> {
  /**
   * Fallback renders when image is failed to load
   */
  fallback?: React.ReactNode;
  /**
   * Placeholder renders till image is loaded,
   * it also renders when image is failed to load and fallback is not provided
   */
  placeholder?: React.ReactNode;
  /**
   * An aspect ratio of image
   * Implemented via CSS property aspect-ratio,
   * doesn't impact images width and height attributes
   */
  aspectRatio?: string;
  // TODO:
  // fallbackSrc: string;
}

enum ImageStatus {
  loading = 'loading',
  loaded = 'loaded',
  failed = 'failed',
}

const Image: React.FC<ImageProps> = ({
  aspectRatio,
  className,
  fallback = null,
  onError,
  placeholder = null,
  src,
  srcSet,
  ...imgProps
}) => {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = React.useState(ImageStatus.loading);

  const handleError = () => {
    setStatus(ImageStatus.failed);
  };

  const handleLoad = (event: React.SyntheticEvent) => {
    const { complete } = event.target as HTMLImageElement;
    if (complete) setStatus(ImageStatus.loaded);
  };

  const imageClassNames = getClassName({
    [ImageClassName.image]: true,
    [className!]: !!className,
  });

  const fallbackClassNames = getClassName({
    [ImageClassName.fallback]: true,
  });

  const renderFallback = () => {
    if (status === ImageStatus.failed) {
      if (fallback) return fallback;
    }

    return placeholder;
  };

  const style = {
    ['--image-aspect-ratio']: aspectRatio,
  } as React.CSSProperties;

  return (
    <div className={ImageClassName.container} style={style}>
      {status !== ImageStatus.failed && (
        <img
          {...imgProps}
          ref={imageRef}
          src={src}
          srcSet={srcSet}
          onLoad={handleLoad}
          onError={handleError}
          className={imageClassNames}
        />
      )}

      {status !== ImageStatus.loaded && (
        <div className={fallbackClassNames}>{renderFallback()}</div>
      )}
    </div>
  );
};

export default Image;
