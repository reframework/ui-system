import { DOMFocus } from '@utils/focus';

export const manageFocusOnChange = (
  prev: HTMLElement | null,
  next: HTMLElement | null,
) => {
  if (prev) {
    prev.tabIndex = -1;
  }
  if (next) {
    next.tabIndex = 0;
    DOMFocus.set(next, { preventScroll: true });
  }
};
