import React from 'react';
import Image from './Image';
import { render, fireEvent, screen } from '@testing-library/react';

type ImageProps = React.ComponentProps<typeof Image>;

describe('Image component', () => {
  const baseProps: Partial<ImageProps> = {
    src: '111',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //
  describe('', () => {
    it.skip('', () => {
      render(<Image {...baseProps} />);
    });
  });

  //
  describe('', () => {});

  //
  describe('', () => {});
});
