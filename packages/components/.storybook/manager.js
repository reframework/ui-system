import { addons } from '@storybook/addons';
import theme from './theme';
import React from 'react';

addons.ready().then(() => {
  window.localStorage = { setItem: () => {}, getItem: () => '' };
  // console.log(JSON.stringify(addons.getConfig(), null, 4));
});

addons.setConfig({
  theme,
  // isFullscreen: true,
  // showNav: true,
  // showPanel: false,
  // isToolshown: false,
  // panelPosition: 'bottom',
  // selectedPanel: undefined,
  initialActive: 'canvas',
  isToolshown: false,
  enableShortcuts: true,
  sidebar: {
    // showRoots: false,
    collapsedRoots: ['wip'],
    renderLabel: (item) => {
      if (item.isRoot && item.id === 'reframework') {
        // console.log(item, 'ITEM');
      }

      return <span class="ref:sidebar-item-label">{item.name}</span>;
    },
  },
  toolbar: {
    tabs: { hidden: true },
    title: { hidden: false },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
});
