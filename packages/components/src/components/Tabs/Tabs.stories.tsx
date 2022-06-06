import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@components/Text';
import { Box } from '@wip/Box';
import { Alert } from '@wip/Alert';
import { Paper } from '@components/Paper';
import { Radio } from '@components/Radio';
import { TabList, TabPanel, Tabs as TabsComponent, Tab } from '.';

export default {
  title: 'Components/Tabs',
  id: 'tabs-tabs',
  component: TabsComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      defaultValue: '2',
      options: ['1', '2', '3', '4'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof TabsComponent>;

export const Controlled = () => {
  const [value, setValue] = React.useState('1');

  const onClick = (value: string) => () => setValue(value);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setValue(target.value);

  const controls = (
    <Box mr="m">
      {['1', '2', '3', '4'].map((idx) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Box p="xxs">
            <Radio
              name="tabs"
              value={idx}
              onChange={onChange}
              id={idx}
              checked={idx === value}
            />
          </Box>
          <label htmlFor={idx}>{idx}</label>
        </div>
      ))}
    </Box>
  );

  return (
    <div style={{ display: 'flex' }}>
      {controls}
      <div>
        <TabsComponent value={value} onChange={setValue}>
          <TabList>
            <Tab value="1" label="First" onClick={onClick('1')} />
            <Tab value="2" label="Second" onClick={onClick('2')} />
            <Tab value="3" label="Third" onClick={onClick('3')} />
            <Tab disabled value="4" label="Fourth" onClick={onClick('4')} />
          </TabList>
          <Paper>
            <Box p="m" mt="s">
              <TabPanel value="1">First</TabPanel>
              <TabPanel value="2">Second</TabPanel>
              <TabPanel value="3">Third</TabPanel>
              <TabPanel value="4">Fourth</TabPanel>
            </Box>
          </Paper>
        </TabsComponent>
      </div>
    </div>
  );
};

export const Uncontrolled: ComponentStory<any> = () => {
  return (
    <TabsComponent defaultValue="1">
      <TabList>
        <Tab value="1" label="First" />
        <Tab value="2" label="Second" />
        <Tab value="3" label="Third" />
        <Tab disabled value="4" label="Fourth" />
      </TabList>
      <Paper>
        <Box p="m" mt="s">
          <TabPanel value="1">First</TabPanel>
          <TabPanel value="2">Second</TabPanel>
          <TabPanel value="3">Third</TabPanel>
          <TabPanel value="4">Fourth</TabPanel>
        </Box>
      </Paper>
    </TabsComponent>
  );
};

export const LongLabel: ComponentStory<any> = () => {
  return (
    <TabsComponent defaultValue="1">
      <TabList>
        <Tab
          value="1"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <Tab value="2" label="Two" />
        <Tab value="3" label="Three" />
        <Tab disabled value="4" label="Four" />
      </TabList>
      <Paper>
        <Box p="m" mt="s">
          <TabPanel value="1">First</TabPanel>
          <TabPanel value="2">Second</TabPanel>
          <TabPanel value="3">Third</TabPanel>
          <TabPanel value="4">Fourth</TabPanel>
        </Box>
      </Paper>
    </TabsComponent>
  );
};

export const StaticContent = () => {
  return (
    <TabsComponent defaultValue="1">
      <TabList>
        <Tab value="1" label="One" />
        <Tab value="2" label="Two" />
        <Tab value="3" label="Three" />
        <Tab disabled value="4" label="Four" />
      </TabList>

      <Paper>
        <Box p="m" mt="s">
          <Alert
            type="info"
            content="Here could be any static content which is outside the tab"
          />

          <Box mt="s">
            <TabPanel value="1">First</TabPanel>
            <TabPanel value="2">Second</TabPanel>
            <TabPanel value="3">Third</TabPanel>
            <TabPanel value="4">Fourth</TabPanel>
          </Box>
        </Box>
      </Paper>
    </TabsComponent>
  );
};
