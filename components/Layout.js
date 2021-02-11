import Head from 'next/head'
import { withRouter } from 'next/router'
import {
  TopMenu,
  TopMenuContainer,
  LeftMenu,
  LeftMenuContainer,
  MainContainer,
  ContentContainer,
  CopyrightContainer,
  FlexContainer,
  LogoImage,
  MainTitle,
  CustomDiv,
  Rectangle,
  GlobalSidebars,
  CustomSpanReturn
} from '../components/constants/layout'
import { Container, Menu, Dropdown, Icon, Image, FormField, Popup, Dimmer } from 'semantic-ui-react'
import { Sidebar, Minimize2, LogOut } from 'react-feather'
import styled from 'styled-components'
import Logo from '../assets/images/nav/logo-echo.svg'
import LogoSmall from '../assets/images/nav/logo4x.png'
import NavigationMenu from './NavigationMenu'
import MiniCart from './MiniCart'
import HoldIcon from './HoldIcon'
import NotificationsIcon from './NotificationsIcon'

import CreateMenu from './CreateMenu'
import { Messages } from '../modules/messages'
import Settings from '../components/settings'
import { connect } from 'react-redux'
import { withAuth } from '../hocs'

import { takeOverCompanyFinish } from '../modules/admin/actions'
import { openProfilePopup } from '../modules/profile/actions'
import { agreeWithTOS } from '../modules/auth/actions'
import { triggerSystemSettingsModal } from '../modules/settings/actions'

import Profile from '../modules/profile/components/Profile'
import { createRef, Component } from 'react'
import Router from 'next/router'
import { getSafe } from '../utils/functions'
import { injectIntl, FormattedMessage } from 'react-intl'
import { AgreementModal } from '../components/modals'
import { getCountryCodes } from '../modules/phoneNumber/actions'

import { chatWidgetToggle } from '../modules/chatWidget/actions'
import { toggleMenu, openGlobalAddForm, setMainContainer } from '../modules/layout/actions'
import { getCompanyLogo } from '../modules/company-form/actions'
import { withToastManager } from 'react-toast-notifications'

import ChatWidget from '../modules/chatWidget/components/ChatWidgetContainer'
import PerfectScrollbar from 'react-perfect-scrollbar'

import ErrorComponent from '../components/error'
import moment from 'moment'

import ModalDetailContainer from '../modules/inventory/my-listings/components/ModalDetail/ModalDetailContainer'
import ProductSidebar from '../modules/inventory/my-products/components/ProductSidebar'
import WantedSidebar from '../modules/wanted-board/listings/components/DetailSidebar'
import UserEditSidebar from '../modules/settings/components/UserTable/UserEditSidebar/UserEditSidebar'
import GuestSidebar from '../modules/manage-guests/components/Guests/AddEditGuestCompanySidebar'
import WarehouseSidebar from '../modules/settings/components/Locations/Warehouses/WarehousesSidebar/WarehousesSidebar'

export const IconMinimize2 = styled(Minimize2)`
  text-align: center;
  padding-right: 10px;
`

const ReturnToAdmin = styled(LogOut)`
  height: 22px;
  margin-left: 10px;
  vertical-align: bottom;
`

const clientCompanyRoutes = {
  restrictedRoutes: [
    '/inventory',
    '/orders/sales',
    '/inventory/my-products',
    '/settings/global-broadcast',
    '/wanted-board/listings',
    '/wanted-board/bids-sent'
  ],
  redirectTo: '/marketplace/listings'
}

class Layout extends Component {
  state = {
    fatalError: false,
    mainClass: null,
    showCopyright: false,
    copyrightClassName: ''
  }

  constructor(props) {
    super(props)
    this.navigationPS = createRef()
    this.mainContainer = createRef()
  }

