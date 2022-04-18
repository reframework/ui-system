import { KeyEnum, Space } from './keys';

type KeyboardManager = {
  beforeAll: (event: React.KeyboardEvent) => void;
  onPrintableCharacter: (event: React.KeyboardEvent) => void;
  onSpace: (event: React.KeyboardEvent) => void;
} & {
  [key in `on${keyof typeof KeyEnum}`]: (event: React.KeyboardEvent) => void;
};

const useKeyboardHandler =
  (manager: Partial<KeyboardManager>) => (event: React.KeyboardEvent) => {
    manager.beforeAll?.(event);

    if (event.key === Space) {
      manager.onSpace?.(event);
      // return;
    }

    if (KeyEnum[event.key]) {
      manager[`on${event.key}`]?.(event);
      return;
    }

    manager.onPrintableCharacter?.(event);
  };

export default useKeyboardHandler;
