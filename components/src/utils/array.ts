import { Optional } from '@utils/types';

export const lastOf = <T>(arr: T[]): Optional<T> => {
  return arr[arr.length - 1];
};

export const firstOf = <T>(arr: T[]): Optional<T> => {
  return arr[0];
};

export const nextOf = <T>(arr: T[], idx: number): Optional<T> => {
  return arr[idx + 1];
};

export const previousOf = <T>(arr: T[], idx: number): Optional<T> => {
  return arr[idx - 1];
};
