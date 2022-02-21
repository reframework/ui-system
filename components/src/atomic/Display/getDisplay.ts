import { getClassName } from '@reframework/classnames';
import displayStyles from './display.module.css?module';

export interface AtomicDisplayProps {
  display: string;
}

export const getDisplay = <T extends AtomicDisplayProps>(props: T) => {
  const { display = 'block', ...restProps } = props;

  const className = getClassName({
    // display
    [displayStyles[`display-${display}`]]: Boolean(display),
  });

  return { className, props: restProps };
};
