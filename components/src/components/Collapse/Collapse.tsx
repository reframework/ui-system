import React, { useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type ExcludedProps = 'appear' | 'classNames' | 'unmountOnExit' | 'style';
// @types mistake
const endListener = () => {
  return;
};

type CollapseProps = Omit<CSSTransitionProps, ExcludedProps> & {
  defaultExpanded?: boolean;
};

export const Collapse: React.FC<CollapseProps> = ({
  children,
  defaultExpanded,
  ...props
}) => {
  const [showContent, setShowContent] = useState(false);
  const [height, setHeight] = useState(0);
  const [className, setClassName] = useState(
    defaultExpanded ? 'default-expanded' : '',
  );
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const setContainerHeight = useCallback(() => {
    if (!container) return;
    setHeight(container.getBoundingClientRect().height);
  }, [container]);

  useEffect(() => {
    if (!container) return;

    setHeight(container.getBoundingClientRect().height);
    return () => {
      setHeight(0);
    };
  }, [container]);

  useEffect(() => {
    if (!container) return;

    const observer = new MutationObserver(setContainerHeight);
    observer.observe(container, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [container, setContainerHeight]);

  return (
    <CSSTransition
      style={{ height }}
      unmountOnExit
      appear
      className={className}
      classNames={'collapse'}
      // TODO timeout={props.timeout ?? timeout}
      addEndListener={endListener}
      onEntering={() => setShowContent(true)}
      onExiting={() => setShowContent(false)}
      onEntered={() => setClassName('')}
      {...props}
    >
      <div>
        <CSSTransition
          {...props}
          in={showContent}
          timeout={100}
          classNames="fade"
          addEndListener={endListener}
        >
          <div ref={setContainer}>{children}</div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
