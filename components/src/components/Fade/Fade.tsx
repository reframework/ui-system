import React, { useLayoutEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

// @types mistake
const endListener = () => {
  return;
};

type FadeProps = Omit<CSSTransitionProps, "addEndListener" | "classNames">;

export const Fade: React.FC<FadeProps> = ({
  children,
  timeout,
  in: inProp,
  ...props
}) => {
  const [internalIn, setInternalIn] = useState(false);

  useLayoutEffect(() => {
    setInternalIn(inProp);
  }, [inProp]);

  return (
    <CSSTransition
      {...props}
      in={internalIn}
      appear
      // todo timeout={timeout ?? 300}
      classNames="fade"
      addEndListener={endListener}
    >
      <div>{children}</div>
    </CSSTransition>
  );
};
