import React from 'react';
import Image from './Image';
import { render, fireEvent, screen } from '@testing-library/react';

type ImageProps = React.ComponentProps<typeof Image>;

describe('Image component', () => {
  const placeholder = <div data-testid="placeholder" />;
  const fallback = <div data-testid="fallback" />;

  const baseProps: Partial<ImageProps> = {
    placeholder,
    alt: 'stub-img',
    src: 'stub-src',
    // todo: other props
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Image loading status', () => {
    it('renders only img', () => {
      render(<Image {...baseProps} placeholder={undefined} />);
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.parentElement?.children).toHaveLength(1);
    });
    it('renders a placeholder before image is loaded and then destroys it', () => {
      render(<Image {...baseProps} />);
      // Placeholder exists before image is loaded
      expect(screen.getByTestId('placeholder')).toBeInTheDocument();
      const img = screen.getByRole('img') as HTMLImageElement;
      Object.defineProperty(img, 'complete', { value: true });
      img.dispatchEvent(new Event('load'));
      // Placeholder destroyed
      expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument();
    });
    it('renders fallback when loading is failed and destroys img', () => {
      render(<Image {...baseProps} fallback={fallback} />);
      const img = screen.getByRole('img') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      // Image is destroyed
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      // Placeholder is destroyed
      expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument();
      // Fallback is rendered
      expect(screen.queryByTestId('fallback')).toBeInTheDocument();
    });
    it('renders placeholder when loading is failed fallback is not provided', () => {
      render(<Image {...baseProps} />);
      const img = screen.getByRole('img') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      // Image is destroyed
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      // Placeholder is here
      expect(screen.getByTestId('placeholder')).toBeInTheDocument();
      // No Fallback rendered
      expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
    });
  });

  describe('Component classNames', () => {});

  describe('Component props', () => {});
});
