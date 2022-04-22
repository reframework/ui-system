// DOM Helpers

export const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback: any) {
    window.setTimeout(callback, 1000 / 60);
  };

export const asyncRAF = async <Fn extends (...args: any) => any>(
  callback: Fn,
): Promise<ReturnType<Fn>> => {
  return new Promise((resolve) => {
    requestAnimationFrame((timestamp) => {
      resolve(callback(timestamp));
    });
  });
};
