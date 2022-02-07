import { CSSProperties, useEffect, useImperativeHandle, useRef } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';

export const useCreated = (callback: () => void) => {
  const created = useRef(false);
  if (created.current) return;
  created.current = true;
  callback();
};

export function isClient(): boolean {
  return typeof document !== 'undefined';
}

const defaultStyle = {
  position: 'absolute',
  zIndex: 800,
  width: '100%',
  top: '0px',
};

export function createContainer(params: {
  id?: string;
  style?: CSSProperties;
  element?: keyof JSX.IntrinsicElements;
  className?: string;
}): HTMLElement | null {
  if (!isClient()) return null;

  const { id, style = defaultStyle, element = 'div', className } = params;

  // Checks if id is ready to use
  const hasValidId = typeof id === 'string' && id.trim().length > 0;

  // When id is provided trying to find the Node,
  // otherwise creates the new one
  const container =
    (hasValidId && document.getElementById(id)) ||
    document.createElement(element);

  // Return's an existing node
  if (hasValidId && container.getAttribute('id') === id) {
    return container;
  }

  // Adds an id if provided
  if (hasValidId) {
    container.setAttribute('id', id);
  }

  // Adds a className if provided
  if (className) {
    container.classList.add(className);
  }

  // Adds a style if provided
  if (style) {
    Object.assign(container.style, style);
  }

  return container;
}

export interface PortalProps {
  children: React.ReactNode;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  id?: string;
  ref?: React.MutableRefObject<HTMLElement | null>;
  style?: CSSProperties;
}

const Portal = React.forwardRef<HTMLElement | null, PortalProps>(
  ({ children, element, id, style, className }, ref) => {
    const containerRef = useRef<HTMLElement | null>(
      createContainer({ id, style, element, className })
    );

    // Allow to customize the Node using a ref
    useImperativeHandle(ref, () => containerRef.current!, []);

    useCreated(() => {
      if (!isClient() || !containerRef.current) return;
      // Adds the Node to the DOM
      document.body.appendChild(containerRef.current);
    });

    useEffect(
      () => () => {
        if (!isClient() || !containerRef.current) return;
        // RemoveChild method throws if no matching Node
        if (!document.body?.contains?.(containerRef.current)) return;
        // Removes the Node from the DOM before unmounting
        document.body.removeChild(containerRef.current);
      },
      []
    );

    // Creates a Portal
    return containerRef.current
      ? ReactDOM.createPortal(children, containerRef.current)
      : null;
  }
);

export default Portal;
