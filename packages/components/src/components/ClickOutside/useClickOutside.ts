import { firstOf } from '@utils/array';
import { useDynamicRef } from '@utils/useDynamicRef';
import { useEvent } from '@utils/useEvent';
import * as React from 'react';

export const ownerDocument = (node: Node | null | undefined): Document => {
  return (node && node.ownerDocument) || document;
};

function clickedRootScrollbar(event: MouseEvent, doc: Document) {
  return (
    doc.documentElement.clientWidth < event.clientX ||
    doc.documentElement.clientHeight < event.clientY
  );
}

type ClickOutsideMouseEvent =
  | 'click'
  | 'mousedown'
  | 'mouseup'
  | 'pointerdown'
  | 'pointerup';

type ClickOutsideTouchEvent = 'touchStart' | 'touchEnd';

type OutsideClickNode = Element | HTMLElement | null;

export interface UseClickOutsideProps {
  elements?: OutsideClickNode[];
  refs?: React.MutableRefObject<OutsideClickNode>[];
  /**
   * The mouse event to listen to.
   * You can disable the listener by providing `null`.
   */
  mouseEvent?: ClickOutsideMouseEvent | null;
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
  /**
   * The touch event to listen to.
   * You can disable the listener by providing `null`.
   */
  touchEvent?: ClickOutsideTouchEvent | null;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
function useClickOutside(props: UseClickOutsideProps) {
  const {
    mouseEvent = 'click',
    onClickOutside = () => {
      // noop
    },
    elements = [],
    refs = [],
    touchEvent = 'touchend',
  } = props;
  const elementsRef = useDynamicRef(elements);
  const movedRef = React.useRef(false);

  const isOutsideOfElement = (
    event: MouseEvent | TouchEvent,
    element: OutsideClickNode,
  ) => {
    const doc = ownerDocument(element);

    if (!element) {
      return false;
    }

    if ('clientX' in event && clickedRootScrollbar(event, doc)) {
      return false;
    }

    // ? Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return false;
    }

    if (!(element instanceof Node)) {
      return true;
    }
    /**
     * TODO: add skipUnmounted
     * Ensure that element in a DOM
     */

    if (!doc.documentElement.contains(element)) {
      return false;
    }

    // Polyfill https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
    if (
      typeof event.composedPath === 'function' &&
      event.composedPath().indexOf(element) !== -1
    ) {
      // Inside Node
      return false;
    }

    if (element === (event.target as Node)) {
      // Inside Node
      return false;
    }

    if (element.contains(event.target as Node)) {
      // Inside Node
      return false;
    }

    return true;
  };

  const handleClickOutside = useEvent((e: MouseEvent | TouchEvent) => {
    // Works with refs and elements as well
    const elementsOnly = [
      ...elementsRef.current.filter(Boolean),
      ...refs?.map((ref) => ref.current)?.filter(Boolean),
    ];

    // Event should be handled only when outside of each element
    if (elementsOnly.every((el) => isOutsideOfElement(e, el))) {
      onClickOutside?.(e);
    }
  });

  // To do: test touch move
  React.useEffect(() => {
    if (!touchEvent) return;
    const doc = ownerDocument(firstOf(elementsRef.current));

    const handleTouchMove = () => {
      movedRef.current = true;
    };

    doc.addEventListener(touchEvent, handleClickOutside);
    doc.addEventListener('touchmove', handleTouchMove);

    return () => {
      doc.removeEventListener(touchEvent, handleClickOutside);
      doc.removeEventListener('touchmove', handleTouchMove);
    };
    // we don't need to check an array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchEvent]);

  React.useEffect(() => {
    if (!mouseEvent) return;

    // To do: Test with iframe
    window.addEventListener(mouseEvent, handleClickOutside);

    return () => {
      window.removeEventListener(mouseEvent, handleClickOutside);
    };
    // we don't need to check an array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseEvent]);
}

export default useClickOutside;
