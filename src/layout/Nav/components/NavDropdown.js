import React, { Component } from 'react'
import inventory from '../../../images/nav/inventory.png'
import '../nav.scss'
import { Link } from 'react-router-dom'

class NavDropdown extends Component {
  constructor() {
    super()

    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  showMenu(event) {
    event.preventDefault()
    this.setState({ showMenu: true })
  }

  closeMenu() {
    this.setState({ showMenu: false })
  }

  render() {
    return (
      <div className='nav-dropdown-wr' onMouseOver={this.showMenu} onMouseLeave={this.closeMenu}>
        <div className='header-menu-item dropdown'>
          {' '}
          <img src={inventory} alt='Logo' />
        </div>
        <span>Inventory</span>
        {this.state.showMenu ? (
          <div
            className='dropdown-content'
            ref={element => {
              this.dropdownMenu = element
            }}>
            <Link to='#'>Inventory</Link>
            <Link to='#'>My inventory</Link>
            <Link to='#'>Add inventory</Link>
          </div>
        ) : null}
      </div>
    )
  }
}

export default NavDropdown
