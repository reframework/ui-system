import { createContext } from '../../utils/context';

export const [DescendantProvider, useDescendantContext] =
  createContext<{
    activeDescendant: any;
    onCloseRequest?: () => void;
  }>();
