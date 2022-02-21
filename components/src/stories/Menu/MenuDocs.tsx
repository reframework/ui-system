import { ComponentStory } from '@storybook/react';
import { Menu } from '../../components/Menu';
import React from 'react';
import styles from './styles.css?module';

import {
  ArgsTable,
  Source,
  Canvas,
  Story,
  Title,
  Subtitle,
  Description,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

const StoryWrapper = ({ id }) => {
  return (
    <div style={{ position: 'relative', zIndex: 999 }}>
      <div className={styles.hide} style={{ position: 'relative', zIndex: 0 }}>
        <Canvas>
          <Story id={id} />
        </Canvas>
      </div>
      <div style={{ position: 'absolute', top: 30, left: 24 }}>
        <Story id={id} />
      </div>
    </div>
  );
};

export const Docs: ComponentStory<typeof Menu> = (props) => {
  return (
    <div
      style={{
        height: 200,
        paddingBottom: 1000,
        boxSizing: 'border-box',
      }}
    >
      {/* <Canvas> */}
      {/* <Story name="Intro">ololo</Story> */}
      {/* </Canvas> */}
      <Title />
      <p>
        An accessible dropdown menu for the common dropdown menu button design
        pattern. Menu uses roving tabIndex for focus management.
      </p>

      <h2>Import</h2>

      <Source
        dark
        language="js"
        code={`import { Menu } from '@reframework/menu';`}
      />

      <h2>Usage</h2>
      <div style={{ position: 'relative', zIndex: 999 }}>
        <Story id="menu-menu--intro" />
      </div>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <Source dark />
      </div>

      <h2>Accessing the internal state</h2>
      <p>
        To access the internal state of the Menu, use a function as children
        (commonly known as a render prop). You'll get access to the internal
        state isOpen.
      </p>
      <StoryWrapper id="menu-menu--render-trigger" />

      <br />

      <h2>Watch resizing</h2>
      <p>Watch resizing</p>
      <StoryWrapper id="menu-menu--watch-resizing" />

      <br />

      <h2>Scrollable</h2>
      <p>Scrollable</p>
      <StoryWrapper id="menu-menu--scrollable" />

      <br />

      <h2>Props</h2>
      <div style={{ position: 'relative', zIndex: 0 }}>
        <ArgsTable of="." />
      </div>
    </div>
  );
};
