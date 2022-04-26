export class DOMFocus {
  static current: HTMLElement | null = null;

  static getActiveElement = () => {
    return document.activeElement;
  };

  static set = (node: HTMLElement, options?: { preventScroll: true }) => {
    node?.focus(options);
  };

  static save = () => {
    DOMFocus.current = document.activeElement as HTMLElement;
  };

  static restore = () => {
    if (!document.contains(DOMFocus.current)) return;
    DOMFocus.set(DOMFocus.current!);
  };
}

export const useDOMFocus = () => {
  return DOMFocus;
};
