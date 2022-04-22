import React from 'react';
import { cancelEvent } from '@utils/index';
import { getClassName } from '@reframework/classnames';
import { useKeyboardHandler } from '@utils/useKeyboardHandler';
import {
  manageFocusOnChange,
  useActiveDescendant,
} from '@utils/useActiveDescendant';
import { TabsClassName, useTabs } from './Tabs';
import Ink from './Ink';

export interface TabListProps {
  value?: string;
  className?: string;
  inkClassName?: string;
}

const defaultInkProps = { width: 0, left: 0 };

export const TabList: React.FC<TabListProps> = ({
  children: _children,
  className,
  inkClassName,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { value, tabNode, isControlled } = useTabs();
  const [inkProps, setInkProps] = React.useState(defaultInkProps);

  const activeTab = useActiveDescendant({
    parentRef: wrapperRef,
    onChange: manageFocusOnChange,
    filterElement: (node) => {
      if (node?.getAttribute('role') !== 'tab') return false;
      return node?.getAttribute('aria-disabled') !== 'true';
    },
  });

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

  const handleKeyDown = useKeyboardHandler({
    onArrowRight: (event) => {
      cancelEvent(event);
      activeTab.setNext();
    },
    onArrowLeft: (event) => {
      cancelEvent(event);
      activeTab.setPrevious();
    },
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
