import { createContext } from '../../utils/context';
import { ActiveDescendant } from './useActiveDescendant';

export const [DescendantProvider, useDescendantContext] =
  createContext<{
    activeDescendant: ActiveDescendant;
  }>();
