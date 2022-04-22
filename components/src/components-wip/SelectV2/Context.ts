import { ActiveDescendant } from '@utils/descendant';
import { createContext } from '../../utils/context';

export const [DescendantProvider, useDescendantContext] =
  createContext<{
    onCloseRequest?: () => void;
    activeDescendant: ActiveDescendant;
  }>();
