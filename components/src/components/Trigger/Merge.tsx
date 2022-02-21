import React from 'react';
import { isFunction } from '../../utils';
import { cloneChildRef } from '../../utils/forkRef';

// TODO: add generic type for props
type MergeProps = Record<string, any>;

const pipeCallbacks =
  (...fns: any[]) =>
  (...args: any[]) => {
    fns.forEach((fn) => fn?.(...args));
  };

const mergeStyles = (styleA: {}, styleB: {}) => {
  return {
    style: {
      ...(styleA || {}),
      ...(styleB || {}),
    },
  };
};

const Merge = React.forwardRef<any, MergeProps>((props, parentRef) => {
  const child = React.Children.only(props.children) as React.ReactElement;

  const { children: _, style, ...parentProps } = props;

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
    {} as Record<string, any>
  );

  const newChildProps = {
    ...mergedProps,
    ...mergeStyles(child.props.style, style),
    ...cloneChildRef(child, parentRef),
  };

  return React.cloneElement(child, newChildProps);
});

export default Merge;
