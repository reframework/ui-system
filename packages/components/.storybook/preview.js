// import { DocsPage } from '@storybook/addon-docs';

export const parameters = {
  options: {
    storySort: {
      order: ['welcome', 'System', 'Components', 'wip', '*'],
    },
  },
  // viewMode: 'docs',
  previewTabs: {
    // 'storybook/docs/panel': {
    //   index: -1,
    // },
    // canvas: { title: 'Sandbox' },
  },
  // page: DocsPage,
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
    sort: 'requiredFirst',
  },
};

export const decorators = [
  (Story) => (
    <div>
      <Story />
    </div>
  ),
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
  },
  docs: {
    // Opt-out of inline rendering
  },
};
