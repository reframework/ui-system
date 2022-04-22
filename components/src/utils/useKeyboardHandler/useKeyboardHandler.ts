import { isFunction } from '@utils/index';
import { KeyEnum, Space } from './keys';

type KeyboardManager = {
  beforeAll: (event: React.KeyboardEvent) => void;
  before: (event: React.KeyboardEvent) => void;
  onPrintableCharacter: (event: React.KeyboardEvent) => void;
  onSpace: (event: React.KeyboardEvent) => void;
  after: (event: React.KeyboardEvent) => {};
} & {
  [key in `on${keyof typeof KeyEnum}`]: (event: React.KeyboardEvent) => void;
};

const useKeyboardHandler =
  (manager: Partial<KeyboardManager>) => (event: React.KeyboardEvent) => {
    manager.before?.(event);

    const handleEvent = manager[`on${event.key}`];

    if (isFunction(handleEvent)) {
      handleEvent(event);
      // Space might be handled as printable character as well
      if (event.key !== Space) {
        return;
      }
    }

    manager.onPrintableCharacter?.(event);
    manager.after?.(event);
  };

export default useKeyboardHandler;
