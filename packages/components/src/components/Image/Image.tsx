import React from 'react';
import './Image.css';
import { getClassName } from '@reframework/classnames';

type OverrideProps = 'placeholder' | 'onError';

enum ImageClassName {
  container = 'ref:image-container',
  image = 'ref:image',
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
  onError?: () => void;
}

enum ImageStatus {
  loading = 'loading',
  loaded = 'loaded',
  failed = 'failed',
}

const isFailed = (status: ImageStatus) => {
  return status === ImageStatus.failed;
};

const isLoaded = (status: ImageStatus) => {
  return status === ImageStatus.loaded;
};

const Image: React.FC<ImageProps> = ({
  alt,
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
    onError?.();
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

  const hasFallback = React.isValidElement(fallback);
  const hasPlaceholder = React.isValidElement(placeholder);
  const ignoreFallback = !hasFallback && !hasPlaceholder;

  const renderFallback = () => {
    if (ignoreFallback) return null;
    if (isLoaded(status)) return null;
    if (isFailed(status) && hasFallback) return fallback;
    return placeholder;
  };

  const style = {
    ['--image-aspect-ratio']: aspectRatio,
  } as React.CSSProperties;

  return (
    <div className={ImageClassName.container} style={style}>
      {(ignoreFallback || !isFailed(status)) && (
        <img
          {...imgProps}
          alt={alt}
          ref={imageRef}
          src={src}
          srcSet={srcSet}
          onLoad={handleLoad}
          onError={handleError}
          className={imageClassNames}
        />
      )}

      {renderFallback()}
    </div>
  );
};

export default Image;
