// TODO: test memo

const arraysEqual = (arr: unknown[], nextArr: unknown[]) => {
  // Checks if arguments are arrays
  if (!Array.isArray(arr) || !Array.isArray(nextArr)) return false;
  // Compares a length
  if (arr.length !== nextArr.length) return false;
  // Compares each element
  const survivors = nextArr.filter((it, idx) => it !== arr[idx]);
  return survivors.length === 0;
};

export function attachMemo<T extends object>(
  obj: T,
  name: keyof T,
  revalidateDeps: (this: T) => any[],
) {
  /**
   * Hidden property
   */
  const index = Symbol.for(name as string);
  const proto = Object.getPrototypeOf(obj);

  // Shouldn't work without a prototype
  if (!proto) return;

  // @ts-expect-error get set...
  const { get, ...descriptors } = Object.getOwnPropertyDescriptor(proto, name);

  // Attaches metadata to the object
  obj[index] = {
    value: null,
    deps: null,
  };

  /**
   * Shouldn't work without a getter
   */
  if (typeof get !== 'function') return;

  // Prevents patching a prototype multiple times
  if (proto[index]) return;
  proto[index] = true;

  // Removes field in order to redefine it
  delete proto[name];

  // Wraps original getter
  Object.defineProperty(proto, name, {
    ...descriptors,
    get() {
      const prevDeps = this[index].deps;
      const nextDeps = revalidateDeps.call(this);
      this[index].deps = nextDeps;

      if (arraysEqual(prevDeps, nextDeps)) {
        return this[index].value;
      }

      this[index].value = get.call(this);
      return this[index].value;
    },
  });
}
