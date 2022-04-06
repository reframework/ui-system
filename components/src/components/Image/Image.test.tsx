/* eslint-disable testing-library/no-node-access */

import React from 'react';
import Image from './Image';
import { render, screen } from '@testing-library/react';

type ImageProps = React.ComponentProps<typeof Image>;

describe('Image component', () => {
  const placeholder = <div data-testid="placeholder" />;
  const fallback = <div data-testid="fallback" />;

  const baseProps: Partial<ImageProps> = {
    placeholder,
    alt: 'stub-alt',
    src: 'stub-src',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Image loading', () => {
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
      Object.defineProperty(img, 'naturalHeight', { value: 100 });
      img.dispatchEvent(new Event('load'));
      // Placeholder destroyed
      expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument();
    });
    it('renders fallback when failed and destroys img', () => {
      render(<Image {...baseProps} fallback={fallback} />);
      const img = screen.getByRole('img') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      // Image is destroyed
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      // Placeholder is destroyed
      expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument();
      // Fallback is rendered
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
    });
    it('renders placeholder when failed and fallback is not provided', () => {
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
    it('renders only image when failed fallback and placeholder are not provided', () => {
      render(<Image {...baseProps} placeholder={undefined} />);
      const img = screen.getByRole('img') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));
      expect(img).toBeInTheDocument();
      expect(img.parentElement?.children).toHaveLength(1);
    });
  });

  describe('Component props', () => {
    it('renders with src, srcSet and alt', () => {
      render(<Image {...baseProps} srcSet={'stub-srcset'} />);
      const img = screen.getByAltText('stub-alt');
      expect(img).toHaveAttribute('src', 'stub-src');
      expect(img).toHaveAttribute('srcset', 'stub-srcset');
      expect(img).toBeInTheDocument();
    });

    it('renders with passed className', () => {
      render(<Image {...baseProps} className="stub-className" />);
      expect(screen.getByRole('img')).toHaveClass('stub-className');
    });
  });
});
