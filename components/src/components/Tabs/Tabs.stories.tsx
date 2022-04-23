import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@components/Text';
import { Box } from '@wip/Box';
import { TabList, TabPanel, Tabs as TabsComponent, Tab } from '.';

export default {
  title: 'Tabs/Tabs',
  component: TabsComponent,
  argTypes: {
    value: {
      defaultValue: '2',
      options: ['1', '2', '3', '4'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof TabsComponent>;

const Template: ComponentStory<any> = ({ value: valueProp, defaultValue }) => {
  const [value, setValue] = React.useState(valueProp);

  const handleChange = (value: string) => {
    setValue(value);
  };
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <Box>
      <Text>Uncontrolled</Text>
      <Box pt="xs" pb="l">
        <TabsComponent defaultValue={defaultValue}>
          <TabList>
            <Tab value="1" label="New Arrivals in the Longest Text" />
            <Tab value="2" label="Two" />
            <Tab value="3" label="Three" />
            <Tab disabled value="4" label="Four" />
          </TabList>

          <TabPanel value="1">One</TabPanel>
          <TabPanel value="2">Two</TabPanel>
          <TabPanel value="3">Three</TabPanel>
          <TabPanel value="4">Four</TabPanel>
        </TabsComponent>
      </Box>
      <Text>Controlled</Text>

      <Box pt="xs" pb="l">
        <TabsComponent value={value} onChange={handleChange}>
          <TabList>
            <Tab value="1" label="New Arrivals in the Longest Text" />
            <Tab value="2" label="Two" />
            <Tab value="3" label="Three" />
            <Tab disabled value="4" label="Four" />
          </TabList>

          <Box mt="s">
            <Text size="s">
              Here could be any content which is outside the tab and doesn't
              change
            </Text>
            <Text component="p" size="s">
              Controlled tabs
            </Text>
          </Box>
          <Box mt="s">
            <TabPanel value="1">
              <Text size="s">The first tab</Text>
            </TabPanel>
            <TabPanel value="2">
              <Text size="s">Tab number two</Text>
            </TabPanel>
            <TabPanel value="3">
              <Text size="s">The third tab</Text>
            </TabPanel>
            <TabPanel value="4">
              <Text size="s">Disabled tab</Text>
            </TabPanel>
          </Box>
        </TabsComponent>
      </Box>
    </Box>
  );
};

export const Tabs = Template.bind({});

Tabs.args = {
  defaultValue: '1',
};
