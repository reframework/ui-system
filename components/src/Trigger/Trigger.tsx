import React from 'react';

const allEventNames = [
  'onBlur',
  'onClick',
  'onContextMenu',
  'onFocus',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onTouchStart',
] as const;

type TriggerEventName = typeof allEventNames[number];
type TriggerEventHandler = (event: React.SyntheticEvent) => void;

export type TriggerProps = {
  [eventName in TriggerEventName]?: TriggerEventHandler;
};

const Trigger: React.FC<TriggerProps> = (props) => {
  const child = React.Children.only(props.children);

  if (!React.isValidElement(child)) return null;

  const fireEvent =
    (eventName: TriggerEventName) => (event: React.SyntheticEvent) => {
      const childHandler = child.props[eventName];
      const triggerHandler = props[eventName];

      if (typeof childHandler === 'function') {
        childHandler(event);
      }

      if (typeof triggerHandler === 'function') {
        triggerHandler(event);
      }
    };

  const nextChildProps = allEventNames.reduce((acc, eventName) => {
    if (typeof props[eventName] === 'function') {
      acc[eventName] = fireEvent(eventName);
    }

    return acc;
  }, {} as Record<TriggerEventName, TriggerEventHandler>);

  return React.cloneElement(child, nextChildProps);
};

export default Trigger;