  componentDidMount() {
    if (this.props.hasLogo && this.props.useCompanyLogo) this.loadCompanyLogo()

    const { auth, phoneCountryCodes, getCountryCodes, hasLogo } = this.props

    //document.addEventListener('wheel', this.showCopyright)

    Router.events.on('beforeHistoryChange', this.handleRouteEvent)
    Router.events.on('routeChangeStart', this.handleRouteEvent)

    if (this.state.fatalError) this.setState({ fatalError: false })
    if (!phoneCountryCodes.length) getCountryCodes()
    if (this.props.takeover && this.props.auth.identity.isAdmin && Router.router.route === '/admin') {
      Router.push('/inventory/my-listings')
    }

    const mainClass = this.props.takeover ? 'takeover' : null
    this.setState({ mainClass: mainClass })
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.showCopyright)
  }

  showCopyright = e => {
    const { showCopyright, copyrightClassName } = this.state
    let tableResponsive = document.querySelector('.table-responsive')
    let mainContainer = this.mainContainer.current

    // if there is e.deltaY it is wheel event and it can show copyright if allowed
    if (typeof e.deltaY !== 'undefined' && e.target.closest('.modals, .sidebar') === null) {
      // scrolling down
      if (e.deltaY > 0 && showCopyright && copyrightClassName !== 'show-cop') {
        this.setState({ copyrightClassName: 'show-cop' })
      }
      // scrolling up - hides copyright if there is scrollbar
      else if (
        e.deltaY < 0 &&
        copyrightClassName !== '' &&
        ((tableResponsive !== null && tableResponsive.scrollHeight > tableResponsive.offsetHeight) ||
          (tableResponsive === null && mainContainer.scrollHeight > mainContainer.offsetHeight))
      ) {
        this.setState({ copyrightClassName: '' })
      }
    }
  }

  trackScrolling = () => {
    const { showCopyright, copyrightClassName } = this.state
    let tableResponsive = document.querySelector('.table-responsive')
    let mainContainer = this.mainContainer.current
    //Get position of scroll and height scroll area
    const scrollviewOffsetY = tableResponsive ? tableResponsive.scrollTop : mainContainer.scrollTop
    const scrollviewFrameHeight = tableResponsive ? tableResponsive.clientHeight : mainContainer.clientHeight
    const scrollviewContentHeight = tableResponsive ? tableResponsive.scrollHeight : mainContainer.scrollHeight
    const sum = scrollviewOffsetY + scrollviewFrameHeight

    if (
      (tableResponsive && sum >= scrollviewContentHeight - 20 && this.props.renderCopyright) ||
      (!tableResponsive && mainContainer && sum >= scrollviewContentHeight - 20)
    ) {
      this.setState({
        showCopyright: true
      })
    } else {
      this.setState({ showCopyright: false })
    }
  }

  loadCompanyLogo = async () => {
    if (
      this.props.hasLogo && this.props.useCompanyLogo && this.props.getCompanyLogo
    ) {
      await this.props.getCompanyLogo(this.props.companyId)
    }
  }

  getCompanyLogo = () => {
    if (this.props.companyLogo) {
      const file = new Blob([this.props.companyLogo], { type: this.props.companyLogo.type })
      let fileURL = URL.createObjectURL(file)

      return fileURL
    }

    return Logo
  }

  cleanCopyrightState = () => {
    this.setState({ showCopyright: false, copyrightClassName: '' })
  }

  UNSAFE_componentWillUpdate(prevProps) {
    if (
      prevProps.adminTab !== this.props.adminTab ||
      prevProps.companyTab !== this.props.companyTab ||
      prevProps.operationTab !== this.props.operationTab ||
      prevProps.productTab !== this.props.productTab ||
      prevProps.myAccountTab !== this.props.myAccountTab
    ) {
      this.cleanCopyrightState()
    }
    this.handleRouteChange(this.props.router.route)
  }

  componentDidUpdate(prevProps) {
    // get the main datatable on page (not inside modal/sidebar)
    let tableResponsive = Array.from(document.querySelectorAll('.table-responsive')).find(
      table => table.closest('.modals, .sidebar') === null
    )
    let mainContainer = getSafe(() => this.mainContainer.current, '')

    if (!mainContainer) return
    // let parentSegment = null
    // const { router, adminLoading, cartLoading, settingsLoading, wantedBoardLoading } = this.props

    //Get position of scroll and height scroll area
    const scrollviewOffsetY = tableResponsive ? tableResponsive.scrollTop : mainContainer.scrollTop
    const scrollviewFrameHeight = tableResponsive ? tableResponsive.clientHeight : mainContainer.clientHeight
    const scrollviewContentHeight = tableResponsive ? tableResponsive.scrollHeight : mainContainer.scrollHeight
    const sum = scrollviewOffsetY + scrollviewFrameHeight

    if (
      (tableResponsive &&
        sum >= scrollviewContentHeight - 20 &&
        this.props.renderCopyright &&
        this.state.copyrightClassName !== 'show-cop') ||
      (!tableResponsive &&
        mainContainer &&
        sum >= scrollviewContentHeight - 20 &&
        this.state.copyrightClassName !== 'show-cop')
    ) {
      this.setState({
        showCopyright: true,
        copyrightClassName: 'show-cop'
      })
    } else if (
      sum < scrollviewContentHeight - 20 &&
      !this.state.showCopyright &&
      this.state.copyrightClassName === 'show-cop'
    ) {
      this.cleanCopyrightState()
    }

    if (prevProps.mainContainer === null && this.mainContainer && this.mainContainer.current) {
      this.props.setMainContainer(this.mainContainer)
    }
  }

  componentDidCatch(error, info) {
    console.error('Error!', error, info)
    this.setState({ fatalError: true })
  }

  handleRouteEvent = url => {
    const { showCopyright, copyrightClassName } = this.state

    if (showCopyright || copyrightClassName !== '') {
      this.cleanCopyrightState()
      // this.handleRouteChange // will be called due to state change automatically
    } else {
      this.handleRouteChange(url)
    }
  }

  handleRouteChange = url => {
    const { auth } = this.props
    let clientCompany = getSafe(() => auth.identity.clientCompany, false)

    if (clientCompany) {
      clientCompanyRoutes.restrictedRoutes.forEach(route => {
        if (url.startsWith(route)) {
          Router.push(clientCompanyRoutes.redirectTo)
          return
        }
      })
    }
  }

  render() {
    const {
      children,
      router: { pathname },
      title = 'Echo exchange',
      auth,
      identity,
      takeOverCompanyFinish,
      triggerSystemSettingsModal,
      profile,
      openProfilePopup,
      chatWidgetToggle,
      cartItems,
      takeover,
      intl: { formatMessage },
      isOpen,
      agreeWithTOS,
      collapsedMenu,
      toggleMenu,
      hasLogo,
      useCompanyLogo,
      avatar,
      useGravatar,
      gravatarSrc,
      companyName,
      isEchoOperator,
      isOrderOperator,
      renderCopyright,
      openGlobalAddForm,
      openGlobalAddFormName
    } = this.props

    const {
      isClientCompanyManager,
      isCompanyAdmin,
      isMerchant,
      isProductCatalogAdmin,
      isProductOfferManager,
      isUserAdmin
    } = identity

    let icon = Icon && (
      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
        <g fill='none' fill-rule='evenodd'>
          <g>
            <g>
              <g>
                <g>
                  <g transform='translate(-1400 -19) translate(240) translate(855 18.737) translate(137) translate(168 1)'>
                    <path
                      fill='#748CAD'
                      d='M29 29l-.094-1.875c-.125-.625-1.39-1.39-3.797-2.297-.093-.031-.172-.062-.234-.094-1.469-.53-2.234-.828-2.297-.89-.187-.125-.281-.657-.281-1.594 0-.375.14-.742.422-1.102.281-.359.5-.992.656-1.898.063-.313.156-.563.281-.75.125-.188.25-.563.375-1.125.094-.281.102-.547.024-.797-.078-.25-.117-.406-.117-.469.062-.5.125-1.015.187-1.547.063-.718-.25-1.492-.938-2.32C22.5 11.414 21.438 11 20 11c-1.438 0-2.5.414-3.188 1.242-.687.828-1 1.602-.937 2.32.063.532.125 1.047.188 1.547 0 .063-.04.22-.118.47-.078.25-.07.515.024.796.125.563.25.938.375 1.125.125.188.218.438.281.75.156.906.375 1.54.656 1.898.282.36.422.727.422 1.102v.281c0 .688-.062 1.102-.187 1.242-.125.141-.547.336-1.266.586-.531.188-.984.344-1.36.47-2.406.905-3.671 1.671-3.796 2.296C11.03 27.563 11 28.188 11 29h18z'
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )

    if (avatar) {
      icon = <Image src={avatar} avatar size='small' />
    } else if (useGravatar && gravatarSrc) {
      icon = <Image src={gravatarSrc} avatar size='small' />
    }

    const { mainClass, copyrightClassName } = this.state
    // if user is in Settings then copyrightContainer waiting to props renderCopyright
    const copyrightContainer =
      title.includes('Settings') && !renderCopyright ? null : (
        <CopyrightContainer>
          <FormattedMessage
            id='global.copyright'
            defaultMessage={`Copyright ${moment().format('YYYY')} Echosystem`}
            values={{ currentYear: moment().format('YYYY') }}
          />
        </CopyrightContainer>
      )

    return (
      <MainContainer fluid className={mainClass}>
        <Head>
          <title>
            {formatMessage({ id: 'global.echoTitle', defaultMessage: 'Echo exchange' })} / {title}
          </title>
        </Head>

        <LeftMenu vertical fixed='left' inverted size='large' borderless className={collapsedMenu ? 'collapsed' : ''}>
          <LeftMenuContainer fluid>
            <PerfectScrollbar ref={this.navigationPS}>
              <LogoImage
                src={
                  !collapsedMenu
                    ? hasLogo && useCompanyLogo
                      ? this.getCompanyLogo()
                      : Logo
                    : LogoSmall
                }
              />

              <NavigationMenu takeover={takeover} collapsed={collapsedMenu} navigationPS={this.navigationPS} />
            </PerfectScrollbar>
            {false ? (
              <Container className='bottom'>
                <Menu.Item as='a' onClick={() => toggleMenu()} data-test='navigation_menu_collapse_lnk'>
                  <Sidebar />
                  {formatMessage({
                    id: 'global.collapseMenu',
                    defaultMessage: 'Collapse Menu'
                  })}
                </Menu.Item>
              </Container>
            ) : null}
          </LeftMenuContainer>
        </LeftMenu>

        <TopMenu fixed='top' size='large' borderless className='topbar'>
          <TopMenuContainer>
            <MainTitle as='h1'>{title}</MainTitle>

            <Menu.Menu position='right' className='black' style={{ flexFlow: 'row-reverse nowrap' }}>
              <Dropdown key='user-menu' className='user-menu-wrapper' item icon={icon} direction='left'>
                <Dropdown.Menu data-test='navigation_menu_user_drpdn'>
                  <Dropdown.Item>
                    <Dropdown.Header>{getSafe(() => auth.identity.name, '')}</Dropdown.Header>
                    {getSafe(() => auth.identity.jobTitle, '')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Menu.Item}
                    onClick={() => openProfilePopup()}
                    data-test='navigation_menu_user_my_profile_drpdn'>
                    {formatMessage({
                      id: 'global.myProfile',
                      defaultMessage: 'My Profile'
                    })}
                  </Dropdown.Item>
                  {/* <Dropdown.Item
        as={Menu.Item}
        onClick={() => chatWidgetToggle()}
        data-test='navigation_menu_user_support_chat_drpdn'>
        {formatMessage({
          id: 'global.supportChat',
          defaultMessage: 'Support Chat'
        })}
      </Dropdown.Item> */}
                  {getSafe(() => auth.identity.isAdmin, false) && takeover && (
                    <Dropdown.Item
                      as={Menu.Item}
                      onClick={() => takeOverCompanyFinish()}
                      data-test='navigation_menu_user_return_to_admin_drpdn'>
                      {formatMessage({
                        id: 'global.returnToAdmin',
                        defaultMessage: 'Return To Admin'
                      })}
                    </Dropdown.Item>
                  )}
                  {(!getSafe(() => auth.identity.isAdmin, false) ||
                    takeover ||
                    !getSafe(() => auth.identity.isCompanyAdmin, false)) && (
                    <Menu.Item
                      onClick={() => triggerSystemSettingsModal(true)}
                      data-test='navigation_menu_settings_lnk'>
                      {formatMessage({ id: 'navigation.userSettings', defaultMessage: 'User Settings' })}
                    </Menu.Item>
                  )}
                  <Dropdown.Item
                    as={Menu.Item}
                    onClick={() => window.open('https://www.echosystem.com/terms-of-service')}
                    data-test='navigation_menu_user_terms_of_service_drpdn'>
                    {formatMessage({
                      id: 'global.termsOfService',
                      defaultMessage: 'Terms of Service'
                    })}
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Menu.Item}
                    onClick={() => Router.push('/auth/logout')}
                    data-test='navigation_menu_user_logout_drpdn'
                    className='logout'>
                    <Icon className='power thick' />
                    {formatMessage({
                      id: 'global.logout',
                      defaultMessage: 'Logout'
                    })}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {auth && auth.identity && !auth.identity.isAdmin && !isEchoOperator && !isOrderOperator && (
                <>
                  <Menu.Item
                    onClick={() => Router.push('/cart')}
                    data-test='navigation_menu_cart'
                    className='item-cart'>
                    <MiniCart />
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => Router.push('/alerts')}
                    data-test='navigation_notifications'
                    className='item-cart'>
                    <NotificationsIcon />
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => Router.push('/marketplace/holds')}
                    data-test='navigation_marketplace'
                    className='item-cart'>
                    <HoldIcon />
                  </Menu.Item>
                  {(isClientCompanyManager ||
                    isCompanyAdmin ||
                    isMerchant ||
                    isProductCatalogAdmin ||
                    isProductOfferManager ||
                    isUserAdmin) && (
                    <Menu.Item>
                      <CreateMenu />
                    </Menu.Item>
                  )}
                </>
              )}
              {auth && auth.identity && auth.identity.isAdmin && (
                <Menu.Item
                  onClick={() => Router.push('/alerts')}
                  data-test='navigation_notifications'
                  className='item-cart'>
                  <NotificationsIcon />
                </Menu.Item>
              )}
            </Menu.Menu>
          </TopMenuContainer>
        </TopMenu>

        {profile && profile.profilePopup && <Profile />}
        <Settings role='user' scrolling={false} />
        <ChatWidget />
        <FlexContainer className={copyrightClassName} onScroll={this.trackScrolling}>
          <TopMenuContainer fluid>
            <Messages />
          </TopMenuContainer>
          <ContentContainer
            ref={this.mainContainer}
            onWheel={this.showCopyright}
            className='ui fluid container page-wrapper flex column stretched'>
            {!this.state.fatalError ? children : <ErrorComponent />}
          </ContentContainer>
          {copyrightContainer}
        </FlexContainer>
        <AgreementModal onAccept={agreeWithTOS} isOpen={isOpen} />

        {takeover ? (
          <CustomDiv>
            <Rectangle>
              <IconMinimize2 size='28' />
              <div>
                <span>
                  <FormattedMessage
                    id='global.takeOverInfo'
                    defaultMessage={`You are working in take-over mode on behalf of '${companyName}'.`}
                    values={{ companyName: companyName }}
                  />
                </span>
                {
                  <Popup
                    content={<FormattedMessage id='global.returnToAdmin' defaultMessage='Return to Admin' />}
                    trigger={
                      <CustomSpanReturn onClick={() => takeOverCompanyFinish()}>
                        <ReturnToAdmin />
                      </CustomSpanReturn>
                    }
                  />
                }
              </div>
            </Rectangle>
          </CustomDiv>
        ) : null}

        <Dimmer active={openGlobalAddFormName !== ''} style={{ opacity: '0.4' }} />
        <GlobalSidebars>
          {openGlobalAddFormName === 'inventory-my-products' && (
            <ProductSidebar openGlobalAddForm={openGlobalAddForm} />
          )}
          {openGlobalAddFormName === 'inventory-my-listings' && (
            <ModalDetailContainer openGlobalAddForm={openGlobalAddForm} />
          )}
          {openGlobalAddFormName === 'wanted-board-listings' && <WantedSidebar openGlobalAddForm={openGlobalAddForm} />}
          {openGlobalAddFormName === 'my-account-users' && <UserEditSidebar openGlobalAddForm={openGlobalAddForm} />}
          {openGlobalAddFormName === 'manage-guests-guests' && <GuestSidebar openGlobalAddForm={openGlobalAddForm} />}
          {openGlobalAddFormName === 'my-account-locations' && (
            <WarehouseSidebar openGlobalAddForm={openGlobalAddForm} />
          )}
        </GlobalSidebars>
      </MainContainer>
    )
  }
}

