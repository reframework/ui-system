import { SyntheticEvent } from "react";

export type PlacementAxis = "before" | "end" | "center" | "start" | "after";
export type Placement = `${PlacementAxis}-${PlacementAxis}`;

export enum ViewportType {
  window = "window",
  body = "body",
}

export enum Axis {
  x = "x",
  y = "y",
}

export type ClientRect = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};
