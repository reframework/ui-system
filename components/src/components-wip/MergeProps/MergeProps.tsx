import React from 'react';
import { isFunction } from '@utils/index';
import { useMergedRef } from '@utils/useMergedRef';

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
  const ref = useMergedRef(child.ref, parentRef);
  const style = mergeStyles(child.props.style, parentStyle);

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
