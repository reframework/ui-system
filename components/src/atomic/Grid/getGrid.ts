import { getClassName } from '@reframework/classnames';
import { AtomicContentPlacementProps } from '../Common/contentPlacement';
import styles from './grid.css?module';

export interface AtomicGridProps extends AtomicContentPlacementProps {
  cols?: number;
  colsNone?: boolean;
  colSpan?: number;
  colStart?: number;
  colEnd?: number;
  colAuto?: boolean;
  colSpanFull?: boolean;
  colStartAuto?: boolean;
  colEndAuto?: boolean;
  rows?: number;
  rowsNone?: boolean;
  rowSpan?: number;
  rowStart?: number;
  rowEnd?: number;
  rowAuto?: boolean;
  rowSpanFull?: boolean;
  rowStartAuto?: boolean;
  rowEndAuto?: boolean;
  autoFlowRow?: boolean;
  autoFlowCol?: boolean;
  autoFlowRowDense?: boolean;
  autoFlowColDense?: boolean;
  autoColsAuto?: boolean;
  autoColsMin?: boolean;
  autoColsMax?: boolean;
  autoColsFr?: boolean;
  autoRowsAuto?: boolean;
  autoRowsMin?: boolean;
  autoRowsMax?: boolean;
  autoRowsFr?: boolean;
  gap?: string;
  colGap?: string;
  rowGap?: string;
}

export const getGrid = <T extends AtomicGridProps>(props: T) => {
  const {
    alignContent,
    justifyContent,
    placeContent,
    alignItems,
    placeItems,
    justifyItems,
    // grid
    autoColsAuto,
    autoColsFr,
    autoColsMax,
    autoColsMin,
    autoFlowCol,
    autoFlowColDense,
    autoFlowRow,
    autoFlowRowDense,
    autoRowsAuto,
    autoRowsFr,
    autoRowsMax,
    autoRowsMin,
    colAuto,
    colEnd,
    colEndAuto,
    colGap,
    cols,
    colsNone,
    colSpan,
    colSpanFull,
    colStart,
    colStartAuto,
    gap,
    rowAuto,
    rowEnd,
    rowEndAuto,
    rowGap,
    rows,
    rowsNone,
    rowSpan,
    rowSpanFull,
    rowStart,
    rowStartAuto,
    ...restProps
  } = props;

  const className = getClassName({
    [styles[`alignContent-${alignContent}`]]: Boolean(alignContent),
    [styles[`justifyContent-${justifyContent}`]]: Boolean(justifyContent),
    [styles[`placeContent-${placeContent}`]]: Boolean(placeContent),
    [styles[`alignItems-${alignItems}`]]: Boolean(alignItems),
    [styles[`justifyItems-${justifyItems}`]]: Boolean(justifyItems),
    [styles[`placeItems-${placeItems}`]]: Boolean(placeItems),
    // grid
    [styles[`cols-${cols}`]]: Boolean(cols),
    [styles[`cols-none`]]: Boolean(colsNone),
    [styles[`col-span-${colSpan}`]]: Boolean(colSpan),
    [styles[`col-start-${colStart}`]]: Boolean(colStart),
    [styles[`col-end-${colEnd}`]]: Boolean(colEnd),
    [styles[`col-auto-${colAuto}`]]: Boolean(colAuto),
    [styles[`col-span-full-${colSpanFull}`]]: Boolean(colSpanFull),
    [styles[`col-start-auto-${colStartAuto}`]]: Boolean(colStartAuto),
    [styles[`col-end-auto-${colEndAuto}`]]: Boolean(colEndAuto),
    [styles[`rows-${rows}`]]: Boolean(rows),
    [styles[`rows-none-${rowsNone}`]]: Boolean(rowsNone),
    [styles[`row-span-${rowSpan}`]]: Boolean(rowSpan),
    [styles[`row-start-${rowStart}`]]: Boolean(rowStart),
    [styles[`row-end-${rowEnd}`]]: Boolean(rowEnd),
    [styles[`row-auto`]]: Boolean(rowAuto),
    [styles[`row-span-full`]]: Boolean(rowSpanFull),
    [styles[`row-start-auto`]]: Boolean(rowStartAuto),
    [styles[`row-end-auto`]]: Boolean(rowEndAuto),
    [styles[`auto-flow-row`]]: Boolean(autoFlowRow),
    [styles[`auto-flow-col`]]: Boolean(autoFlowCol),
    [styles[`auto-flow-row-dense`]]: Boolean(autoFlowRowDense),
    [styles[`auto-flow-col-dense`]]: Boolean(autoFlowColDense),
    [styles[`auto-cols-auto`]]: Boolean(autoColsAuto),
    [styles[`auto-cols-min`]]: Boolean(autoColsMin),
    [styles[`auto-cols-max`]]: Boolean(autoColsMax),
    [styles[`auto-cols-fr`]]: Boolean(autoColsFr),
    [styles[`auto-rows-auto`]]: Boolean(autoRowsAuto),
    [styles[`auto-rows-min`]]: Boolean(autoRowsMin),
    [styles[`auto-rows-max`]]: Boolean(autoRowsMax),
    [styles[`auto-rows-fr`]]: Boolean(autoRowsFr),
    [styles[`gap-${gap}`]]: Boolean(gap),
    [styles[`col-gap-${colGap}`]]: Boolean(colGap),
    [styles[`row-gap-${rowGap}`]]: Boolean(rowGap),
  });

  return { className, props: restProps };
};
