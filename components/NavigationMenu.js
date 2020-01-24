import React, { Component } from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'

import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
// import Settings from '~/components/settings'
import { tabChanged, triggerSystemSettingsModal } from '~/modules/settings/actions'
import { sidebarDetailTrigger } from '~/modules/inventory/actions'
import { getSafe } from '~/utils/functions'

const DropdownItem = ({ children, ...props }) => (
  <Dropdown item icon='chevron down' {...props}>
    {children}
  </Dropdown>
)

class Navigation extends Component {

  state = {
    settings: getSafe(() => Router.router.pathname === '/settings', false)
  }

  settingsLink = (e, to, tab) => {
    e.preventDefault()
    e.stopPropagation()

    const { router, router: { pathname }, tabChanged, tabsNames } = this.props

    if (pathname === '/settings' && tab) {
      const newTab = tabsNames.find(t => t.type === tab)
      tabChanged(newTab)
      router.push('/settings?type='+tab)
    } else {
      router.push(to)
    }
  }

  toggleOpened = (type) => {
    const { settings } = this.state
    this.setState({ settings: !settings })
  }

  render() {
    const {
      isAdmin,
      isEchoOperator,
      auth,
      takeover,
      intl: { formatMessage },
      sidebarDetailTrigger,
      router: { pathname, asPath }
    } = this.props

    const { settings } = this.state

    const MenuLink = withRouter(({ router: { asPath }, to, children, tab }) => (
      <Link prefetch href={to}>
        <Menu.Item as='a' active={asPath === to}
                   onClick={async (e) => await this.settingsLink(e, to, tab)}>
          {children}
        </Menu.Item>
      </Link>
    ))

    const { isCompanyAdmin, isUserAdmin, isProductCatalogAdmin, company } = getSafe(() => auth.identity, {
      isCompanyAdmin: null,
      isUserAdmin: null,
      isProductCatalogAdmin: null,
      company: null
    })

    return !isAdmin || takeover ? (
      <>
        <MenuLink to='/inventory/my' data-test='navigation_menu_inventory_my_drpdn'>
          <>
            <Icon name='layer group' />
            {formatMessage({ id: 'navigation.myInventory', defaultMessage: 'My Inventory' })}
          </>
        </MenuLink>
        {getSafe(() => company.nacdMember, false) ? (
          <MenuLink to='/marketplace/all' data-test='navigation_menu_marketplace_drpdn'>
            <>
              <Icon name='archive' />
              {formatMessage({ id: 'navigation.marketplace', defaultMessage: 'Marketplace' })}
            </>
          </MenuLink>
        ) : null}
        <MenuLink to='/orders?type=sales' data-test='navigation_menu_orders_sales_drpdn'>
          <>
            <Icon name='arrow circle right' />
            {formatMessage({ id: 'navigation.salesOrders', defaultMessage: 'Sales Orders' })}
          </>
        </MenuLink>
        <MenuLink to='/orders?type=purchase' data-test='navigation_menu_orders_purchase_drpdn'>
          <>
            <Icon name='arrow circle left' />
            {formatMessage({ id: 'navigation.purchaseOrders', defaultMessage: 'Purchase Orders' })}
          </>
        </MenuLink>
        {(isCompanyAdmin || isUserAdmin || isProductCatalogAdmin) && (
          <DropdownItem icon={<Icon className='cog' />}
                        text={formatMessage({ id: 'navigation.settings', defaultMessage: 'Settings' })}
                        className={settings ? 'opened' : null}
                        opened={settings}
                        onClick={() => this.toggleOpened('settings')}>
            <Dropdown.Menu data-test='navigation_menu_settings_drpdn'>
              {isCompanyAdmin ? (
                <>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=company-details'
                                 tab='company-details'
                                 data-test='navigation_settings_company_details_drpdn'>
                    {formatMessage({ id: 'navigation.companySettings', defaultMessage: 'Company Details' })}
                  </Dropdown.Item>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=system-settings'
                                 tab='system-settings'
                                 data-test='navigation_settings_system_settings_drpdn'>
                    {formatMessage({ id: 'navigation.companySettings', defaultMessage: 'Company Settings' })}
                  </Dropdown.Item>
                </>
              ) : null}
              {isCompanyAdmin || isUserAdmin  ? (
                <Dropdown.Item as={MenuLink}
                               to='/settings?type=users'
                               tab='users'
                               data-test='navigation_settings_users_drpdn'>
                  {formatMessage({ id: 'navigation.users', defaultMessage: 'Users' })}
                </Dropdown.Item>
              ) : null}
              {isCompanyAdmin ? (
                <>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=branches'
                                 tab='branches'
                                 data-test='navigation_settings_branches_drpdn'>
                    {formatMessage({ id: 'navigation.branches', defaultMessage: 'Branches' })}
                  </Dropdown.Item>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=warehouses'
                                 tab='warehouses'
                                 data-test='navigation_settings_warehouses_drpdn'>
                    {formatMessage({ id: 'navigation.warehouses', defaultMessage: 'Warehouses' })}
                  </Dropdown.Item>
                </>
              ) : null}
              {isCompanyAdmin || isProductCatalogAdmin  ? (
                <Dropdown.Item as={MenuLink}
                               to='/settings?type=products'
                               tab='products'
                               data-test='navigation_settings_products_drpdn'>
                  {formatMessage({ id: 'navigation.productCatalog', defaultMessage: 'Product Catalog' })}
                </Dropdown.Item>
              ) : null}
              {isCompanyAdmin ? (
                <>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=global-broadcast'
                                 tab='global-broadcast'
                                 data-test='navigation_settings_global_broadcast_drpdn'>
                    {formatMessage({ id: 'navigation.globalPriceBook', defaultMessage: 'Global Price Book' })}
                  </Dropdown.Item>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=bank-accounts'
                                 tab='bank-accounts'
                                 data-test='navigation_settings_bank_accounts_drpdn'>
                    {formatMessage({ id: 'navigation.bankAccounts', defaultMessage: 'Bank Accounts' })}
                  </Dropdown.Item>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=delivery-addresses'
                                 tab='delivery-addresses'
                                 data-test='navigation_settings_delivery_addresses_drpdn'>
                    {formatMessage({ id: 'navigation.deliveryAddresses', defaultMessage: 'Delivery Addresses' })}
                  </Dropdown.Item>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=logistics'
                                 tab='logistics'
                                 data-test='navigation_settings_logistics_drpdn'>
                    {formatMessage({ id: 'navigation.logistics', defaultMessage: 'Logistics' })}
                  </Dropdown.Item>
                  <Dropdown.Item as={MenuLink}
                                 to='/settings?type=documents'
                                 tab='documents'
                                 data-test='navigation_settings_documents_drpdn'>
                    {formatMessage({ id: 'navigation.documents', defaultMessage: 'Documents' })}
                  </Dropdown.Item>
                </>
              ) : null}
            </Dropdown.Menu>
          </DropdownItem>
        )}
      </>
    ) : (
      <>
        {isAdmin && (
          <MenuLink to='/admin' data-test='navigation_menu_admin_lnk'>
            {' '}
            {formatMessage({ id: 'navigation.admin', defaultMessage: 'Admin' })}{' '}
          </MenuLink>
        )}
        {(isAdmin || isEchoOperator) && (
          <MenuLink to='/operations' data-test='navigation_menu_operations_lnk'>
            {formatMessage({ id: 'navigation.operations', defaultMessage: 'Operations' })}
          </MenuLink>
        )}
      </>
    )
  }
}

export default withAuth(
  withRouter(
    connect(store => ({
      auth: store.auth,
      tabsNames: store.settings.tabsNames,
      isAdmin: getSafe(() => store.auth.identity.isAdmin, false)
    }), {
      triggerSystemSettingsModal,
      sidebarDetailTrigger,
      tabChanged
    })(injectIntl(Navigation))
  )
)

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))
