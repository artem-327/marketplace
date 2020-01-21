import React, { Component } from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'

import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
// import Settings from '~/components/settings'
import { triggerSystemSettingsModal } from '~/modules/settings/actions'
import { sidebarDetailTrigger } from '~/modules/inventory/actions'
import { getSafe } from '~/utils/functions'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))

const DropdownItem = ({ children, ...props }) => (
  <Dropdown item icon='chevron down' {...props}>
    {children}
  </Dropdown>
)

class Navigation extends Component {
  render() {
    const {
      isAdmin,
      auth,
      takeover,
      intl: { formatMessage },
      sidebarDetailTrigger,
      router: { pathname }
    } = this.props

    const { isCompanyAdmin, isUserAdmin, isProductCatalogAdmin, company } = getSafe(() => auth.identity, {
      isCompanyAdmin: null,
      isUserAdmin: null,
      isProductCatalogAdmin: null,
      company: null
    })

    return !isAdmin || takeover ? (
      <>
        <DropdownItem icon={<Icon className='hexagon' />} text={formatMessage({ id: 'navigation.inventory', defaultMessage: 'Inventory' })}>
          <Dropdown.Menu data-test='navigation_menu_inventory_drpdn'>
            <Dropdown.Item as={MenuLink} to='/inventory/my' data-test='navigation_menu_inventory_my_drpdn'>
              {formatMessage({ id: 'navigation.myInventory', defaultMessage: 'My Inventory' })}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                if (pathname !== '/inventory/my') {
                  Router.push('/inventory/my')
                }
                sidebarDetailTrigger({}, true)
              }}
              as={Menu.Item}
              data-test='navigation_menu_inventory_add_drpdn'>
              {formatMessage({ id: 'navigation.addInventory', defaultMessage: 'Add Inventory' })}
            </Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        {getSafe(() => company.nacdMember, false) ? (
          <DropdownItem icon={<Icon className='hexagon' />} text={formatMessage({ id: 'navigation.marketplace', defaultMessage: 'Marketplace' })}>
            <Dropdown.Menu data-test='navigation_menu_marketplace_drpdn'>
              <Dropdown.Item as={MenuLink} to='/marketplace/all' data-test='navigation_marketplace_all_drpdn'>
                {formatMessage({ id: 'navigation.marketplace', defaultMessage: 'Marketplace' })}
              </Dropdown.Item>
              <Dropdown.Item as={MenuLink} to='/cart' data-test='navigation_marketplace_cart_drpdn'>
                {formatMessage({ id: 'navigation.shoppingCart', defaultMessage: 'Shopping Cart' })}
              </Dropdown.Item>
            </Dropdown.Menu>
          </DropdownItem>
        ) : null}
        <DropdownItem icon={<Icon className='hexagon' />} text={formatMessage({ id: 'navigation.orders', defaultMessage: 'Orders' })}>
          <Dropdown.Menu data-test='navigation_menu_orders_drpdn'>
            <Dropdown.Item as={MenuLink} to='/orders?type=sales' data-test='navigation_menu_orders_sales_drpdn'>
              {/* <FormattedMessage id='navigation.salesOrders' defaultMessage='Sales Orders' /> */}
              {formatMessage({ id: 'navigation.salesOrders', defaultMessage: 'Sales Orders' })}
            </Dropdown.Item>
            <Dropdown.Item as={MenuLink} to='/orders?type=purchase' data-test='navigation_menu_orders_purchase_drpdn'>
              {formatMessage({ id: 'navigation.purchaseOrders', defaultMessage: 'Purchase Orders' })}
            </Dropdown.Item>
          </Dropdown.Menu>
        </DropdownItem>
        {(isCompanyAdmin || isUserAdmin || isProductCatalogAdmin) && (
          <MenuLink to='/settings' data-test='navigation_menu_settings_lnk'>
            <>
              <Icon className='hexagon' />
              {formatMessage({ id: 'navigation.settings', defaultMessage: 'Settings' })}
            </>
          </MenuLink>
        )}
      </>
    ) : (
      isAdmin && (
        <>
          <MenuLink icon={<Icon className='hexagon' />} to='/admin' data-test='navigation_menu_admin_lnk'>
            <>
              <Icon className='hexagon' />
              {formatMessage({ id: 'navigation.admin', defaultMessage: 'Admin' })}
            </>
          </MenuLink>
        </>
      )
    )
  }
}

export default withAuth(
  withRouter(
    connect(store => ({ auth: store.auth, isAdmin: getSafe(() => store.auth.identity.isAdmin, false) }), {
      triggerSystemSettingsModal,
      sidebarDetailTrigger
    })(injectIntl(Navigation))
  )
)

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))