const mapDispatchToProps = {
  takeOverCompanyFinish,
  openProfilePopup,
  chatWidgetToggle,
  triggerSystemSettingsModal,
  agreeWithTOS,
  getCountryCodes,
  toggleMenu,
  getCompanyLogo,
  openGlobalAddForm,
  setMainContainer
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    identity: getSafe(() => state.auth.identity, {}),
    profile: state.profile,
    collapsedMenu: state.layout.collapsedMenu,
    openGlobalAddFormName: state.layout.openGlobalAddFormName,
    mainContainer: state.layout.mainContainer,
    isOpen: getSafe(() => !state.auth.identity.tosAgreementDate, false),
    cartItems: getSafe(() => state.cart.cart.cartItems.length, 0),
    takeover:
      getSafe(() => !!state.auth.identity.company.id, false)
      && getSafe(() => state.auth.identity.isAdmin, false),
    phoneCountryCodes: getSafe(() => state.phoneNumber.phoneCountryCodes, []),
    companyId: getSafe(() => state.auth.identity.company.id, false),
    hasLogo: getSafe(() => state.auth.identity.company.hasLogo, false),
    companyLogo: getSafe(() => state.businessTypes.companyLogo, null),
    useCompanyLogo:
      getSafe(() =>
        state.auth.identity.settings.find(set => set.key === 'COMPANY_USE_OWN_LOGO').value, 'false')
        .toLowerCase() === 'true',
    avatar: getSafe(() => state.auth.identity.avatar, null),
    gravatarSrc: getSafe(() => state.auth.identity.gravatarSrc, null),
    useGravatar:
      getSafe(() =>
        state.auth.identity.settings.find(set => set.key === 'USER_USE_GRAVATAR').value, 'false')
        .toLowerCase() === 'true',
    companyName: getSafe(() => state.auth.identity.company.name, false),
    isEchoOperator:
      getSafe(() => state.auth.identity.roles, []).some(role => role.name === 'Echo Operator'),
    isOrderOperator: getSafe(() => state.auth.identity.isOrderOperator, false),
    renderCopyright: getSafe(() => state.settings.renderCopyright, false),
    adminTab: getSafe(() => state.admin.currentTab.id, null),
    companyTab: getSafe(() => state.companiesAdmin.currentTab.id, null),
    operationTab: getSafe(() => state.operations.currentTab.id, null),
    productTab: getSafe(() => state.productsAdmin.currentTab.id, null),
    myAccountTab: getSafe(() => state.settings.currentTab.id, null),
    adminLoading: state.admin.loading,
    cartLoading: state.cart.cartIsFetching,
    settingsLoading: state.settings.loading,
    wantedBoardLoading: state.wantedBoard.loading
  }
}

export default withAuth(withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Layout)))))
