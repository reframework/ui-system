import React, { useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PopoverComponent from "./Popover";
import Box from "../../Containers/Box/Box";
import Button from "../../Button/Button";

export default {
  title: "Popover/Popover",
  component: PopoverComponent,
} as ComponentMeta<typeof PopoverComponent>;

const Page = ({ children, ...props }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const onClickAway = () => {
    setOpen(false);
  };
  return (
    <Box>
      <button ref={ref} onClick={() => setOpen(true)}>
        Click me!
      </button>
      <PopoverComponent
        {...props}
        placement="start-end"
        onClickAway={onClickAway}
        // anchorEl={ref.current}
        open={open}
      >
        <div
          style={{ width: "200px", height: "100px", backgroundColor: "gray" }}
        >
          {children}
        </div>
      </PopoverComponent>
    </Box>
  );
};
const Template: ComponentStory<typeof PopoverComponent> = (props) => (
  <Page {...props} />
);

export const Popover = Template.bind({});

Popover.args = {
  children: "Popover",
};
