import React from 'react'

type Props = React.HTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  return <button {...props}  />
}

export default Button
