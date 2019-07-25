import React, { Component } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Menu, Dropdown } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { FormattedMessage } from 'react-intl'

import { getSafe } from '~/utils/functions'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const DropdownItem = ({ children, ...props }) => (
  <Dropdown item icon='chevron down' {...props}>
    {children}
  </Dropdown>
)

class Navigation extends Component {
  render() {
    const { isAdmin, auth, takeover } = this.props

    return (
      !isAdmin || takeover ? <>
        <DropdownItem text={<FormattedMessage id='navigation.inventory' defaultMessage='Inventory' />}>
          <Dropdown.Menu data-test='navigation_menu_inventory'>
            <Dropdown.Item as={MenuLink} to='/inventory/my'><FormattedMessage id='navigation.myInventory' defaultMessage='My Inventory' /></Dropdown.Item>
            <Dropdown.Item as={MenuLink} to='/inventory/add'><FormattedMessage id='navigation.addInventory' defaultMessage='Addd Inventory' /></Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <DropdownItem text={<FormattedMessage id='navigation.marketplace' defaultMessage='Marketplace' />}>
          <Dropdown.Menu data-test='navigation_menu_marketplace'>
            <Dropdown.Item as={MenuLink} to='/marketplace/all'><FormattedMessage id='navigation.marketplace' defaultMessage='Marketplace' /></Dropdown.Item>
            <Dropdown.Item as={MenuLink} to='/cart'><FormattedMessage id='navigation.shoppingCart' defaultMessage='Shopping Cart' /></Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <DropdownItem text={<FormattedMessage id='navigation.orders' defaultMessage='Orders' />}>
          <Dropdown.Menu data-test='navigation_menu_orders'>
            <Dropdown.Item as={MenuLink} to='/orders?type=sales'><FormattedMessage id='navigation.salesOrders' defaultMessage='Sales Orders' /></Dropdown.Item>
            <Dropdown.Item as={MenuLink} to='/orders?type=purchase'><FormattedMessage id='navigation.purchaseOrders' defaultMessage='Purchase Orders' /></Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        <MenuLink to='/settings' data-test='navigation_menu_settings'><FormattedMessage id='navigation.settings' /></MenuLink>
        {isAdmin && <MenuLink to='/admin'><FormattedMessage id='navigation.admin' /></MenuLink>}
      </> : isAdmin && <MenuLink to='/admin'><FormattedMessage id='navigation.admin' /></MenuLink>
    )
  }
}

export default withAuth(Navigation)