import * as React from 'react';
import { useMergedRef } from '@utils/useMergedRef';
import useClickOutside, { UseClickOutsideProps } from './useClickOutside';

export interface ClickOutsideProps
  // To do: include refs and elements to the props
  extends Omit<UseClickOutsideProps, 'refs' | 'elements'> {
  /**
   * The wrapped element.
   */
  children: React.ReactElement;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
function ClickOutside(props: ClickOutsideProps): JSX.Element {
  const { children, ...restProps } = props;
  const ref = React.useRef<HTMLElement | null>(null);

  const mergedRef = useMergedRef(
    // @ts-expect-error Ref should be
    children.ref,
    ref,
  );

  useClickOutside({
    ...restProps,
    refs: [ref],
  });

  // React.Children.only?
  return <>{React.cloneElement(children, { ref: mergedRef })}</>;
}

export default ClickOutside;
