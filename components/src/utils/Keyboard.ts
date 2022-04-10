/* eslint-disable @typescript-eslint/no-unused-vars */
export enum EventKeyEnum {
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  Backspace = 'Backspace',
  Control = 'Control',
  Delete = 'Delete',
  Down = 'Down',
  End = 'End',
  Enter = 'Enter',
  Escape = 'Escape',
  Home = 'Home',
  Left = 'Left',
  Meta = 'Meta',
  PageDown = 'PageDown',
  PageUp = 'PageUp',
  Right = 'Right',
  Shift = 'Shift',
  Space = 'Space',
  SpaceValue = ' ',
  Tab = 'Tab',
  Up = 'Up',
}

interface KeyboardManager {
  beforeAll: (event: React.KeyboardEvent) => void;
  afterAll: (event: React.KeyboardEvent) => void;
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
  //
  _onControl?: (event: React.KeyboardEvent) => void;
  _onDelete?: (event: React.KeyboardEvent) => void;
  _onMeta?: (event: React.KeyboardEvent) => void;
  _onPageDown?: (event: React.KeyboardEvent) => void;
  _onPageUp?: (event: React.KeyboardEvent) => void;
  _onShift?: (event: React.KeyboardEvent) => void;
}

const useKeyboardEventHandlers = (handlersMapping: {
  // return (event:Key)
}) => {
  //
};

export const createKeyboardHandler =
  (manager: Partial<KeyboardManager>) => (event: React.KeyboardEvent) => {
    manager.beforeAll?.(event);

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

    manager.afterAll?.(event);
  };
