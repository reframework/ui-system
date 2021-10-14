import React from 'react';
import styled, {css} from 'styled-components';
import {isString} from '../../../helpers/validations';
import {keys} from '../../../helpers/object';
import {Media} from '../../../ui-kit/theme';

type AspectRatio = '1:1' | '16:9' | string;

type ResponsiveAspectRatio = {
  s?: AspectRatio;
  m?: AspectRatio;
  l?: AspectRatio;
};

const media = {
  s: Media.up.xxs,
  m: Media.up.m,
  l: Media.up.l,
};

const getPadding = (aspectRatio: string) => {
  const [x, y] = aspectRatio.split(':');

  return {paddingBottom: 100 / (parseInt(x || '-1', 10) / parseInt(y || '-1', 10)) + '%'};
};

const getAspectRatio = ({aspectRatio}: ResponsiveProps) => {
  if (isString(aspectRatio)) return getPadding(aspectRatio);

  const breakpoints = keys(aspectRatio);

  return css`
    ${breakpoints.map((breakpoint) => {
      return css`
        ${media[breakpoint]} {
          ${isString(media[breakpoint]) ? getPadding(aspectRatio[breakpoint] as string) : {}}
        }
      `;
    })}
  `;
};

const Container = styled.div<ResponsiveProps>`
  display: block;
  background-color: transparent;
  width: 100%;
  position: relative;
  height: 0;
  overflow: hidden;
  ${getAspectRatio};
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export type ResponsiveProps = {
  aspectRatio: AspectRatio | ResponsiveAspectRatio;
  className?: string;
};

export const Responsive: React.FC<ResponsiveProps> = ({aspectRatio, children, className}) => {
  return (
    <Container aspectRatio={aspectRatio || '1:1'} className={className}>
      <Inner>{children}</Inner>
    </Container>
  );
};
