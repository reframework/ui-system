import { Popper } from '@components/Popper/popper/Popper';

const getParentRect = (popperElement: HTMLElement) => {
  return (popperElement.offsetParent || document.body).getBoundingClientRect();
};

export const getParentOffset = (
  originRect: DOMRect,
  parentRect: DOMRect,
): { left: number; top: number } => {
  // to do: ownDocument

  return {
    top: originRect.top - parentRect.top,
    left: originRect.left - parentRect.left,
  };
};

const positionAbsolute = (params: { popper: Popper }) => {
  const { popper } = params;

  const parentRect = getParentRect(popper.element);
  const parentOffset = getParentOffset(
    popper.origin.getBoundingClientRect(),
    parentRect,
  );

  popper.move({
    x: parentOffset.left,
    y: parentOffset.top,
  });

  // todo: Move arrow and hoverTrap
};

export const positionAbsoluteMiddleware = {
  name: 'positionAbsolute',
  middleware: positionAbsolute,
};
