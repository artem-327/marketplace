import Link from 'next/link'
import { withRouter } from 'next/router'
import { Menu, Dropdown } from 'semantic-ui-react'
import cn from 'classnames'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as="a" active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const Navigation = withRouter(({ router: { pathname } }) => (
  <>
    <Dropdown item text="Inventory">
      <Dropdown.Menu>
        <Dropdown.Item as={MenuLink} to="/inventory/my">My Inventory</Dropdown.Item>
        <Dropdown.Item as={MenuLink} to="/inventory/add">Add Inventory</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown item text="Marketplace">
      <Dropdown.Menu>
        <Dropdown.Item as={MenuLink} to="/marketplace/all">Marketplace</Dropdown.Item>
        <Dropdown.Item as={MenuLink} to="/cart">Shopping Cart</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown item text="Orders">
      <Dropdown.Menu>
        <Dropdown.Item as={MenuLink} to="/orders/sales">Sales Orders</Dropdown.Item>
        <Dropdown.Item as={MenuLink} to="/orders/purchase">Purchase Orders</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <MenuLink to='/settings'>Settings</MenuLink>
    <MenuLink to='/admin'>Admin</MenuLink>
  </>
))

export default Navigation