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
import { Hexagon, Layers, Settings, ShoppingBag, Grid, Sliders, FileText } from 'react-feather'
import Tabs from '~/modules/admin/components/Tabs'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { InventoryFilter, Filter, OrderFilter, WantedBoardFilter } from '~/modules/filter'
import TabsOperations from '~/modules/operations/components/Tabs'

const DropdownItem = ({ children, refFunc, refId, ...props }) => {
  return (
    <Dropdown
      item
      icon='chevron down'
      ref={dropdownItem => {
        if (refFunc && refId !== false) refFunc(dropdownItem, refId)
      }}
      {...props}>
      {children}
    </Dropdown>
  )
}

class Navigation extends Component {
  state = {
    dropdowns: {},
    settings: getSafe(() => Router.router.pathname === '/settings', false),
    orders:
      getSafe(() => Router.router.pathname === '/orders', false) ||
      getSafe(() => Router.router.pathname === '/orders/detail', false),
    admin: getSafe(() => Router.router.pathname === '/admin', false),
    operations: getSafe(() => Router.router.pathname === '/operations', false),
    openedFilterMyInventory: true,
    openedFilterMarketplace: true,
    openedFilterOrders: false,
    openedFilterWantedBoard: true
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkDropdowns.bind(this))
  }

  componentDidUpdate() {
    this.checkDropdowns()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkDropdowns)
  }

  settingsLink = (e, to, tab) => {
    e.preventDefault()
    e.stopPropagation()

    const {
      router,
      router: { pathname, asPath },
      tabChanged,
      tabsNames
    } = this.props
    if (pathname === to) {
      switch (asPath) {
        case '/inventory/my':
          this.setState(prevState => ({
            openedFilterMyInventory: !prevState.openedFilterMyInventory,
            settings: false,
            orders: false
          }))
          break
        case '/marketplace/all':
          this.setState(prevState => ({
            openedFilterMarketplace: !prevState.openedFilterMarketplace,
            settings: false,
            orders: false
          }))
          break
        case '/wanted-board/wanted-board':
          this.setState(prevState => ({ openedFilterWantedBoard: !prevState.openedFilterWantedBoard }))
          break
        case '/orders?type=sales':
          //temporary disabled - this.setState(prevState => ({ openedFilterOrders: !prevState.openedFilterOrders }))
          break
        case '/orders?type=purchase':
          //temporary disabled - this.setState(prevState => ({ openedFilterOrders: !prevState.openedFilterOrders }))
          break
      }
    } else {
      this.setState({
        openedFilterMyInventory: false,
        openedFilterMarketplace: false,
        openedFilterOrders: false,
        openedFilterWantedBoard: false
      })
    }

    if (pathname === '/settings' && tab) {
      const newTab = tabsNames.find(t => t.type === tab)
      tabChanged(newTab)
      router.push('/settings?type=' + tab)
    } else {
      router.push(to)
    }
  }

  createRef = (dropdownItem, refId) => {
    const { dropdowns } = this.state
    if (getSafe(() => !dropdowns[refId], false)) {
      this.setState({
        dropdowns: {
          ...dropdowns,
          [refId]: dropdownItem
        }
      })
    }
  }

  getWindowDimensions = () => {
    const hasWindow = typeof window !== 'undefined'

    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null

    return {
      width,
      height
    }
  }

  toggleOpened = type => {
    const { dropdowns } = this.state
    const typeState = this.state[type]
    if (type === 'admin') {
      Router.push('/admin')
    }
    if (type === 'operations') {
      Router.push('/operations')
    }
    // toggle dropdown state
    this.setState({
      openedFilterMyInventory: false,
      openedFilterMarketplace: false,
      openedFilterOrders: false,
      orders: false,
      settings: false,
      admin: false,
      operations: false,
      [type]: !typeState
    })

    // resize dropdown
    this.resizeDropdown(type, typeState)
  }

  checkDropdowns = () => {
    const { dropdowns } = this.state
    const ddStatuses = Object.keys(dropdowns)

    for (var i = 0; i < ddStatuses.length; i++) {
      if (this.state[ddStatuses[i]]) {
        this.resizeDropdown(ddStatuses[i], false)
      }
    }
  }

  resizeDropdown = (type, typeState) => {
    const { dropdowns } = this.state
    const current = dropdowns[type].ref.current

    // Manipulate opened dropdown design - It affects only collapsed menu styles
    if (current) {
      // Sometimes null
      if (!typeState) {
        const wievport = this.getWindowDimensions()

        // Calculate free space around dropdown
        const topSpace = current.offsetTop - 80 // space for TopBar
        const bottomSpace = getSafe(() => wievport.height - (current.offsetTop + current.clientHeight + 1), 0)

        // Changing dropdown behavior as we know more about available space (top/bottom)
        if (topSpace > bottomSpace) {
          if (!current.classList.contains('upward')) {
            current.classList.add('upward')
          }
          current.lastChild.style.maxHeight = `${topSpace}px`
        } else {
          if (current.classList.contains('upward')) {
            current.classList.remove('upward')
          }
          current.lastChild.style.maxHeight = `${bottomSpace}px`
        }
      } else {
        // Reset styles
        current.lastChild.style.maxHeight = ''
      }
    }
  }

  render() {
    const {
      isAdmin,
      isEchoOperator,
      auth,
      takeover,
      intl: { formatMessage },
      sidebarDetailTrigger,
      router: { pathname, asPath },
      collapsedMenu,
      activeFilter
    } = this.props

    const {
      dropdowns,
      settings,
      orders,
      admin,
      operations,
      openedFilterMyInventory,
      openedFilterMarketplace,
      openedFilterOrders,
      openedFilterWantedBoard
    } = this.state

    const MenuLink = withRouter(({ router: { asPath }, to, children, tab, className, dataTest }) => {
      return (
        <Link prefetch href={to}>
          <Menu.Item
            as='a'
            data-test={dataTest}
            active={asPath === to}
            onClick={async e => await this.settingsLink(e, to, tab)}
            className={className}>
            {children}
          </Menu.Item>
        </Link>
      )
    })

    const { isCompanyAdmin, isUserAdmin, isProductCatalogAdmin, company, clientCompany } = getSafe(
      () => auth.identity,
      {
        isCompanyAdmin: null,
        isUserAdmin: null,
        isProductCatalogAdmin: null,
        company: null,
        clientCompany: false
      }
    )
    return !isAdmin || takeover ? (
      <div className='flex-wrapper'>
        {!clientCompany && (
          <>
            <MenuLink
              to='/inventory/my'
              dataTest='navigation_menu_inventory_my_drpdn'
              className={!collapsedMenu && openedFilterMyInventory && asPath === '/inventory/my' ? 'opened' : ''}>
              <>
                <Layers size={22} />
                {formatMessage({ id: 'navigation.myInventory', defaultMessage: 'My Inventory' })}
              </>
            </MenuLink>
            {!collapsedMenu && openedFilterMyInventory && asPath === '/inventory/my' ? <InventoryFilter /> : null}
          </>
        )}
        {getSafe(() => company.nacdMember, false) ? (
          <>
            <MenuLink
              to='/marketplace/all'
              dataTest='navigation_menu_marketplace_drpdn'
              className={!collapsedMenu && openedFilterMarketplace && asPath === '/marketplace/all' ? 'opened' : ''}>
              <>
                <ShoppingBag size={22} />
                {formatMessage({ id: 'navigation.marketplace', defaultMessage: 'Marketplace' })}
                {asPath === '/marketplace/all' && activeFilter ? (
                  <div className='active-filter'>
                    <Sliders />
                  </div>
                ) : null}
              </>
            </MenuLink>
            {!collapsedMenu && openedFilterMarketplace && asPath === '/marketplace/all' ? <Filter /> : null}
          </>
        ) : null}
        <MenuLink
          to={clientCompany ? '/wanted-board/my-requested-items' : '/wanted-board/wanted-board'}
          dataTest='navigation_menu_wanted_board_drpdn'>
          <>
            <Grid size={22} />
            {formatMessage({ id: 'navigation.wantedBoard', defaultMessage: 'Wanted Board' })}
            {false && asPath === '/wanted-board/wanted-board' && activeFilter ? (
              <div className='active-filter'>
                <Sliders />
              </div>
            ) : null}
          </>
        </MenuLink>
        {false && !collapsedMenu && openedFilterWantedBoard && asPath === '/wanted-board/wanted-board' ? (
          <WantedBoardFilter />
        ) : null}
        <DropdownItem
          icon={<FileText size={22} />}
          text={formatMessage({ id: 'navigation.orders', defaultMessage: 'Orders' })}
          className={orders ? 'opened' : null}
          opened={orders}
          onClick={() => this.toggleOpened('orders')}
          refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
          refId={'orders'}
          data-test='navigation_orders_drpdn'>
          <Dropdown.Menu data-test='navigation_menu_orders_drpdn_menu'>
            <PerfectScrollbar>
              {!clientCompany && (
                <Dropdown.Item as={MenuLink} to='/orders?type=sales' dataTest='navigation_orders_sales_orders_drpdn'>
                  {formatMessage({ id: 'navigation.salesOrders', defaultMessage: 'Sales Orders' })}
                </Dropdown.Item>
              )}
              <Dropdown.Item
                as={MenuLink}
                to='/orders?type=purchase'
                dataTest='navigation_orders_purchase_orders_drpdn'>
                {formatMessage({ id: 'navigation.purchaseOrders', defaultMessage: 'Purchase Orders' })}
              </Dropdown.Item>
            </PerfectScrollbar>
          </Dropdown.Menu>
        </DropdownItem>
        {(isCompanyAdmin || isUserAdmin || isProductCatalogAdmin) && (
          <DropdownItem
            icon={<Settings size={22} />}
            text={formatMessage({ id: 'navigation.settings', defaultMessage: 'Settings' })}
            className={settings ? 'opened' : null}
            opened={settings}
            onClick={() => this.toggleOpened('settings')}
            refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
            refId={'settings'}
            data-test='navigation_menu_settings_drpdn'>
            <Dropdown.Menu data-test='navigation_menu_settings_drpdn_menu'>
              <PerfectScrollbar>
                {isCompanyAdmin ? (
                  <>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=company-details'
                      tab='company-details'
                      dataTest='navigation_settings_company_details_drpdn'>
                      {formatMessage({ id: 'navigation.companySettings', defaultMessage: 'Company Details' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=system-settings'
                      tab='system-settings'
                      dataTest='navigation_settings_system_settings_drpdn'>
                      {formatMessage({ id: 'navigation.companySettings', defaultMessage: 'Company Settings' })}
                    </Dropdown.Item>
                  </>
                ) : null}
                {isCompanyAdmin || isUserAdmin ? (
                  <Dropdown.Item
                    as={MenuLink}
                    to='/settings?type=users'
                    tab='users'
                    dataTest='navigation_settings_users_drpdn'>
                    {formatMessage({ id: 'navigation.users', defaultMessage: 'Users' })}
                  </Dropdown.Item>
                ) : null}
                {isCompanyAdmin ? (
                  <>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=branches'
                      tab='branches'
                      dataTest='navigation_settings_branches_drpdn'>
                      {formatMessage({ id: 'navigation.branches', defaultMessage: 'Branches' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=warehouses'
                      tab='warehouses'
                      dataTest='navigation_settings_warehouses_drpdn'>
                      {formatMessage({ id: 'navigation.warehouses', defaultMessage: 'Warehouses' })}
                    </Dropdown.Item>
                  </>
                ) : null}
                {(isCompanyAdmin || isProductCatalogAdmin) && !clientCompany ? (
                  <Dropdown.Item
                    as={MenuLink}
                    to='/settings?type=products'
                    tab='products'
                    dataTest='navigation_settings_products_drpdn'>
                    {formatMessage({ id: 'navigation.productCatalog', defaultMessage: 'Product Catalog' })}
                  </Dropdown.Item>
                ) : null}
                {isCompanyAdmin && !clientCompany ? (
                  <>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=global-broadcast'
                      tab='global-broadcast'
                      dataTest='navigation_settings_global_broadcast_drpdn'>
                      {formatMessage({ id: 'navigation.globalPriceBook', defaultMessage: 'Global Price Book' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=bank-accounts'
                      tab='bank-accounts'
                      dataTest='navigation_settings_bank_accounts_drpdn'>
                      {formatMessage({ id: 'navigation.bankAccounts', defaultMessage: 'Bank Accounts' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=delivery-addresses'
                      tab='delivery-addresses'
                      dataTest='navigation_settings_delivery_addresses_drpdn'>
                      {formatMessage({ id: 'navigation.deliveryAddresses', defaultMessage: 'Delivery Addresses' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=logistics'
                      tab='logistics'
                      dataTest='navigation_settings_logistics_drpdn'>
                      {formatMessage({ id: 'navigation.logistics', defaultMessage: 'Logistics' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings?type=documents'
                      tab='documents'
                      dataTest='navigation_settings_documents_drpdn'>
                      {formatMessage({ id: 'navigation.documents', defaultMessage: 'Documents' })}
                    </Dropdown.Item>
                  </>
                ) : null}
              </PerfectScrollbar>
            </Dropdown.Menu>
          </DropdownItem>
        )}
      </div>
    ) : (
      <div className='flex-wrapper'>
        {isAdmin && (
          <>
            <DropdownItem
              icon={<Hexagon size={22} />}
              text={formatMessage({ id: 'navigation.admin', defaultMessage: 'Admin' })}
              className={admin ? 'opened' : null}
              opened={admin}
              onClick={() => this.toggleOpened('admin')}
              refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
              refId={'admin'}>
              <Tabs />
            </DropdownItem>
          </>
        )}
        {(isAdmin || isEchoOperator) && (
          <>
            <DropdownItem
              icon={<Hexagon size={22} />}
              text={formatMessage({ id: 'navigation.operations', defaultMessage: 'Operations' })}
              className={operations ? 'opened' : null}
              opened={operations}
              onClick={() => this.toggleOpened('operations')}
              refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
              refId={'operations'}>
              <TabsOperations />
            </DropdownItem>
          </>
        )}
      </div>
    )
  }
}
export default withAuth(
  withRouter(
    connect(
      store => ({
        auth: store.auth,
        tabsNames: store.settings.tabsNames,
        isAdmin: getSafe(() => store.auth.identity.isAdmin, false),
        collapsedMenu: store.layout.collapsedMenu,
        activeFilter: getSafe(() => store.filter.filter.appliedFilter.filters.length > 0, false)
      }),
      {
        triggerSystemSettingsModal,
        sidebarDetailTrigger,
        tabChanged
      }
    )(injectIntl(Navigation))
  )
)

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))
