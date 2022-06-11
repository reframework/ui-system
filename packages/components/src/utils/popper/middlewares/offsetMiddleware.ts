import { Popper } from '@utils/popper/Popper';

interface Offset {
  x?: number;
  y?: number;
}
export const middleware = (offset: Offset) => (params: { popper: Popper }) => {
  const { popper } = params;

  popper.move({
    x: offset.x || 0,
    y: offset.y || 0,
  });
};

export const offsetMiddleware = (offset: Offset) => ({
  name: 'offset',
  middleware: middleware(offset),
});
