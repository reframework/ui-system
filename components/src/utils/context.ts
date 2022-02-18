import * as React from 'react';

export interface CreateContextOptions {
  strict?: boolean;
  errorMessage?: string;
  displayName?: string;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const { strict = true, errorMessage = 'No Context', displayName } = options;

  const Context = React.createContext<ContextType | undefined>(undefined);

  Context.displayName = displayName;

  function useContext() {
    const context = React.useContext(Context);

    if (strict && !context) {
      const error = new Error(errorMessage);
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return [
    Context.Provider,
    useContext,
    Context,
  ] as CreateContextReturn<ContextType>;
}
