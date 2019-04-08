import Link from 'next/link'
import { withRouter } from 'next/router'
import { Menu, Dropdown } from 'semantic-ui-react'
import cn from 'classnames'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as="a" icon="chevron down" active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const DropdownItem = ({children, ...props}) => (
  <Dropdown item icon="chevron down" {...props}>
    {children}
  </Dropdown>
)

const Navigation = withRouter(({ router: { pathname } }) => (
  <>
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
        <Dropdown.Item as={MenuLink} to="/orders/sales">Sales Orders</Dropdown.Item>
        <Dropdown.Item as={MenuLink} to="/orders/purchase">Purchase Orders</Dropdown.Item>
      </Dropdown.Menu>
    </DropdownItem>
    <MenuLink to='/settings'>Settings</MenuLink>
    <MenuLink to='/admin'>Admin</MenuLink>
  </>
))

export default Navigation