export const flipOffset = (offset = 0) => {
  return offset >= 0 ? -offset : Math.abs(offset);
};
