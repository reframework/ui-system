import React from 'react';
import { cancelEvent } from '@utils/index';
import { createKeyboardHandler } from '@utils/Keyboard';
import { getClassName } from '@reframework/classnames';
import { TabsClassName, useTabs } from './Tabs';
import Ink from './Ink';

class DescendantUtils {}
export interface TabListProps {
  value?: string;
  className?: string;
  inkClassName?: string;
}

const defaultInkProps = { width: 0, left: 0 };
const getTabs = <T extends HTMLElement>(el?: T) => {
  const className = TabsClassName.disabled.replace(':', '\\:');
  const selector = `[role="tab"]:not(.${className})`;
  return Array.from(el?.querySelectorAll(selector) || []);
};

export const TabList: React.FC<TabListProps> = ({
  children: _children,
  className,
  inkClassName,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { value, tabNode, isControlled } = useTabs();
  const [inkProps, setInkProps] = React.useState(defaultInkProps);

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
        tabNode!,
      );
      (next as HTMLElement)?.focus();
    }),
    onArrowLeft: cancelEvent(() => {
      const prev = DescendantUtils.getPrevious(
        getTabs(wrapperRef.current as HTMLElement),
        tabNode!,
      );
      (prev as HTMLElement)?.focus();
    }),
  });

  const children = React.Children.map(_children, (child) => {
    if (!React.isValidElement(child)) return null;
    let active = false;
    let tabIndex;

    // So disabled tab couldn't be active
    if (!child.props.disabled) {
      // Controlled tab
      if (typeof child.props.active === 'boolean') {
        active = child.props.active;
        // Uncontrolled tab
      } else {
        active = value === child.props.value;
      }
    }

    if (isControlled) {
      // When tabs are controlled set tabIndex only for active tab, so user could navigate to this tab via keyboard
      if (active) tabIndex = 0;
    } else {
      // When tabs are uncontrolled then set tabindex for all tabs except disabled
      if (typeof child.props.tabIndex === 'number') {
        tabIndex = child.props.tabIndex;
      } else {
        if (!child.props.disabled) {
          tabIndex = active ? 0 : -1;
        }
      }
    }

    return React.cloneElement(child, {
      onKeyDown: handleKeyDown,
      tabIndex,
      active,
    });
  });

  const classNames = getClassName({
    [TabsClassName.tabList]: true,
    // [TabsClassName.animated]: internalAnimated,
    className: Boolean(className),
  });

  return (
    <div ref={wrapperRef} className={classNames} role="tablist">
      {children}
      <Ink {...inkProps} className={inkClassName} />
    </div>
  );
};
