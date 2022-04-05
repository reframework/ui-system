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

const useKeyboardEventHandlers = (handlersMapping: {
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onArrowUp?: () => void;
  onBackspace?: () => void;
  onControl?: () => void;
  onDelete?: () => void;
  onDown?: () => void;
  onEnd?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onHome?: () => void;
  onLeft?: () => void;
  onMeta?: () => void;
  onPageDown?: () => void;
  onPageUp?: () => void;
  onShift?: () => void;
  onSpace?: () => void;
  onTab?: () => void;

  // return (event:Key)
}) => {
  //
};
