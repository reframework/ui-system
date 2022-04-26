import React from 'react';
import { getClassName } from '@reframework/classnames';
import { getCSSSize } from '../../utils';
import './Badge.css';

enum BadgeClassName {
  container = 'ref:badge-container',
  badge = 'ref:badge',
  //
  'bottom-left' = 'ref:badge-bottom-left',
  'bottom-right' = 'ref:badge-bottom-right',
  'top-left' = 'ref:badge-top-left',
  'top-right' = 'ref:badge-top-right',
}

enum StatusClassName {
  status = 'ref:status',
  //
  away = 'ref:status-away',
  busy = 'ref:status-busy',
  offline = 'ref:status-offline',
  online = 'ref:status-online',
  animated = 'ref:status-animated',
}

type BadgePosition = `${'top' | 'bottom'}-${'left' | 'right'}`;
type Status = 'online' | 'offline' | 'away' | 'busy';

export interface BadgeProps {
  className?: string;
  content?: React.ReactNode;
  position?: BadgePosition;
  size?: number | string;
  // TODO: after avatar shape is ready
  overlap?: 'circular' | 'rectangular';
}

export const Badge: React.FC<BadgeProps> = ({
  position = 'top-right',
  content = null,
  className,
  children,
  size,
}) => {
  const badgeClassNames = getClassName({
    [BadgeClassName.badge]: true,
    [BadgeClassName[position]]: true,
    [className!]: !!className,
  });

  const style = {
    '--badge-size': getCSSSize(size),
  } as React.CSSProperties;

  return (
    <div className={BadgeClassName.container}>
      {children}
      <div className={badgeClassNames} style={style}>
        {content}
      </div>
    </div>
  );
};

export interface OnlineStatusProps extends BadgeProps {
  status: Status;
  animated?: boolean;
}

export const OnlineStatus: React.FC<OnlineStatusProps> = ({
  status,
  position = 'bottom-right',
  animated = false,
  ...props
}) => {
  const statusClassNames = getClassName({
    [StatusClassName.status]: true,
    [StatusClassName[status!]]: true,
    [StatusClassName.animated]: animated,
  });

  return <Badge {...props} position={position} className={statusClassNames} />;
};
