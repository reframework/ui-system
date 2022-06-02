import React from 'react';
import { Popper, PopperProps } from '@components/Popper';
import { PaperProps, Paper } from '@components/Paper';

export interface PopoverProps extends PopperProps {
  children: React.ReactNode;
  paperProps?: PaperProps;
}

const Arrow = ({ placement }: PopperProps['placement']) => {
  const styles = {
    border: '5px solid transparent',
    borderLeft: '0px',
    borderRight: '5px solid white',
    display: 'block',
    left: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-100%, -50%)',
    width: 0,
  } as React.CSSProperties;

  return <span style={styles} />;
};

const Popover: React.FC<PopoverProps> = ({
  children,
  paperProps,
  ...props
}) => {
  return (
    <Popper {...props}>
      <Paper {...paperProps}>
        {false && <Arrow />}
        {children}
      </Paper>
    </Popper>
  );
};

export default Popover;
