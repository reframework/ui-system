// DOM Helpers
import React from "react";

export function addClickListener(handler: EventListener) {
  return window.addEventListener("click", handler);
}

export function addResizeListener(handler: EventListener) {
  return window.addEventListener("resize", handler);
}

export function removeClickListener(handler: EventListener) {
  return window.removeEventListener("click", handler);
}

export function removeResizeListener(handler: EventListener) {
  return window.removeEventListener("resize", handler);
}

export function stopPropagation(e: React.SyntheticEvent) {
  e.stopPropagation();
}
