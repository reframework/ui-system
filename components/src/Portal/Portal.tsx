import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';

export type PortalProps = {
  id: string;
  zIndex?: number;
};

export const useCreated = (callback: () => void) => {
  const created = useRef(false);
  if (created.current) return;
  created.current = true;
  callback();
};

export function isClient(): boolean {
  return typeof window?.document?.body !== 'undefined';
}

export function createHTMLDivElement(
  id: string,
  zIndex = 800
): HTMLDivElement | null {
  if (!isClient()) return null;

  const existedDiv = document.getElementById(id) as HTMLDivElement | null;

  if (existedDiv) return existedDiv;

  const div = document.createElement('div');
  div.setAttribute('id', id);
  div.style.position = 'absolute';
  div.style.zIndex = zIndex.toString();
  div.style.width = '100%';
  div.style.top = '0px';
  return div;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  zIndex,
  id = 'portal-root',
}) => {
  const html = useRef<{ root: HTMLElement | null; el: HTMLDivElement | null }>({
    root: isClient() ? document.body : null,
    el: createHTMLDivElement(id, zIndex),
  });

  useCreated(() => {
    if (!html.current.root || !html.current.el) return;
    html.current.root.appendChild(html.current.el);
  });

  useEffect(
    () => () => {
      if (!html.current.root || !html.current.el) return;
      if (!html.current.root?.contains?.(html.current.el)) return;
      html.current.root.removeChild(html.current.el);
    },
    []
  );

  return html.current.el
    ? ReactDOM.createPortal(children, html.current.el)
    : null;
};
