import { EventKeyEnum } from '../../utils/KeyboardKey';

interface KeyboardManager {
  onArrowDown: (event: React.KeyboardEvent) => void;
  onArrowLeft: (event: React.KeyboardEvent) => void;
  onArrowRight: (event: React.KeyboardEvent) => void;
  onArrowUp: (event: React.KeyboardEvent) => void;
  onBackspace: (event: React.KeyboardEvent) => void;
  onEnd: (event: React.KeyboardEvent) => void;
  onEnter: (event: React.KeyboardEvent) => void;
  onEscape: (event: React.KeyboardEvent) => void;
  onHome: (event: React.KeyboardEvent) => void;
  onPrintable: (event: React.KeyboardEvent) => void;
  onSpace: (event: React.KeyboardEvent) => void;
  onTab: (event: React.KeyboardEvent) => void;
}

export const createKeyboardHandler =
  (manager: Partial<KeyboardManager>) => (event: React.KeyboardEvent) => {
    switch (event.key) {
      case EventKeyEnum.Down:
      case EventKeyEnum.ArrowDown: {
        manager.onArrowDown?.(event);
        break;
      }

      case EventKeyEnum.Up:
      case EventKeyEnum.ArrowUp: {
        manager.onArrowUp?.(event);
        break;
      }

      case EventKeyEnum.Right:
      case EventKeyEnum.ArrowRight: {
        manager.onArrowRight?.(event);
        break;
      }

      case EventKeyEnum.Left:
      case EventKeyEnum.ArrowLeft: {
        manager.onArrowLeft?.(event);
        break;
      }

      case EventKeyEnum.End: {
        manager.onEnd?.(event);
        break;
      }

      case EventKeyEnum.Home: {
        manager.onHome?.(event);
        break;
      }

      case EventKeyEnum.Escape: {
        manager.onEscape?.(event);
        break;
      }

      case EventKeyEnum.Enter: {
        manager.onEnter?.(event);
        break;
      }

      case EventKeyEnum.Space:
      case EventKeyEnum.SpaceValue: {
        manager.onSpace?.(event);
        break;
      }

      case EventKeyEnum.Tab: {
        manager.onTab?.(event);
        break;
      }

      default:
      // Handle printable key to select by content
    }
  };

export const cancelEvent =
  (fn: (event: React.KeyboardEvent) => void) =>
  (event: React.KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    fn(event);
  };

const isNodeDisabled = (node: Node | HTMLElement) => {
  return (
    (node as HTMLElement).getAttribute('aria-disabled') === 'true' ||
    (node as HTMLElement).getAttribute('disabled') === 'true'
  );
};

// useConst
// useLet

export const getEnabledItems = (node: HTMLElement | null) => {
  // todo: add roles menuitemcheckbox, menuitemchecoption
  return Array.from(node?.querySelectorAll?.('[role="menuitem"]') || []).filter(
    (node) => !isNodeDisabled(node)
  ) as HTMLElement[];
};

export const getActiveEl = (node: Node | null) => {
  return node?.ownerDocument?.activeElement;
};
