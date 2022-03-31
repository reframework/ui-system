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
const getTabs = <T extends HTMLElement>(el?: T) =>
  Array.from(el?.querySelectorAll('[role="tab"]:not(.disabled)') || []);

export const TabList: React.FC<TabListProps> = ({
  children: _children,
  className,
  inkClassName,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { value, tabNode } = useTabs();
  const [inkProps, setInkProps] = React.useState(defaultParams);

  React.useEffect(() => {
    if (!tabNode) return;
    if (!wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const activeTabRect = tabNode.getBoundingClientRect();

    setInkProps({
      left: activeTabRect.left - wrapperRect.left,
      width: activeTabRect.width,
    });
  }, [tabNode, value]);

  const handleKeyDown = createKeyboardHandler({
    onArrowRight: cancelEvent(() => {
      const next = DescendantUtils.getNext(
        getTabs(wrapperRef.current as HTMLElement),
        tabNode!
      );
      (next as HTMLElement)?.focus();
    }),
    onArrowLeft: cancelEvent(() => {
      const prev = DescendantUtils.getPrevious(
        getTabs(wrapperRef.current as HTMLElement),
        tabNode!
      );
      (prev as HTMLElement)?.focus();
    }),
  });

  const children = React.Children.map(_children, (child) => {
    if (!React.isValidElement(child)) return null;
    let active;

    if (child.props.disabled) {
      active = false;
    } else if (child.props.active !== undefined) {
      active = child.props.active;
    } else if (child.props.value !== undefined) {
      active = value === child.props.value;
    } else {
      active = false;
    }

    return React.cloneElement(child, {
      onKeyDown: handleKeyDown,
      active,
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
