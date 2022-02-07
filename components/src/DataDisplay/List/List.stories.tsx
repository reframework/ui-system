import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ListComponent from './List';
import ListItem from './ListItem';

export default {
  title: 'Data Display/List',
  component: ListComponent,
  // argTypes: {
} as ComponentMeta<typeof ListComponent>;

const Template: ComponentStory<typeof ListComponent> = ({
  children,
  ...props
}) => (
  <ListComponent {...props}>
    <ListItem key="1">Monday</ListItem>
    <ListItem key="2" selected>
      Tuesday
    </ListItem>
    <ListItem key="3">Wednesday</ListItem>
    <ListItem key="4" disabled>
      Thursday
    </ListItem>
    <ListItem key="5" disabled>
      Friday
    </ListItem>
  </ListComponent>
);

export const List = Template.bind({});

List.args = {};
