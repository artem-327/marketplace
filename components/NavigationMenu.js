import React, { Component } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Menu, Dropdown } from 'semantic-ui-react'
import { withAuth } from '~/hocs'

import { getSafe } from '~/utils/functions'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as="a" active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const DropdownItem = ({ children, ...props }) => (
  <Dropdown item icon="chevron down" {...props}>
    {children}
  </Dropdown>
)

class Navigation extends Component {
  render() {
    const { isAdmin, auth, takeover } = this.props
    
    return (
      !isAdmin || takeover ? <>
        <DropdownItem text="Inventory">
          <Dropdown.Menu data-test="navigation_menu_inventory">
            <Dropdown.Item as={MenuLink} to="/inventory/my">My Inventory</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/inventory/add">Add Inventory</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <DropdownItem text="Marketplace">
          <Dropdown.Menu data-test="navigation_menu_marketplace">
            <Dropdown.Item as={MenuLink} to="/marketplace/all">Marketplace</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/cart">Shopping Cart</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <DropdownItem text="Orders">
          <Dropdown.Menu data-test="navigation_menu_orders">
            <Dropdown.Item as={MenuLink} to="/orders?type=sales">Sales Orders</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/orders?type=purchase">Purchase Orders</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <MenuLink to='/settings' data-test="navigation_menu_settings">Settings</MenuLink>
        {isAdmin && <MenuLink to="/admin">Admin</MenuLink>}
      </> : isAdmin && <MenuLink to="/admin">Admin</MenuLink>
    )
  }
}

export default withAuth(Navigation)