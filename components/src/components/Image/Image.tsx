import React from 'react';

interface ImageProps {
  alt: string;
  fallback: React.ReactNode;
  height: string | number;
  placeholder: React.ReactNode;
  preview: any;
  src: string;
  srcSet: string;
  width: string | number;
  onError: (error: Error) => void;
  // TODO:
  loading?: 'lazy';
}

//crossOrigin
//onError
const Image: React.FC<ImageProps> = (props) => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = (event: React.SyntheticEvent) => {
    console.log('123');
  };

  if (loaded) {
    return fallback;
  }

  return <img {...props} onLoad={handleLoad} />;
};

export default Image;
