import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Grid = (props: Props) => {
  return <div {...props} />;
};

export default Grid;
