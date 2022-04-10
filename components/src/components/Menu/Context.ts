import { firstOf, lastOf, nextOf, previousOf } from '../../utils';
import { createContext } from '../../utils/context';

export const [MenuProvider, useMenuContext] =
  createContext<{ isOpen: boolean; close: () => void }>();

export const [DescendantProvider, useDescendantContext] =
  createContext<{ activeDescendant: any }>();
