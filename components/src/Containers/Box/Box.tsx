import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>;

const Box = (props: Props) => {
  return <div {...props}  />
}

export default Box
