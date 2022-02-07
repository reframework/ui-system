import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Feedback/Modal',
  component: () => <div></div>,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = ({ ...props }) => (
  <div {...props}>Modal is coming soon</div>
);

export const Modal = Template.bind({});

Modal.args = {
  id: 'example',
};
