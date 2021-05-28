import React, { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ReactComponent as Arrow } from './icons/caret-down.svg'
import { ReactComponent as Bell } from './icons/bell.svg'
import { ReactComponent as Plus } from './icons/plus.svg'
import { ReactComponent as Messenger } from './icons/messenger.svg'
import { ReactComponent as Chevron } from './icons/chevron.svg'
import { ReactComponent as Cog } from './icons/cog.svg'
import { ReactComponent as ArrowBack } from './icons/arrow-back.svg'

import './index.css'

function App() {
  return (
    <Navbar>
      <NavItem icon={<Plus />} />
      <NavItem icon={<Bell />} />
      <NavItem icon={<Messenger />} />
      <NavItem icon={<Arrow />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  )
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main') // settings, animals
  const [menuHeight, setMenuHeight] = useState(null)

  const nodeRef = useRef(null)
  const nodeRef2 = useRef(null)

  function calcHeight({ current }) {
    if (current) {
      const height = current.offsetHeight
      const width = current.clientWidth

      setMenuHeight(height)
    }
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item"
         onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        <div className="menu-label">{props.children}</div>
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === 'main'}
        nodeRef={nodeRef}
        unmountOnExit timeout={500}
        classNames="menu-primary"
        onEnter={() => calcHeight(nodeRef)}
      >
        <div className="menu" ref={nodeRef}>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<Cog />}
            rightIcon={<Chevron />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit timeout={500}
        classNames="menu-secondary"
        nodeRef={nodeRef2}
        onEnter={() => calcHeight(nodeRef2)}
      >
        <div className="menu" ref={nodeRef2}>
          <DropdownItem leftIcon={<ArrowBack />} goToMenu={'main'} />
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>

    </div>
  )
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> {props.children}</ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)
  const openMenu = () => setOpen(!open)

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={openMenu}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

export default App
