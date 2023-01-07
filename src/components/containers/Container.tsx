import React from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Conatiner({ children, className }: Props) {
  return (
    <div className={className + ` max-w-md px-5 w-full ml-auto mr-auto`}>
      {children}
    </div>
  )
}
