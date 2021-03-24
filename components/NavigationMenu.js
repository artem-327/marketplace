import { Component } from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { Menu, Dropdown } from 'semantic-ui-react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import {
  Layers,
  Settings,
  ShoppingBag,
  Grid,
  FileText,
  Bell,
  Briefcase,
  Home,
  Package,
  Archive,
  Disc,
  Coffee,
  ChevronDown,
  ChevronUp,
  Globe,
  Menu as MenuIcon
} from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

//Constants
import { NETWORK_STATUS } from '../modules/my-network/constants'
import { defaultTabs as operationsDefaultTabs, orderOperatorTabs } from '../modules/operations/constants'
//HOCS
import { withAuth } from '../hocs'
//Components
import { tabChanged, triggerSystemSettingsModal } from '../modules/settings/actions'
import { loadData as switchAlertsCategory } from '../modules/alerts/actions'
import { defaultTabs as adminDefaultTabs } from '../modules/admin/config'
import { NavCircle } from '../modules/alerts/components/layout'
import { Datagrid } from '../modules/datagrid'
//Services
import { getSafe } from '../utils/functions'
//Styles
import { DivNavItem } from './NavigationMenu.styles'

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
      // getSafe(() => Router.router.pathname === '/settings/logistics', false) ||
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
      getSafe(() => Router.router.pathname === '/admin/carriers', false) ||
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
    wantedBoard:
      getSafe(() => Router.router.pathname === '/wanted-board/listings', false) ||
      getSafe(() => Router.router.pathname === '/wanted-board/bids-sent', false) ||
      getSafe(() => Router.router.pathname === '/wanted-board/bids-received', false),
    inventory:
      getSafe(() => Router.router.pathname === '/inventory/my-listings', false) ||
      getSafe(() => Router.router.pathname === '/inventory/my-products', false) ||
      getSafe(() => Router.router.pathname === '/inventory/shared-listings', false) ||
      getSafe(() => Router.router.pathname === '/inventory/global-price-book', false),
    marketplace:
      getSafe(() => Router.router.pathname === '/marketplace/listings', false) ||
      getSafe(() => Router.router.pathname === '/marketplace/holds', false) ||
      getSafe(() => Router.router.pathname === '/marketplace/bids-sent', false) ||
      getSafe(() => Router.router.pathname === '/marketplace/bids-received', false),
    myNetwork: getSafe(() => Router.router.pathname === '/my-network', false),
    alerts: getSafe(() => Router.router.pathname === '/alerts', false),
    credentials:
      getSafe(() => Router.router.pathname === '/warehouse-credentials/all', false) ||
      getSafe(() => Router.router.pathname === '/warehouse-credentials/pending', false),
    activeNetworkStatus: 'ALL'
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
      wantedBoard: false,
      inventory: false,
      marketplace: false,
      myNetwork: false,
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
      companiesTabsNames,
      productsTabsNames,
      alertTab,
      pendingNetworks,
      connectedNetworks,
      declinedNetworks,
      disconnectedNetworks,
      allNetworks
    } = this.props

    const {
      dropdowns,
      settings,
      orders,
      admin,
      operations,
      products,
      companies,
      inventory,
      marketplace,
      wantedBoard,
      myNetwork,
      alerts,
      credentials
    } = this.state

    const MenuLink = withRouter(({ router: { pathname }, to, children, tab, className, dataTest }) => {
      return (
        <Link href={to}>
          <Menu.Item
            as='a'
            data-test={dataTest}
            active={pathname === to}
            onClick={async e => await this.settingsLink(e, to, tab)}
            className={className}>
            {children}
          </Menu.Item>
        </Link>
      )
    })

    const DivItem = ({ children, dataTest, networkStatus, pointer, status }) => {
      return (
        <DivNavItem
          pointer={pointer}
          data-test={dataTest}
          $highlighted={status === this.state.activeNetworkStatus}
          onClick={async e => {
            e.stopPropagation()
            if (typeof networkStatus === 'function') {
              await networkStatus()
            }
            this.setState({ myNetwork: true, activeNetworkStatus: status })
          }}>
          {children}
        </DivNavItem>
      )
    }

    const { isCompanyAdmin, isUserAdmin, isProductCatalogAdmin, company } = getSafe(() => auth.identity, {
      isCompanyAdmin: null,
      isUserAdmin: null,
      isProductCatalogAdmin: null,
      company: null
    })

    const operationsTabs = !isAdmin && isOrderOperator ? orderOperatorTabs : operationsDefaultTabs

    return (!isAdmin && !isEchoOperator && !isOrderOperator) || takeover ? (
      <div className='flex-wrapper'>
        <MenuLink to='/dashboard' dataTest='navigation_menu_admin_dashboard'>
          <>
            <Home size={22} />
            {formatMessage({ id: 'navigation.dashboard', defaultMessage: 'Dashboard' })}
          </>
        </MenuLink>

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
              <Dropdown.Item
                as={MenuLink}
                to='/inventory/shared-listings'
                dataTest='navigation_menu_inventory_shared_listings_drpdn'>
                {formatMessage({ id: 'navigation.inventorySharedListings', defaultMessage: 'Shared Listings' })}
              </Dropdown.Item>
              {isCompanyAdmin && (
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
              <Dropdown.Item
                as={MenuLink}
                to='/marketplace/bids-sent'
                dataTest='navigation_menu_marketplace_bids_sent_drpdn'>
                {formatMessage({ id: 'navigation.marketplaceBidsSent', defaultMessage: 'Bids Sent' })}
              </Dropdown.Item>
              <Dropdown.Item
                as={MenuLink}
                to='/marketplace/bids-received'
                dataTest='navigation_menu_marketplace_bids_received_drpdn'>
                {formatMessage({ id: 'navigation.marketplaceBidsReceived', defaultMessage: 'Bids Received' })}
              </Dropdown.Item>
              {
                /* DT-293 temporary disabled */ false && (
                  <Dropdown.Item
                    as={MenuLink}
                    to='/marketplace/holds'
                    dataTest='navigation_menu_marketplace_holds_drpdn'>
                    {formatMessage({ id: 'navigation.marketplaceHolds', defaultMessage: 'Holds' })}
                  </Dropdown.Item>
                )
              }
            </PerfectScrollbar>
          </Dropdown.Menu>
        </DropdownItem>

        <DropdownItem
          icon={<Globe size={22} />}
          text={
            <>
              <FormattedMessage id='navigation.myNetwork' defaultMessage='My Network' />
              {myNetwork ? <ChevronUp /> : <ChevronDown />}
            </>
          }
          className={myNetwork ? 'opened' : null}
          opened={myNetwork}
          onClick={() => this.toggleOpened('myNetwork', '/my-network')}
          refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
          refId={'myNetwork'}
          data-test='navigation_menu_my_network_drpdn'>
          <Dropdown.Menu data-test='navigation_menu_my_Network_menu'>
            <PerfectScrollbar>
              <Dropdown.Item
                as={DivItem}
                pointer={true}
                dataTest='navigation_menu_my_Network_all_drpdn'
                status={NETWORK_STATUS.ALL}
                networkStatus={() => Datagrid?.setQuery({ status: NETWORK_STATUS.ALL })}>
                {formatMessage(
                  {
                    id: 'navigation.myNetworkAll',
                    defaultMessage: 'All ({value})'
                  },
                  { value: allNetworks }
                )}
              </Dropdown.Item>
              <Dropdown.Item
                as={DivItem}
                pointer={true}
                status={NETWORK_STATUS.ACTIVE}
                networkStatus={() => Datagrid?.setQuery({ status: NETWORK_STATUS.ACTIVE })}
                dataTest='navigation_menu_my_network_active_drpdn'>
                {formatMessage(
                  {
                    id: 'navigation.myNetworkActive',
                    defaultMessage: 'Active ({value})'
                  },
                  { value: connectedNetworks }
                )}
              </Dropdown.Item>
              <Dropdown.Item
                as={DivItem}
                pointer={true}
                status={NETWORK_STATUS.PENDING}
                networkStatus={() => Datagrid?.setQuery({ status: NETWORK_STATUS.PENDING })}
                dataTest='navigation_menu_my_network_pending_drpdn'>
                {formatMessage(
                  {
                    id: 'navigation.myNetworkPending',
                    defaultMessage: 'Pending ({value})'
                  },
                  { value: pendingNetworks }
                )}
              </Dropdown.Item>
              <Dropdown.Item
                as={DivItem}
                pointer={true}
                status={NETWORK_STATUS.DECLINED}
                networkStatus={() => Datagrid?.setQuery({ status: NETWORK_STATUS.DECLINED })}
                dataTest='navigation_menu_my_network_declined_drpdn'>
                {formatMessage(
                  {
                    id: 'navigation.myNetworkDeclined',
                    defaultMessage: 'Declined ({value})'
                  },
                  { value: declinedNetworks }
                )}
              </Dropdown.Item>
              <Dropdown.Item
                as={DivItem}
                pointer={true}
                status={NETWORK_STATUS.DISCONNECTED}
                networkStatus={() => Datagrid?.setQuery({ status: NETWORK_STATUS.DISCONNECTED })}
                dataTest='navigation_menu_my_network_disconnected_drpdn'>
                {formatMessage(
                  {
                    id: 'navigation.myNetworkDisconnected',
                    defaultMessage: 'Disconnected ({value})'
                  },
                  { value: disconnectedNetworks }
                )}
              </Dropdown.Item>
            </PerfectScrollbar>
          </Dropdown.Menu>
        </DropdownItem>

        {/* Temporary hide based on https://bluepallet.atlassian.net/browse/DT-88*/}
        {false && (
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
            onClick={() => this.toggleOpened('wantedBoard', '/wanted-board/listings')}
            refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
            refId={'wantedBoard'}
            data-test='navigation_menu_wanted_board_drpdn'>
            <Dropdown.Menu data-test='navigation_menu_manage_wanted_board_menu'>
              <PerfectScrollbar>
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
                    {formatMessage({ id: 'navigation.wantedBoardBidsSent', defaultMessage: 'Bids Sent' })}
                  </Dropdown.Item>
                </>
                <Dropdown.Item
                  as={MenuLink}
                  to='/wanted-board/bids-received'
                  dataTest='navigation_wanted_board_bids_received_drpdn'>
                  {formatMessage({ id: 'navigation.wantedBoardBidsReceived', defaultMessage: 'My Requests' })}
                </Dropdown.Item>
              </PerfectScrollbar>
            </Dropdown.Menu>
          </DropdownItem>
        )}
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
          onClick={() => this.toggleOpened('orders', '/orders/sales')}
          refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
          refId={'orders'}
          data-test='navigation_orders_drpdn'>
          <Dropdown.Menu data-test='navigation_menu_orders_drpdn_menu'>
            <PerfectScrollbar>
              <Dropdown.Item as={MenuLink} to='/orders/sales' dataTest='navigation_orders_sales_orders_drpdn'>
                {formatMessage({ id: 'navigation.salesOrders', defaultMessage: 'Sales Orders' })}
              </Dropdown.Item>
              <Dropdown.Item as={MenuLink} to='/orders/purchase' dataTest='navigation_orders_purchase_orders_drpdn'>
                {formatMessage({ id: 'navigation.purchaseOrders', defaultMessage: 'Purchase Orders' })}
              </Dropdown.Item>
            </PerfectScrollbar>
          </Dropdown.Menu>
        </DropdownItem>

        {(isCompanyAdmin || isUserAdmin) && (
          <DropdownItem
            icon={<Settings size={22} />}
            text={
              <>
                <FormattedMessage id='navigation.myTradePass' defaultMessage='My TradePass' />
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
                {isCompanyAdmin ? (
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
                      {formatMessage({ id: 'navigation.Settings', defaultMessage: 'Settings' })}
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/trade-criteria'
                      tab='trade-criteria'
                      dataTest='navigation_settings_my_trade_criteria_drpdn'>
                      {formatMessage({ id: 'navigation.myTradeCriteria', defaultMessage: 'My Trade Criteria' })}
                    </Dropdown.Item>
                  </>
                ) : null}
                {isCompanyAdmin || isUserAdmin ? (
                  <Dropdown.Item
                    as={MenuLink}
                    to='/settings/users'
                    tab='users'
                    dataTest='navigation_settings_users_drpdn'>
                    {formatMessage({ id: 'navigation.users', defaultMessage: 'Users' })}
                  </Dropdown.Item>
                ) : null}
                {isCompanyAdmin ? (
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
                {isCompanyAdmin ? (
                  <>
                    <Dropdown.Item
                      as={MenuLink}
                      to='/settings/bank-accounts'
                      tab='bank-accounts'
                      dataTest='navigation_settings_bank_accounts_drpdn'>
                      {formatMessage({ id: 'navigation.bankAccounts', defaultMessage: 'Bank Accounts' })}
                    </Dropdown.Item>
                    {/* Commented based on https://bluepallet.atlassian.net/browse/DT-227 */}
                    {/* <Dropdown.Item
                      as={MenuLink}
                      to='/settings/logistics'
                      tab='logistics'
                      dataTest='navigation_settings_logistics_drpdn'>
                      {formatMessage({ id: 'navigation.logistics', defaultMessage: 'Logistics' })}
                    </Dropdown.Item> */}
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
        {isAdmin && (
          <DropdownItem
            icon={<MenuIcon size={22} />}
            text={
              <>
                <FormattedMessage id='navigation.credentials' defaultMessage='Warehouse Credentials' />
                {credentials ? <ChevronUp /> : <ChevronDown />}
              </>
            }
            className={credentials ? 'opened' : null}
            open={credentials.toString()}
            onClick={(data, e) => {
              this.toggleOpened('credentials', '/warehouse-credentials/all')
            }}
            refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
            refId={'credentials'}
            data-test='navigation_menu_credentials_drpdn'>
            <Dropdown.Menu data-test='navigation_menu_credentials_menu'>
              <PerfectScrollbar>
                <Dropdown.Item
                  key={0}
                  as={MenuLink}
                  to={`/warehouse-credentials/all`}
                  dataTest={'navigation_credentials_all_drpdn'}>
                  {formatMessage({ id: 'navigation.credentials.all', defaultMessage: 'All' })}
                </Dropdown.Item>
                <Dropdown.Item
                  key={0}
                  as={MenuLink}
                  to={`/warehouse-credentials/pending`}
                  dataTest={'navigation_credentials_pending_drpdn'}>
                  {formatMessage({ id: 'navigation.credentials.pending', defaultMessage: 'Pending' })}
                </Dropdown.Item>
              </PerfectScrollbar>
            </Dropdown.Menu>
          </DropdownItem>
        )}
        {isAdmin ? (
          <>
            <DropdownItem
              icon={<Bell size={22} />}
              text={
                <>
                  <FormattedMessage id='navigation.alerts' defaultMessage='Notifications' />
                  {alerts ? <ChevronUp /> : <ChevronDown />}
                </>
              }
              className={alerts ? 'opened' : null}
              open={alerts.toString()}
              onClick={(data, e) => {
                this.toggleOpened('alerts', '/alerts')
              }}
              refFunc={(dropdownItem, refId) => this.createRef(dropdownItem, refId)}
              refId={'alerts'}
              data-test='navigation_menu_alerts_drpdn'>
              <Dropdown.Menu data-test='navigation_menu_alerts_menu'>
                <PerfectScrollbar>
                  <Dropdown.Item
                    key={0}
                    as={Menu.Item}
                    active={alertTab === null}
                    onClick={e => {
                      e.stopPropagation()
                      this.props.switchAlertsCategory(null)
                    }}
                    dataTest={'navigation_alerts_all_drpdn'}>
                    {formatMessage({ id: `navigation.alerts.allNotifications`, defaultMessage: 'All Notifications' })}
                  </Dropdown.Item>
                  {this.props.alertsCats.map((tab, i) => {
                    let categoryConstant = tab.category.replaceAll('_', '')
                    categoryConstant = categoryConstant.charAt(0).toLowerCase() + categoryConstant.slice(1)
                    return (
                      <Dropdown.Item
                        key={i + 1}
                        as={Menu.Item}
                        active={alertTab === tab.category}
                        onClick={e => {
                          e.stopPropagation()
                          this.props.switchAlertsCategory(tab.category)
                        }}
                        dataTest={`navigation_alerts_${tab.category}_drpdn`}>
                        {tab.newMessages ? <NavCircle circular>{tab.newMessages}</NavCircle> : null}
                        {formatMessage({
                          id: `navigation.alerts.${categoryConstant}`,
                          defaultMessage: `${tab.category}`
                        })}
                      </Dropdown.Item>
                    )
                  })}
                </PerfectScrollbar>
              </Dropdown.Menu>
            </DropdownItem>
          </>
        ) : (
          <MenuLink to='/alerts' dataTest='navigation_menu_admin_alerts'>
            <>
              <Bell size={22} />
              {formatMessage({ id: 'navigation.alerts', defaultMessage: 'Notifications' })}
            </>
          </MenuLink>
        )}
      </div>
    )
  }
}
export default withAuth(
  withRouter(
    connect(
      (store, { navigationPS }) => ({
        navigationPS,
        auth: store?.auth,
        tabsNames: store?.settings?.tabsNames,
        isAdmin: getSafe(() => store.auth.identity.isAdmin, false),
        isOrderOperator: getSafe(() => store.auth.identity.isOrderOperator, false),
        collapsedMenu: store?.layout?.collapsedMenu,
        isEchoOperator: getSafe(() => store.auth.identity.roles, []).some(role => role.name === 'Echo Operator'),
        companiesTabsNames: store?.companiesAdmin?.tabsNames,
        productsTabsNames: store?.productsAdmin?.tabsNames,
        alertTab: store?.alerts?.topMenuTab,
        alertsCats: store?.alerts?.categories,
        allNetworks: store?.myNetwork?.all,
        connectedNetworks: store?.myNetwork?.connected,
        pendingNetworks: store?.myNetwork?.pending + getSafe(() => store?.myNetwork?.requested, 0),
        declinedNetworks: store?.myNetwork?.declined,
        disconnectedNetworks: store?.myNetwork?.disconnected
      }),
      {
        triggerSystemSettingsModal,
        tabChanged,
        switchAlertsCategory
      }
    )(injectIntl(Navigation))
  )
)

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))
