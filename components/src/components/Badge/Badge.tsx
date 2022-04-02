import React from 'react';
import { getClassName } from '@reframework/classnames';
import './Badge.css';
import { getCSSSize } from '../../utils';

enum BadgeClassNames {
  container = 'ref:badge-container',
  badge = 'ref:badge',
  //
  'bottom-left' = 'ref:badge-bottom-left',
  'bottom-right' = 'ref:badge-bottom-right',
  'top-left' = 'ref:badge-top-left',
  'top-right' = 'ref:badge-top-right',
}

enum StatusClassNames {
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

interface BadgeProps {
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
    [BadgeClassNames.badge]: true,
    [BadgeClassNames[position]]: true,
    [className!]: !!className,
  });

  const style = {
    '--badge-size': getCSSSize(size),
  } as React.CSSProperties;

  return (
    <div className={BadgeClassNames.container}>
      {children}
      <div className={badgeClassNames} style={style}>
        {content}
      </div>
    </div>
  );
};

interface OnlineStatus extends BadgeProps {
  status: Status;
  animated?: boolean;
}

export const OnlineStatus: React.FC<OnlineStatus> = ({
  status,
  position = 'bottom-right',
  animated = false,
  ...props
}) => {
  const statusClassNames = getClassName({
    [StatusClassNames.status]: true,
    [StatusClassNames[status!]]: true,
    [StatusClassNames.animated]: animated,
  });

  return <Badge {...props} position={position} className={statusClassNames} />;
};
