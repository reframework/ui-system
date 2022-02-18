import React from 'react';
import { getClassName } from '@reframework/classnames';
import { AtomicFlexProps, getFlex } from '../../atomic/Flex/getFlex';
import { Box } from '../Box';
import { BoxProps } from '../Box/Box';

interface FlexProps extends AtomicFlexProps, BoxProps {}

const Flex: React.FC<FlexProps> = (props: FlexProps) => {
  const { className: flexClassName, props: restProps } = getFlex(props);

  const className = getClassName({
    [props.className!]: Boolean(props.className),
    [flexClassName]: Boolean(flexClassName),
  });

  return <Box {...restProps} className={className} />;
};

export default Flex;
