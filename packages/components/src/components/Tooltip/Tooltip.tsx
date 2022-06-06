import React from 'react';
import { Popper, PopperProps } from '@components/Popper';
import { PaperProps, Paper } from '@components/Paper';
import { MergedProps } from '@wip/MergeProps/MergeProps.stories';
import useCloneElement from '@wip/MergeProps/cloneElement';
import { useControlledState } from '@utils/useControlledState';

export interface TooltipProps extends PopperProps {
  children: React.ReactNode;
  paperProps?: PaperProps;
  title: React.ReactNode;
}

interface ArrowProps {
  style?: React.CSSProperties;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const Arrow = React.forwardRef<HTMLDivElement | null, ArrowProps>(
  ({ style, placement }, ref) => {
    const translateMapping = {
      left: '50%, 0px',
      right: '-50%, 0px',
      top: '0px, 50%',
      bottom: '0px, -50%',
    };

    const styles = {
      transform: `translate(${translateMapping[placement!]})`,
      ...style,
    } as React.CSSProperties;

    const beforeStyle = {
      width: 10,
      height: 10,
      background: 'var(--color-scale-white)',
      transform: `rotate(45deg)`,
    };

    return (
      <div ref={ref} style={styles}>
        <div style={beforeStyle} />
      </div>
    );
  },
);

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  paperProps,
  open,
  defaultOpen,
  ...props
}) => {
  const { state: internalOpen, setState: setInternalOpen } = useControlledState(
    {
      default: !!defaultOpen,
      controlled: open,
    },
  );

  const originRef = React.useRef<HTMLElement | null>(null);

  const origin = useCloneElement(children, {
    ref: originRef,
    onClick: () => {
      setInternalOpen(true);
    },
  });

  const onClickOutside = () => {
    setInternalOpen(false);
  };

  return (
    <>
      {origin}
      <Popper
        {...props}
        originElement={originRef.current}
        onClickOutside={onClickOutside}
        open={internalOpen}
        arrow={<Arrow />}
      >
        <Paper {...paperProps}>{title}</Paper>
      </Popper>
    </>
  );
};

export default Tooltip;
