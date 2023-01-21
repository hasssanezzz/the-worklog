import React, { useEffect } from 'react'
import Conatiner from './Container'

interface Props {
  children: React.ReactNode
  active: boolean
  setActive: Function
}

function Header({ title }: { title: string }) {
  return (
    <div className="px-5 py-3 border-b">
      <h3 className="font-semibold text-xl text-center">{title}</h3>
    </div>
  )
}

function Footer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`px-5 py-3 border-t ${className || ' '}`}>{children}</div>
  )
}

function Modal({ children, active, setActive }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent> | any) {
    e.target.classList.contains('fixed') && setActive(false)
  }

  useEffect(() => {
    if (active) document.querySelector('body')?.classList.add('scroll-hidden')
    else document.querySelector('body')?.classList.remove('scroll-hidden')
  }, [active])

  return (
    <div
      onClick={handleClick}
      className={`fixed top-0 left-0 w-full h-screen bg-black/40 text-black flex items-start justify-center pb-5 transition-all duration-500 ${
        active ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } overflow-hidden`}
      style={{ margin: 0 }}
    >
      <Conatiner>
        <div
          className={`bg-white rounded-xl rounded-t-none overflow-auto max-h-[85vh] transition-all duration-500 ${
            active ? 'mt-0' : '-mt-[100vh]'
          }`}
        >
          {children}
        </div>
      </Conatiner>
    </div>
  )
}

Modal.Header = Header
Modal.Footer = Footer

export default Modal
