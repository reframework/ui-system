import { getClassName } from '@reframework/classnames';
import React from 'react';
import { DescendantUtils } from '../Menu/useActiveDescendant';
import { cancelEvent, createKeyboardHandler } from '../Menu/utils';
import Ink from './Ink';
import { TabsClassName, useTabs } from './Tabs';

interface TabListProps {
  value?: string;
  className?: string;
  inkClassName?: string;
}

const defaultParams = { width: 0, left: 0 };

export const TabList: React.FC<TabListProps> = ({
  children: _children,
  className,
  inkClassName,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { value, activeTabNode } = useTabs();
  const [inkProps, setInkProps] = React.useState(defaultParams);

  React.useEffect(() => {
    if (!activeTabNode) return;
    if (!wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const activeTabRect = activeTabNode.getBoundingClientRect();

    setInkProps({
      left: activeTabRect.left - wrapperRect.left,
      width: activeTabRect.width,
    });
  }, [activeTabNode, value]);

  const handleKeyDown = createKeyboardHandler({
    onArrowRight: cancelEvent(() => {
      const next = DescendantUtils.getNext(
        Array.from(wrapperRef.current?.children || []),
        activeTabNode!
      );

      (next as HTMLElement)?.focus();
    }),
    onArrowLeft: cancelEvent(() => {
      const prev = DescendantUtils.getPrevious(
        Array.from(wrapperRef.current?.children || []),
        activeTabNode!
      );

      (prev as HTMLElement)?.focus();
    }),
  });

  const children = React.Children.map(_children, (child) => {
    if (!React.isValidElement(child)) return null;
    const isControlled = child.props.active !== undefined;
    const hasValue = child.props.value !== undefined;

    return React.cloneElement(child, {
      onKeyDown: handleKeyDown,
      active: isControlled
        ? child.props.active
        : hasValue && value === child.props.value,
    });
  });

  const classNames = getClassName({
    [TabsClassName.tabList]: true,
    className: Boolean(className),
  });

  return (
    <div ref={wrapperRef} className={classNames} role="tablist">
      {children}
      <Ink {...inkProps} className={inkClassName} />
    </div>
  );
};
