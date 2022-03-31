import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TabList, TabPanel, Tabs as TabsComponent, Tab } from '.';

export default {
  title: 'Navigation/Tabs',
  component: TabsComponent,
} as ComponentMeta<typeof TabsComponent>;

const Template: ComponentStory<any> = ({ ...props }) => (
  <TabsComponent {...props}>
    <TabList>
      <Tab
        value="1"
        label="New Arrivals in the Longest Text"
      />
      <Tab value="2" label="Two" />
      <Tab value="3" label="Three" />
    </TabList>

    <TabPanel value="1">One</TabPanel>
    <TabPanel value="2">Two</TabPanel>
    <TabPanel value="3">Three</TabPanel>
  </TabsComponent>
);

export const Tabs = Template.bind({});

Tabs.args = {
  // value: '2',
  defaultValue: '1',
};
