import { getClassName } from '@reframework/classnames';
import { AtomicContentPlacementProps } from '../Common/contentPlacement';
import styles from './flex.module.css?module';

export interface AtomicFlexProps extends AtomicContentPlacementProps {
  alignSelf?: string;
  placeSelf?: string;
  justifySelf?: string;
  // flex
  direction?: string;
  flexWrap?: string;
}

export const getFlex = <T extends AtomicFlexProps>(props: T) => {
  const {
    alignContent,
    justifyContent,
    placeContent,
    alignItems,
    placeItems,
    justifyItems,
    // flex
    alignSelf,
    placeSelf,
    direction = 'row',
    justifySelf,
    flexWrap = 'nowrap',
    ...restProps
  } = props;

  const className = getClassName({
    [styles.flex]: true,
    [styles[`alignContent-${alignContent}`]]: Boolean(alignContent),
    [styles[`justifyContent-${justifyContent}`]]: Boolean(justifyContent),
    [styles[`placeContent-${placeContent}`]]: Boolean(placeContent),
    [styles[`alignItems-${alignItems}`]]: Boolean(alignItems),
    [styles[`justifyItems-${justifyItems}`]]: Boolean(justifyItems),
    [styles[`placeItems-${placeItems}`]]: Boolean(placeItems),
    [styles[`flexWrap-${flexWrap}`]]: Boolean(flexWrap),
    [styles[`alignSelf-${alignSelf}`]]: Boolean(alignSelf),
    [styles[`justifySelf-${justifySelf}`]]: Boolean(justifySelf),
    [styles[`placeSelf-${placeSelf}`]]: Boolean(placeSelf),
    [styles[`direction-${direction}`]]: Boolean(direction),
  });

  return { className, props: restProps };
};
