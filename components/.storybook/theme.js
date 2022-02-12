// .storybook/YourTheme.js

import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#0a3069',
  // colorSecondary: '#218bff',
  colorSecondary: '#57606a',

  // // UI
  appBg: '#eaeef2',
  appContentBg: '#f6f8fa',
  appBorderColor: '#d0d7de',
  appBorderRadius: 0,

  // // Typography
  // fontBase: 'string',
  // fontCode: 'string',

  // // Text colors
  textColor: '#1b1f24',
  textInverseColor: '#f6f8fa',
  textMutedColor: '#57606a',

  // // Toolbar default and active colors
  barTextColor: '#57606a',
  // barSelectedColor: 'red',
  barBg: '#eaeef2',

  // // Form colors
  // inputBg: 'string',
  // inputBorder: 'string',
  // inputTextColor: 'string',
  inputBorderRadius: 2,

    // Typography
    fontBase: '"Roboto", Arial, Helvetica, sans-serif',
    fontCode: 'monospace',

  // brandTitle: 'reframework',
  brandUrl: 'https://github.com/reframework',
  brandImage: 'https://github.com/reframework/reframework/blob/main/relogo-inline-1.png?raw=true',
});
