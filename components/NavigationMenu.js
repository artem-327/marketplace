import React, { Component } from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'

import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { withAuth } from '~/hocs'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { tabChanged, triggerSystemSettingsModal } from '~/modules/settings/actions'
import { getSafe } from '~/utils/functions'
import {
  Layers,
  Settings,
  ShoppingBag,
  Grid,
  Sliders,
  FileText,
  Bell,
  Briefcase,
  Home,
  Package,
  Archive,
  Disc,
  Coffee,
  ChevronDown,
  ChevronUp
} from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { defaultTabs as operationsDefaultTabs, orderOperatorTabs } from '~/modules/operations/constants'
import { defaultTabs as adminDefaultTabs } from '~/modules/admin/config'

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
    currentType: '',
    settings:
      getSafe(() => Router.router.pathname === '/settings/company-details', false) ||
      getSafe(() => Router.router.pathname === '/settings/system-settings', false) ||
      getSafe(() => Router.router.pathname === '/settings/users', false) ||
      getSafe(() => Router.router.pathname === '/settings/locations', false) ||
      getSafe(() => Router.router.pathname === '/settings/bank-accounts', false) ||
      getSafe(() => Router.router.pathname === '/settings/logistics', false) ||
      getSafe(() => Router.router.pathname === '/settings/documents', false),
    orders:
      getSafe(() => Router.router.pathname === '/orders/sales', false) ||
      getSafe(() => Router.router.pathname === '/orders/purchase', false) ||
      getSafe(() => Router.router.pathname === '/orders/detail', false),
    admin:
      getSafe(() => Router.router.pathname === '/admin/units-of-measure', false) ||
      getSafe(() => Router.router.pathname === '/admin/packaging-types', false) ||
      getSafe(() => Router.router.pathname === '/admin/manufacturers', false) ||
      getSafe(() => Router.router.pathname === '/admin/grades', false) ||
      getSafe(() => Router.router.pathname === '/admin/forms', false) ||
      getSafe(() => Router.router.pathname === '/admin/conditions', false) ||
      getSafe(() => Router.router.pathname === '/admin/nmfc-numbers', false) ||
      getSafe(() => Router.router.pathname === '/admin/associations', false) ||
      getSafe(() => Router.router.pathname === '/admin/logistics', false) ||
      getSafe(() => Router.router.pathname === '/admin/admin-settings', false),
    operations:
      getSafe(() => Router.router.pathname === '/operations/shipping-quotes', false) ||
      getSafe(() => Router.router.pathname === '/operations/tags', false) ||
      getSafe(() => Router.router.pathname === '/operations/company-product-catalog', false) ||
      getSafe(() => Router.router.pathname === '/operations/company-inventory', false) ||
      getSafe(() => Router.router.pathname === '/operations/orders', false) ||
      getSafe(() => Router.router.pathname === '/operations/company-generic-products', false),
    products:
      getSafe(() => Router.router.pathname === '/products/cas-products', false) ||
      getSafe(() => Router.router.pathname === '/products/product-catalog', false) ||
      getSafe(() => Router.router.pathname === '/products/product-groups', false),
    companies:
      getSafe(() => Router.router.pathname === '/companies/companies', false) ||
      getSafe(() => Router.router.pathname === '/companies/users', false),
    manageGuests:
      getSafe(() => Router.router.pathname === '/manage-guests/guests', false) ||
      getSafe(() => Router.router.pathname === '/manage-guests/chat', false),
    wantedBoard:
      getSafe(() => Router.router.pathname === '/wanted-board/listings', false) ||
      getSafe(() => Router.router.pathname === '/wanted-board/bids-sent', false) ||
      getSafe(() => Router.router.pathname === '/wanted-board/bids-received', false),
    inventory:
      getSafe(() => Router.router.pathname === '/inventory/my-listings', false) ||
      getSafe(() => Router.router.pathname === '/inventory/my-products', false) ||
      getSafe(() => Router.router.pathname === '/inventory/global-price-book', false),
    marketplace:
      getSafe(() => Router.router.pathname === '/marketplace/listings', false) ||
      getSafe(() => Router.router.pathname === '/marketplace/holds', false)
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

    this.props.router.push(to)
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

  toggleOpened = (type, defaultLink) => {
    const { currentType } = this.state
    const { isAdmin, isOrderOperator } = this.props
    const typeState = this.state[type]
    if (type === 'admin') {
      Router.push('/admin/units-of-measure')
    }
    if (type === 'operations') {
      !isAdmin && isOrderOperator ? Router.push('/operations/orders') : Router.push('/operations/shipping-quotes')
    }
    if (type === 'products') {
      Router.push('/products/cas-products')
    }
    if (type === 'companies') {
      Router.push('/companies/companies')
    }

    if (defaultLink && !(type === currentType || this.state[type])) {
      Router.push(defaultLink)
    }
    // toggle dropdown state
    this.setState({
      orders: false,
      settings: false,
      admin: false,
      operations: false,
      products: false,
      companies: false,
      manageGuests: false,
      wantedBoard: false,
      inventory: false,
      marketplace: false,
      [type]: !typeState,
      currentType: type
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

      this.props.navigationPS.current.updateScroll()
    }
  }

  render() {
    const {
      isAdmin,
      isEchoOperator,
      isOrderOperator,
      auth,
      takeover,
      intl: { formatMessage },
      router: { pathname, asPath },
      collapsedMenu,
      isClientCompanyAdmin,
      isClientCompanyManager,
      companiesTabsNames,
      productsTabsNames
    } = this.props

    const {
      dropdowns,
      settings,
      orders,
      admin,
      operations,
      products,
      companies,
      manageGuests,
      inventory,
      marketplace,
      wantedBoard
    } = this.state

    const MenuLink = withRouter(({ router: { asPath }, to, children, tab, className, dataTest }) => {
      return (
        <Link href={to}>
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

    const { isCompanyAdmin, isUserAdmin, isProductCatalogAdmin, company } = getSafe(() => auth.identity, {
      isCompanyAdmin: null,
      isUserAdmin: null,
      isProductCatalogAdmin: null,
      company: null
    })

    const operationsTabs = !isAdmin && isOrderOperator ? orderOperatorTabs : operationsDefaultTabs

    const { isClientCompany } = getSafe(() => company, { isClientCompany: false })
    return (!isAdmin && !isEchoOperator && !isOrderOperator) || takeover ? (
      <div className='flex-wrapper'>
        <MenuLink to='/dashboard' dataTest='navigation_menu_admin_dashboard'>
          <>
            <Home size={22} />
            {formatMessage({ id: 'navigation.dashboard', defaultMessage: 'Dashboard' })}
          </>
        </MenuLink>
        {!isClientCompany && (
          <DropdownItem
            icon={<Layers size={22} />}
            text={
              <>
                <FormattedMessage id='navigation.inventory' defaultMessage='Inventory' />
                {inventory ? <ChevronUp /> : <ChevronDown />}
              </>
            }
            className={inventory ? 'opened' : null}
            opened={inventory}
            onClick={() => this.toggleOpened('inventory', '/inventory/my-listings')}
            refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
            refId={'inventory'}
            data-test='navigation_menu_inventory_drpdn'>
            <Dropdown.Menu data-test='navigation_menu_inventory_menu'>
              <PerfectScrollbar>
                <Dropdown.Item
                  as={MenuLink}
                  to='/inventory/my-listings'
                  dataTest='navigation_menu_inventory_my_listings_drpdn'>
                  {formatMessage({ id: 'navigation.inventoryMyListings', defaultMessage: 'My Listings' })}
                </Dropdown.Item>
                <Dropdown.Item
                  as={MenuLink}
                  to='/inventory/my-products'
                  dataTest='navigation_menu_inventory_my_products_drpdn'>
                  {formatMessage({ id: 'navigation.inventoryMyProducts', defaultMessage: 'My Products' })}
                </Dropdown.Item>
                {!isClientCompanyAdmin && (
                  <Dropdown.Item
                    as={MenuLink}
                    to='/inventory/global-price-book'
                    dataTest='navigation_menu_inventory_global_price_book_drpdn'>
                    {formatMessage({ id: 'navigation.inventoryGlobalPriceBook', defaultMessage: 'Global Price Book' })}
                  </Dropdown.Item>
                )}
              </PerfectScrollbar>
            </Dropdown.Menu>
          </DropdownItem>
        )}

        <DropdownItem
          icon={<ShoppingBag size={22} />}
          text={
            <>
              <FormattedMessage id='navigation.marketplace' defaultMessage='Marketplace' />
              {marketplace ? <ChevronUp /> : <ChevronDown />}
            </>
          }
          className={marketplace ? 'opened' : null}
          opened={marketplace}
          onClick={() => this.toggleOpened('marketplace', '/marketplace/listings')}
          refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
          refId={'marketplace'}
          data-test='navigation_menu_marketplace_drpdn'>
          <Dropdown.Menu data-test='navigation_menu_marketplace_menu'>
            <PerfectScrollbar>
              <Dropdown.Item
                as={MenuLink}
                to='/marketplace/listings'
                dataTest='navigation_menu_marketplace_listings_drpdn'>
                {formatMessage({ id: 'navigation.marketplaceListings', defaultMessage: 'Listings' })}
              </Dropdown.Item>
              <Dropdown.Item as={MenuLink} to='/marketplace/holds' dataTest='navigation_menu_marketplace_holds_drpdn'>
                {formatMessage({ id: 'navigation.marketplaceHolds', defaultMessage: 'Holds' })}
              </Dropdown.Item>
            </PerfectScrollbar>
          </Dropdown.Menu>
        </DropdownItem>

        <DropdownItem
          icon={<Grid size={22} />}
          text={
            <>
              <FormattedMessage id='navigation.wantedBoard' defaultMessage='Wanted Board' />
              {wantedBoard ? <ChevronUp /> : <ChevronDown />}
            </>
          }
          className={wantedBoard ? 'opened' : null}
          opened={wantedBoard}
          onClick={() =>
            this.toggleOpened(
              'wantedBoard',
              !isClientCompany ? '/wanted-board/listings' : '/wanted-board/bids-received'
            )
          }
          refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
          refId={'wantedBoard'}
          data-test='navigation_menu_wanted_board_drpdn'>
          <Dropdown.Menu data-test='navigation_menu_manage_wanted_board_menu'>
            <PerfectScrollbar>
              {!isClientCompany && (
                <>
                  <Dropdown.Item
                    as={MenuLink}
                    to='/wanted-board/listings'
                    dataTest='navigation_wanted_board_listings_drpdn'>
                    {formatMessage({ id: 'navigation.wantedBoardListings', defaultMessage: 'Listings' })}
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={MenuLink}
                    to='/wanted-board/bids-sent'
                    dataTest='navigation_wanted_board_bids_sent_drpdn'>
                    {formatMessage({ id: 'navigation.wantedBoardBidsSent', defaultMessage: 'My Offers' })}
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Item
                as={MenuLink}
                to='/wanted-board/bids-received'
                dataTest='navigation_wanted_board_bids_received_drpdn'>
                {formatMessage({ id: 'navigation.wantedBoardBidsReceived', defaultMessage: 'My Requests' })}
              </Dropdown.Item>
            </PerfectScrollbar>
          </Dropdown.Menu>
        </DropdownItem>
        <DropdownItem
          icon={<FileText size={22} />}
          text={
            <>
              <FormattedMessage id='navigation.orders' defaultMessage='Orders' />
              {orders ? <ChevronUp /> : <ChevronDown />}
            </>
          }
          className={orders ? 'opened' : null}
          opened={orders.toString()}
          onClick={() => this.toggleOpened('orders', !isClientCompany ? '/orders/sales' : '/orders/purchase')}
          refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
          refId={'orders'}
          data-test='navigation_orders_drpdn'>
          <Dropdown.Menu data-test='navigation_menu_orders_drpdn_menu'>
            <PerfectScrollbar>
              {!isClientCompany && (
                <Dropdown.Item as={MenuLink} to='/orders/sales' dataTest='navigation_orders_sales_orders_drpdn'>
                  {formatMessage({ id: 'navigation.salesOrders', defaultMessage: 'Sales Orders' })}
                </Dropdown.Item>
              )}
              <Dropdown.Item as={MenuLink} to='/orders/purchase' dataTest='navigation_orders_purchase_orders_drpdn'>
                {formatMessage({ id: 'navigation.purchaseOrders', defaultMessage: 'Purchase Orders' })}
              </Dropdown.Item>
            </PerfectScrollbar>
          </Dropdown.Menu>
        </DropdownItem>

        {isCompanyAdmin || isClientCompanyManager ? (
          <DropdownItem
            icon={<Coffee size={22} />}
            text={
              <>
                <FormattedMessage id='navigation.manageGuests' defaultMessage='Manage Guests' />
                {manageGuests ? <ChevronUp /> : <ChevronDown />}
              </>
            }
            className={manageGuests ? 'opened' : null}
            opened={manageGuests}
            onClick={() => this.toggleOpened('manageGuests', '/manage-guests/guests')}
            refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
            refId={'manageGuests'}
            data-test='navigation_menu_manage_guests_drpdn'>
            <Dropdown.Menu data-test='navigation_menu_manage_guests_drpdn_menu'>
              <PerfectScrollbar>
                <Dropdown.Item
                  as={MenuLink}
                  to='/manage-guests/guests'
                  dataTest='navigation_manage_guests_guests_drpdn'>
                  {formatMessage({ id: 'navigation.guests', defaultMessage: 'Guests' })}
                </Dropdown.Item>
                {false && (
                  <Dropdown.Item as={MenuLink} to='/manage-guests/chat' dataTest='navigation_manage_guests_chat_drpdn'>
                    {formatMessage({ id: 'navigation.chat', defaultMessage: 'Chat' })}
                  </Dropdown.Item>
                )}
              </PerfectScrollbar>
            </Dropdown.Menu>
          </DropdownItem>
        ) : null}

        {(isCompanyAdmin || isUserAdmin || isProductCatalogAdmin || isClientCompanyAdmin) && (
          <DropdownItem
            icon={<Settings size={22} />}
            text={
              <>
                <FormattedMessage id='navigation.myAccount' defaultMessage='My Account' />
                {settings ? <ChevronUp /> : <ChevronDown />}
              </>
            }
            className={settings ? 'opened' : null}
            opened={settings.toString()}
            onClick={() => this.toggleOpened('settings', '/settings/company-details')}
            refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
            refId={'settings'}
            data-test='navigation_menu_settings_drpdn'>
            <Dropdown.Menu data-test='navigation_menu_settings_drpdn_menu'>
              <PerfectScrollbar>
                {isCompanyAdmin || isClientCompanyAdmin ? (
                  <>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/company-details'
                      tab='company-details'
                      dataTest='navigation_settings_company_details_drpdn'>
                      {formatMessage({ id: 'navigation.companySettings', defaultMessage: 'Company Details' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/system-settings'
                      tab='system-settings'
                      dataTest='navigation_settings_system_settings_drpdn'>
                      {formatMessage({ id: 'navigation.companySettings', defaultMessage: 'Company Settings' })}
                    </Dropdown.Item>
                  </>
                ) : null}
                {isCompanyAdmin || isUserAdmin || isClientCompanyAdmin ? (
                  <Dropdown.Item
                    as={MenuLink}
                    to='/settings/users'
                    tab='users'
                    dataTest='navigation_settings_users_drpdn'>
                    {formatMessage({ id: 'navigation.users', defaultMessage: 'Users' })}
                  </Dropdown.Item>
                ) : null}
                {isCompanyAdmin || isClientCompanyAdmin ? (
                  <>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/locations'
                      tab='locations'
                      dataTest='navigation_settings_locations_drpdn'>
                      {formatMessage({ id: 'navigation.locations', defaultMessage: 'Locations' })}
                    </Dropdown.Item>
                  </>
                ) : null}
                {(isCompanyAdmin && !isClientCompany) || isClientCompanyAdmin ? (
                  <>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/bank-accounts'
                      tab='bank-accounts'
                      dataTest='navigation_settings_bank_accounts_drpdn'>
                      {formatMessage({ id: 'navigation.bankAccounts', defaultMessage: 'Bank Accounts' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/logistics'
                      tab='logistics'
                      dataTest='navigation_settings_logistics_drpdn'>
                      {formatMessage({ id: 'navigation.logistics', defaultMessage: 'Logistics' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/documents'
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
        <MenuLink to='/alerts' dataTest='navigation_menu_alerts_menulink'>
          <>
            <Bell size={22} />
            {formatMessage({ id: 'navigation.alerts', defaultMessage: 'Notifications' })}
          </>
        </MenuLink>
      </div>
    ) : (
      <div className='flex-wrapper'>
        {isAdmin && (
          <>
            <MenuLink to='/dashboard' dataTest='navigation_menu_admin_dashboard'>
              <>
                <Home size={22} />
                {formatMessage({ id: 'navigation.dashboard', defaultMessage: 'Dashboard' })}
              </>
            </MenuLink>
            <DropdownItem
              icon={<Briefcase size={22} />}
              text={
                <>
                  <FormattedMessage id='navigation.companies' defaultMessage='Companies' />
                  {companies ? <ChevronUp /> : <ChevronDown />}
                </>
              }
              className={companies ? 'opened' : null}
              opened={companies}
              onClick={() => this.toggleOpened('companies', '/companies/companies')}
              refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
              refId={'companies'}
              data-test='navigation_menu_companies_drpdn'>
              <Dropdown.Menu data-test='navigation_menu_companies_menu'>
                <PerfectScrollbar>
                  {companiesTabsNames.map((tab, i) => (
                    <Dropdown.Item
                      key={tab.id}
                      as={MenuLink}
                      to={`/companies/${tab.type}`}
                      dataTest={`navigation_companies_${tab.type}_drpdn`}>
                      {formatMessage({ id: `navigation.${tab.type}`, defaultMessage: `${tab.name}` })}
                    </Dropdown.Item>
                  ))}
                </PerfectScrollbar>
              </Dropdown.Menu>
            </DropdownItem>

            <DropdownItem
              icon={<Package size={22} />}
              text={
                <>
                  <FormattedMessage id='navigation.products' defaultMessage='Products' />
                  {products ? <ChevronUp /> : <ChevronDown />}
                </>
              }
              className={products ? 'opened' : null}
              opened={products}
              onClick={() => this.toggleOpened('products', '/products/cas-products')}
              refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
              refId={'products'}
              data-test='navigation_menu_products_drpdn'>
              <Dropdown.Menu data-test='navigation_menu_products_menu'>
                <PerfectScrollbar>
                  {productsTabsNames.map((tab, i) => (
                    <Dropdown.Item
                      key={tab.id}
                      as={MenuLink}
                      to={`/products/${tab.type}`}
                      dataTest={`navigation_products_${tab.type}_drpdn`}>
                      {formatMessage({ id: `navigation.${tab.type}`, defaultMessage: `${tab.name}` })}
                    </Dropdown.Item>
                  ))}
                </PerfectScrollbar>
              </Dropdown.Menu>
            </DropdownItem>
            <MenuLink to='/document-types' dataTest='navigation_menu_admin_document-types'>
              <>
                <FileText size={22} />
                {formatMessage({ id: 'navigation.documentTypes', defaultMessage: 'Document Types' })}
              </>
            </MenuLink>
            <MenuLink to='/market-segments' dataTest='navigation_menu_admin_market_segments'>
              <>
                <Disc size={22} />
                {formatMessage({ id: 'navigation.marketSegments', defaultMessage: 'Market Segments' })}
              </>
            </MenuLink>

            <DropdownItem
              icon={<Settings size={22} />}
              text={
                <>
                  <FormattedMessage id='navigation.adminSettings' defaultMessage='Admin Settings' />
                  {admin ? <ChevronUp /> : <ChevronDown />}
                </>
              }
              className={admin ? 'opened' : null}
              opened={admin.toString()}
              onClick={() => this.toggleOpened('admin', '/admin/units-of-measure')}
              refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
              refId={'admin'}
              data-test='navigation_menu_admin_settings_drpdn'>
              <Dropdown.Menu data-test='navigation_menu_admin_settings_menu'>
                <PerfectScrollbar>
                  {adminDefaultTabs.map((tab, i) => (
                    <Dropdown.Item
                      key={tab.id}
                      as={MenuLink}
                      to={`/admin/${tab.type}`}
                      dataTest={`navigation_admin_settings_${tab.type}_drpdn`}>
                      {formatMessage({ id: `navigation.admin.${tab.type}`, defaultMessage: `${tab.name}` })}
                    </Dropdown.Item>
                  ))}
                </PerfectScrollbar>
              </Dropdown.Menu>
            </DropdownItem>
          </>
        )}
        {(isAdmin || isEchoOperator || isOrderOperator) && (
          <>
            <DropdownItem
              icon={<Archive size={22} />}
              text={
                <>
                  <FormattedMessage id='navigation.operations' defaultMessage='Operations' />
                  {operations ? <ChevronUp /> : <ChevronDown />}
                </>
              }
              className={operations ? 'opened' : null}
              opened={operations.toString()}
              onClick={() =>
                this.toggleOpened(
                  'operations',
                  !isAdmin && isOrderOperator ? '/operations/orders' : '/operations/shipping-quotes'
                )
              }
              refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
              refId={'operations'}
              data-test='navigation_menu_operations_drpdn'>
              <Dropdown.Menu data-test='navigation_menu_operations_menu'>
                <PerfectScrollbar>
                  {operationsTabs.map((tab, i) => (
                    <Dropdown.Item
                      key={tab.id}
                      as={MenuLink}
                      to={`/operations/${tab.type}`}
                      dataTest={`navigation_operations_${tab.type}_drpdn`}>
                      {formatMessage({ id: `navigation.operations.${tab.type}`, defaultMessage: `${tab.name}` })}
                    </Dropdown.Item>
                  ))}
                </PerfectScrollbar>
              </Dropdown.Menu>
            </DropdownItem>
          </>
        )}
        <MenuLink to='/alerts' dataTest='navigation_menu_admin_alerts'>
          <>
            <Bell size={22} />
            {formatMessage({ id: 'navigation.alerts', defaultMessage: 'Notifications' })}
          </>
        </MenuLink>
      </div>
    )
  }
}
export default withAuth(
  withRouter(
    connect(
      (store, { navigationPS }) => ({
        navigationPS: navigationPS,
        auth: store.auth,
        tabsNames: store.settings.tabsNames,
        isAdmin: getSafe(() => store.auth.identity.isAdmin, false),
        isOrderOperator: getSafe(() => store.auth.identity.isOrderOperator, false),
        isClientCompanyAdmin: getSafe(() => store.auth.identity.isClientCompanyAdmin, false),
        isClientCompanyManager: getSafe(() => store.auth.identity.isClientCompanyManager, false),
        collapsedMenu: store.layout.collapsedMenu,
        isEchoOperator: getSafe(() => store.auth.identity.roles, []).some(role => role.name === 'Echo Operator'),
        companiesTabsNames: store.companiesAdmin.tabsNames,
        productsTabsNames: store.productsAdmin.tabsNames
      }),
      {
        triggerSystemSettingsModal,
        tabChanged
      }
    )(injectIntl(Navigation))
  )
)

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))
