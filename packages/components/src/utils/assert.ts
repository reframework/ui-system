// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function>(f: unknown): f is T =>
  typeof f === 'function';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
