import React from 'react';
import { isFunction } from '@utils/index';
import { useMergeRef } from '@utils/forkRef';

// TODO: add generic type for props
type Props = Record<string, any>;

const mergeCallbacks =
  (...fns: any[]) =>
  (...args: any[]) => {
    fns.forEach((fn) => fn?.(...args));
  };

const mergeStyles = (styleA: {}, styleB: {}) => {
  // Edge case when no `style` provided
  if (!styleA && !styleB) return;
  return Object.assign({}, styleA, styleB);
};

const MergeProps = React.forwardRef<any, Props>((props, parentRef) => {
  const { style: parentStyle, children, ...parentProps } = props;

  const child = React.Children.only(children) as React.ReactElement;

  // @ts-expect-error there is no ref in typescript types
  const ref = useMergeRef(parentRef, child.ref);
  const style = mergeStyles(parentStyle, child.props.style);

  const mergedProps = Object.entries(parentProps).reduce(
    (acc, [propKey, propValue]) => {
      const { [propKey]: childProp } = child.props;

      if (isFunction(propValue) && isFunction(childProp)) {
        acc[propKey] = mergeCallbacks(propValue, childProp);
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
    ...(style ? { style } : {}),
    ...(ref ? { ref } : {}),
  };

  return React.cloneElement(child, newChildProps);
});

export default MergeProps;
