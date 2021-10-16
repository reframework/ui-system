import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ListComponent from './List';

export default {
  title: 'Data Display/List',
  component: ListComponent,
  // argTypes: {
} as ComponentMeta<typeof ListComponent>;

const Template: ComponentStory<typeof ListComponent> = ({
  children,
  ...props
}) => <ListComponent {...props} children={children} />;

export const List = Template.bind({});

List.args = {
  children: <></>
};
