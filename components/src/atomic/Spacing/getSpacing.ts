import { getClassName } from '@reframework/classnames';
import styles from './spacing.module.css?module?module';

type Size = 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

export interface AtomicSpacingProps {
  m?: Size;
  mb?: Size;
  ml?: Size;
  mr?: Size;
  mt?: Size;
  mx?: Size;
  my?: Size;
  p?: Size;
  pb?: Size;
  pl?: Size;
  pr?: Size;
  pt?: Size;
  px?: Size;
  py?: Size;
}

export const getSpacing = (props: AtomicSpacingProps) => {
  const { m, mx, mt, ml, mb, mr, my, p, px, pt, pl, pb, pr, py, ...restProps } =
    props;

  const className = getClassName({
    // margin
    [styles[`margin-${m}`]]: Boolean(m),
    [styles[`marginTop-${my || mt}`]]: Boolean(my || mt),
    [styles[`marginRight-${mx || mr}`]]: Boolean(mx || mr),
    [styles[`marginBottom-${my || mb}`]]: Boolean(my || mb),
    [styles[`marginLeft-${mx || ml}`]]: Boolean(mx || ml),
    // padding
    [styles[`padding-${p}`]]: Boolean(p),
    [styles[`paddingTop-${py || pt}`]]: Boolean(py || pt),
    [styles[`paddingRight-${px || pr}`]]: Boolean(px || pr),
    [styles[`paddingBottom-${py || pb}`]]: Boolean(py || pb),
    [styles[`paddingLeft-${px || pl}`]]: Boolean(px || pl),
  });

  return { className, props: restProps };
};
