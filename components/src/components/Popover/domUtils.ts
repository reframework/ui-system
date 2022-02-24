// DOM Helpers
import React from 'react';

export function addClickListener(handler: EventListener) {
  return window.addEventListener('click', handler);
}

export function addResizeListener(handler: EventListener) {
  return window.addEventListener('resize', handler);
}

export function removeClickListener(handler: EventListener) {
  return window.removeEventListener('click', handler);
}

export function removeResizeListener(handler: EventListener) {
  return window.removeEventListener('resize', handler);
}

export function addScrollListener(handler: EventListener) {
  return window.addEventListener('scroll', handler);
}

export function removeScrollListener(handler: EventListener) {
  return window.removeEventListener('scroll', handler);
}

export function stopPropagation(e: React.SyntheticEvent) {
  e.stopPropagation();
}

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
  callback: Fn
): Promise<ReturnType<Fn>> => {
  return new Promise((resolve) => {
    requestAnimationFrame((timestamp) => {
      resolve(callback(timestamp));
    });
  });
};
