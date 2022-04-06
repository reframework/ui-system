import React from 'react';
import { getClassName } from '@reframework/classnames';
import { getGrid, AtomicGridProps } from '../../atomic/Grid/getGrid';
import { Box } from '../Box';
import { BoxProps } from '../Box/Box';

interface GridProps extends AtomicGridProps, BoxProps {}

const Grid: React.FC<GridProps> = (props) => {
  const { className: gridClassName, props: restProps } = getGrid(props);

  const className = getClassName({
    [props.className!]: Boolean(props.className),
    [gridClassName]: Boolean(gridClassName),
  });

  return <Box {...restProps} className={className} />;
};

export default Grid;
