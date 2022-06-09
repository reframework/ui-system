import { Popper } from '@components/Popper/popper/Popper';

export enum Axis {
  X = 'X',
  Y = 'Y',
}

export enum PlacementInternal {
  after = 'after',
  before = 'before',
  center = 'center',
  end = 'end',
  start = 'start',
}

export type PlacementTuple = [PlacementInternal, PlacementInternal];

export interface PopperMiddleware {
  name: string;
  middleware: (params: { popper: Popper; middlewareResult: any }) => any;
}
