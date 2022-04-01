import { getClassName } from '@reframework/classnames';
import React from 'react';
import './Image.css';

type OverrideProps = 'placeholder'; // | onClick;

enum ImageClassNames {
  container = 'ref:image-container',
  image = 'ref:image',
  hidden = 'ref:image-hidden',
  placeholder = 'ref:image-placeholder',
  fallback = 'ref:image-fallback',
}

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, OverrideProps> {
  fallback?: string | React.ReactNode;
  placeholder?: string | React.ReactNode;
  // Visual
  aspectRatio?: string;
}

enum ImageState {
  placeholder = 'placeholder',
  image = 'image',
  fallback = 'fallback',
  fallbackImage = 'fallbackImage',
}

const Image: React.FC<ImageProps> = ({
  aspectRatio,
  className,
  fallback,
  onError,
  placeholder,
  src,
  srcSet,
  ...imgProps
}) => {
  const [state, setState] = React.useState(ImageState.placeholder);

  const imageRef = React.useRef<HTMLImageElement | null>(null);

  const handleError = () => {
    if (!fallback) {
      setState(ImageState.placeholder);
      return;
    }

    if (typeof fallback === 'string') {
      if (imageRef.current) {
        imageRef.current.src = fallback;
      }
      setState(ImageState.fallbackImage);
      return;
    }

    if (React.isValidElement(fallback)) {
      setState(ImageState.fallback);
      return;
    }
  };

  const handleLoad = (event: React.SyntheticEvent) => {
    const { complete } = event.target as HTMLImageElement;
    if (complete) setState(ImageState.image);
  };

  const imageClassNames = getClassName({
    [ImageClassNames.image]: true,
    [ImageClassNames.hidden]:
      state === ImageState.placeholder || state === ImageState.fallback,
    [className!]: !!className,
  });

  const placeholderClassNames = getClassName({
    [ImageClassNames.placeholder]: true,
  });

  const fallbackClassNames = getClassName({
    [ImageClassNames.fallback]: true,
  });

  React.useLayoutEffect(() => {
    if (!imageRef.current) return;

    if (typeof srcSet === 'string') {
      imageRef.current.srcset = srcSet;
    }

    if (typeof src === 'string') {
      imageRef.current.src = src;
    }
  }, [src, srcSet]);

  const style = {
    ['--image-aspect-ratio']: aspectRatio,
  } as React.CSSProperties;

  console.log(state, 'status');

  return (
    <div className={ImageClassNames.container}>
      <img
        {...imgProps}
        ref={imageRef}
        onLoad={handleLoad}
        onError={handleError}
        className={imageClassNames}
        style={style}
      />

      {state === ImageState.placeholder && (
        <div className={placeholderClassNames}>{placeholder}</div>
      )}

      {state === ImageState.fallback && (
        <div className={fallbackClassNames}>{fallback}</div>
      )}
    </div>
  );
};

export default Image;
