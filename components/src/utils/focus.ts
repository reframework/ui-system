export class DOMFocus {
  static current: HTMLElement | null = null;

  static getActiveElement = () => {
    return document.activeElement;
  };

  static set = (node: HTMLElement) => {
    node?.focus();
  };

  static save = () => {
    DOMFocus.current = document.activeElement as HTMLElement;
  };

  static restore = () => {
    console.log(DOMFocus.current, 'focus');
    if (!document.contains(DOMFocus.current)) return;
    DOMFocus.set(DOMFocus.current!);
  };
}

export const useDOMFocus = () => {
  return DOMFocus;
};
