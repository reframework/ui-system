import React from 'react';
import { isFunction } from '@utils/index';
import { cloneChildRef } from '@utils/forkRef';

// TODO: add generic type for props
type Props = Record<string, any>;

const pipeCallbacks =
  (...fns: any[]) =>
  (...args: any[]) => {
    fns.forEach((fn) => fn?.(...args));
  };

const mergeStyles = (styleA: {}, styleB: {}) => {
  return Object.assign({}, styleA, styleB);
};

const MergeProps = React.forwardRef<any, Props>((props, parentRef) => {
  const { style, children, ...parentProps } = props;

  const child = React.Children.only(children) as React.ReactElement;

  const mergedProps = Object.entries(parentProps).reduce(
    (acc, [propKey, propValue]) => {
      const { [propKey]: childProp } = child.props;
      if (isFunction(propValue) && isFunction(childProp)) {
        // compose events
        acc[propKey] = pipeCallbacks(propValue, childProp);
        return acc;
      }

      if (propValue != null) {
        acc[propKey] = propValue;
      }

      return acc;
    },
    {} as Record<string, any>,
  );

  const newChildProps = {
    ...mergedProps,
    ...mergeStyles(child.props.style, style),
    ...cloneChildRef(child, parentRef),
  };

  return React.cloneElement(child, newChildProps);
});

export default MergeProps;
