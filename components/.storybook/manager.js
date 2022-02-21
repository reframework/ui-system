import { addons } from '@storybook/addons';
import theme from './theme';

addons.ready().then(() => {
  window.localStorage = { setItem: () => {}, getItem: () => '' };
  console.log(JSON.stringify(addons.getConfig(), null, 4));
});

addons.setConfig({
  theme,
  // isFullscreen: true,
  // showNav: true,
  // showPanel: false,
  // isToolshown: false,
  // panelPosition: 'bottom',
  // selectedPanel: undefined,
  // initialActive: 'sidebar',
  // sidebar: {
  //   showRoots: false,
  //   collapsedRoots: ['other'],
  // },
  toolbar: {
    tabs: { hidden: false },
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
