import React from 'react';
import { getClassName } from '@reframework/classnames';
import './Badge.css';

enum BadgeClassNames {
  container = 'ref:badge-container',
  badge = 'ref:badge',
  //
  'bottom-left' = 'ref:badge-bottom-left',
  'bottom-right' = 'ref:badge-bottom-right',
  'top-left' = 'ref:badge-top-left',
  'top-right' = 'ref:badge-top-right',
  size = 'ref:badge-size',
}

enum StatusClassNames {
  status = 'ref:status',
  //
  away = 'ref:status-status-away',
  busy = 'ref:status-status-busy',
  offline = 'ref:status-status-offline',
  online = 'ref:status-status-online',
  // TODO:
  size = 'ref:status-size',
}

type BadgePosition = `${'top' | 'bottom'}-${'left' | 'right'}`;
type Status = 'online' | 'offline' | 'away' | 'busy';
// type Size = number | 's' | 'm' | 'l';

interface BadgeProps {
  className?: string;
  content?: React.ReactNode;
  position?: BadgePosition;
  size?: number;
  // TODO:
  overlap?: 'circular' | 'rectangular';
}

export const Badge: React.FC<BadgeProps> = ({
  position = 'top-right',
  content,
  className,
  children,
}) => {
  const badgeClassNames = getClassName({
    [BadgeClassNames.badge]: true,
    [BadgeClassNames[position]]: true,
    [className!]: !!className,
  });

  return (
    <div className={BadgeClassNames.container}>
      {children}
      <div className={badgeClassNames}>{content}</div>
    </div>
  );
};

interface StatusProps extends BadgeProps {
  status: Status;
}

export const StatusBadge: React.FC<StatusProps> = ({
  status,
  position = 'bottom-right',
  ...props
}) => {
  const statusClassNames = getClassName({
    [StatusClassNames.status]: true,
    [StatusClassNames[status!]]: true,
  });

  return <Badge {...props} position={position} className={statusClassNames} />;
};
