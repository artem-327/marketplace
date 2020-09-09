import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import md5 from 'md5'
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
  CircularLabel,
  MainTitle,
  MainTitleWithMessage,
  CustomDiv,
  Rectangle,
  DivInRectangle,
  CustomSpanReturn
} from '~/components/constants/layout'
import { Container, Menu, Dropdown, Icon, Image, FormField, Popup } from 'semantic-ui-react'
import { Sidebar, Minimize2, LogOut } from 'react-feather'
import styled from 'styled-components'
import Logo from '~/assets/images/nav/logo-echosystem.png'
import LogoSmall from '~/assets/images/nav/logo4x.png'
// import ErrorsHandler from '~/src/utils/errorsHandler'
import NavigationMenu from './NavigationMenu'
import MiniCart from './MiniCart'
import HoldIcon from './HoldIcon'
import PopUp from '~/src/components/PopUp'
import { Messages } from '~/modules/messages'
import Settings from '~/components/settings'
import { connect } from 'react-redux'
import { withAuth } from '~/hocs'

import { takeOverCompanyFinish } from '~/modules/admin/actions'
import { openProfilePopup } from '~/modules/profile/actions'
import { agreeWithTOS } from '~/modules/auth/actions'
import { triggerSystemSettingsModal } from '~/modules/settings/actions'

import Profile from '~/modules/profile/components/Profile'
import React, { Component } from 'react'
import Router from 'next/router'
import { getSafe } from '~/utils/functions'
import { injectIntl, FormattedMessage } from 'react-intl'
import { AgreementModal } from '~/components/modals'
import { getCountryCodes } from '~/modules/phoneNumber/actions'

import { chatWidgetToggle } from '~/modules/chatWidget/actions'
import { toggleMenu } from '~/modules/layout/actions'
import { getCompanyLogo } from '~/modules/company-form/actions'
import { withToastManager } from 'react-toast-notifications'

import ChatWidget from '~/modules/chatWidget/components/ChatWidgetContainer'
import PerfectScrollbar from 'react-perfect-scrollbar'

import ErrorComponent from '~/components/error'
import moment from 'moment'

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
    '/orders?type=sales',
    '/settings?type=products',
    '/settings?type=global-broadcast',
    '/wanted-board/listings',
    '/wanted-board/bids-sent'
  ],
  redirectTo: '/marketplace/all'
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
    this.navigationPS = React.createRef()
    this.mainContainer = React.createRef()
  }

  componentDidMount() {
    if (this.props.hasLogo && getSafe(() => this.props.useCompanyLogo.value === 'true', false)) this.loadCompanyLogo()

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
      this.props.hasLogo &&
      getSafe(() => this.props.useCompanyLogo.value === 'true', false) &&
      this.props.getCompanyLogo
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

  componentWillUpdate(prevProps) {
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

    if (!tableResponsive || !mainContainer) return
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
      companyName,
      isEchoOperator,
      renderCopyright
    } = this.props
    let icon = Icon && <Icon name='user' />
    let gravatarSrc = getSafe(() => auth.identity.gravatarSrc)
    if (gravatarSrc) icon = <Image src={gravatarSrc} avatar size='small' />

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
        <PopUp />
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
                    ? hasLogo && getSafe(() => useCompanyLogo.value === 'true', false)
                      ? this.getCompanyLogo()
                      : Logo
                    : LogoSmall
                }
              />

              <NavigationMenu takeover={takeover} collapsed={collapsedMenu} navigationPS={this.navigationPS} />
            </PerfectScrollbar>
            <Container className='bottom'>
              <Menu.Item as='a' onClick={() => toggleMenu()} data-test='navigation_menu_collapse_lnk'>
                <Sidebar />
                {formatMessage({
                  id: 'global.collapseMenu',
                  defaultMessage: 'Collapse Menu'
                })}
              </Menu.Item>
            </Container>
          </LeftMenuContainer>
        </LeftMenu>

        <TopMenu fixed='top' size='large' borderless className='topbar'>
          <TopMenuContainer>
            <MainTitle as='h1'>{title}</MainTitle>

            <Menu.Menu position='right' className='black'>
              {auth && auth.identity && !auth.identity.isAdmin && !isEchoOperator && (
                <>
                  <Menu.Item
                    onClick={() => Router.push('/marketplace/holds')}
                    data-test='navigation_marketplace'
                    className='item-cart'>
                    <HoldIcon />
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => Router.push('/cart')}
                    data-test='navigation_menu_cart'
                    className='item-cart'>
                    <MiniCart />
                  </Menu.Item>
                </>
              )}
              <Dropdown className='user-menu-wrapper' item icon={icon}>
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
  getCompanyLogo
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    collapsedMenu: state.layout.collapsedMenu,
    isOpen: getSafe(() => !state.auth.identity.tosAgreementDate, false),
    cartItems: getSafe(() => state.cart.cart.cartItems.length, 0),
    takeover:
      getSafe(() => !!state.auth.identity.company.id, false) && getSafe(() => state.auth.identity.isAdmin, false),
    phoneCountryCodes: getSafe(() => state.phoneNumber.phoneCountryCodes, []),
    companyId: getSafe(() => state.auth.identity.company.id, false),
    hasLogo: getSafe(() => state.auth.identity.company.hasLogo, false),
    companyLogo: getSafe(() => state.businessTypes.companyLogo, null),
    useCompanyLogo: getSafe(() => state.auth.identity.settings.find(set => set.key === 'COMPANY_USE_OWN_LOGO'), false),
    companyName: getSafe(() => state.auth.identity.company.name, false),
    isEchoOperator: getSafe(() => state.auth.identity.roles, []).some(role => role.name === 'Echo Operator'),
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
