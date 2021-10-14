import React from 'react';
import styled from 'styled-components';
import {Responsive, ResponsiveProps} from './Responsive';
import {isString} from '../../helpers/validations';
import {ImagePlaceholder, ImagePlaceholderProps} from './ImagePlaceholder';

export const ImageContainer = styled(Responsive)`
  background-color: ${({theme}) => theme.palette.grayscale.darkGray};
  overflow: hidden;
  border-radius: 5px;
`;

export const Image = styled.img<{$objectFit?: string}>`
  object-fit: ${({$objectFit}) => $objectFit || 'cover'};
  width: 100%;
  height: 100%;
`;

type Props = {
  aspectRatio: ResponsiveProps['aspectRatio'];
  placeholderProps?: ImagePlaceholderProps;
  objectFit?: string;
  className?: string;
} & Omit<JSX.IntrinsicElements['img'], 'ref'>;

export const ResponsiveImage: React.FC<Props> = ({
  src,
  aspectRatio,
  placeholderProps = {},
  objectFit,
  className,
  ...props
}) => {
  return (
    <ImageContainer aspectRatio={aspectRatio} className={className}>
      {isString(src) ? (
        <Image $objectFit={objectFit} src={src} {...props} />
      ) : (
        <ImagePlaceholder {...placeholderProps} />
      )}
    </ImageContainer>
  );
};
