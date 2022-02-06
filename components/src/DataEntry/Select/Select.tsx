import React, { useCallback, useEffect, useRef, useState } from 'react';
import Paper, { PaperProps } from '../../Containers/Paper/Paper';
import Popover, { PopoverProps } from '../../Messaging/Popover/Popover';
import Input, { InputProps, Refs } from '../Input/Input';
// import List from '../../DataDisplay/List/List';

const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return {
    state,
    setTrue,
    setFalse,
    toggle,
  };
};

export interface SelectProps {
  children: React.ReactNode;
  onSelect: () => {};
  onChange: () => {};
  value: string;
  // nested
  InputProps: InputProps;
  PopoverProps: PopoverProps;
  PaperProps: PaperProps;
}

const Select = ({
  children,
  PaperProps,
  PopoverProps,
  InputProps,
}: SelectProps) => {
  const ref = useRef<Refs>();

  const { state: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

  const handleFocus = () => {
    open();
  };

  const handleBlur = () => {
    close();
  };

  return (
    <>
      <Input
        {...InputProps}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Popover
        {...PopoverProps}
        open={isOpen}
        anchorEl={ref.current?.wrapper.current}
        placement="start-after"
      >
        <Paper {...PaperProps}>{children}</Paper>
      </Popover>
    </>
  );
};

export default Select;
