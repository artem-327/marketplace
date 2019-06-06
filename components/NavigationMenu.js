import React, {Component} from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Menu, Dropdown } from 'semantic-ui-react'
import {withAuth} from '~/hocs'


const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as="a" active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const DropdownItem = ({children, ...props}) => (
  <Dropdown item icon="chevron down" {...props}>
    {children}
  </Dropdown>
)

class Navigation extends Component {
  render() {
    const { isAdmin } = this.props
    
    return (
      !isAdmin ? <>
        <DropdownItem text="Inventory">
          <Dropdown.Menu>
            <Dropdown.Item as={MenuLink} to="/inventory/my">My Inventory</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/inventory/add">Add Inventory</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <DropdownItem text="Marketplace">
          <Dropdown.Menu>
            <Dropdown.Item as={MenuLink} to="/marketplace/all">Marketplace</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/cart">Shopping Cart</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <DropdownItem text="Orders">
          <Dropdown.Menu>
            <Dropdown.Item as={MenuLink} to="/orders?type=sales">Sales Orders</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/orders?type=purchase">Purchase Orders</Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <MenuLink to='/settings'>Settings</MenuLink>
      </>
      : <>
        <MenuLink to="/admin">Admin</MenuLink>
      </>
    )
  }
}

export default withAuth(Navigation)