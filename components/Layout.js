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
import { Container, Menu, Dropdown, Icon, Image, FormField } from 'semantic-ui-react'
import { Sidebar, Minimize2 } from 'react-feather'
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
import { injectIntl } from 'react-intl'
import { AgreementModal } from '~/components/modals'
import { getCountryCodes } from '~/modules/phoneNumber/actions'

import { chatWidgetToggle } from '~/modules/chatWidget/actions'
import { toggleMenu } from '~/modules/layout/actions'
import { getCompanyLogo } from '~/modules/company-form/actions'
import { withToastManager } from 'react-toast-notifications'

import ChatWidget from '~/modules/chatWidget/components/ChatWidgetContainer'
import PerfectScrollbar from 'react-perfect-scrollbar'

import ErrorComponent from '~/components/error'

export const IconMinimize2 = styled(Minimize2)`
  text-align: center;
  padding-right: 10px;
`

const clientCompanyRoutes = {
  restrictedRoutes: [
    '/inventory',
    '/orders?type=sales',
    '/settings?type=products',
    '/settings?type=global-broadcast',
    '/wanted-board/wanted-board',
    '/wanted-board/my-offers'
  ],
  redirectTo: '/marketplace/all'
}

class Layout extends Component {
  state = {
    fatalError: false
  }
  componentDidMount() {
    if (this.props.hasLogo && getSafe(() => this.props.useCompanyLogo.value === 'true', false)) this.loadCompanyLogo()

    const { auth, phoneCountryCodes, getCountryCodes, hasLogo } = this.props

    Router.events.on('beforeHistoryChange', this.handleRouteChange)
    Router.events.on('routeChangeStart', this.handleRouteChange)

    if (this.state.fatalError) this.setState({ fatalError: false })
    if (!phoneCountryCodes.length) getCountryCodes()
    if (this.props.takeover && this.props.auth.identity.isAdmin && Router.router.route === '/admin') {
      Router.push('/inventory/my')
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

  componentWillUpdate() {
    this.handleRouteChange(this.props.router.route)
  }

  componentDidCatch(error, info) {
    console.error('Error!', error, info)
    this.setState({ fatalError: true })
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
      companyName
    } = this.props
    let icon = <Icon name='user thick' />
    let gravatarSrc = getSafe(() => auth.identity.gravatarSrc)
    if (gravatarSrc) icon = <Image src={gravatarSrc} avatar size='small' />

    return (
      <MainContainer fluid>
        <PopUp />
        <Head>
          <title>
            {formatMessage({ id: 'global.echoTitle', defaultMessage: 'Echo exchange' })} / {title}
          </title>
        </Head>

        <LeftMenu vertical fixed='left' inverted size='large' borderless className={collapsedMenu ? 'collapsed' : ''}>
          <LeftMenuContainer fluid>
            <PerfectScrollbar>
              <LogoImage
                src={
                  !collapsedMenu
                    ? hasLogo && getSafe(() => useCompanyLogo.value === 'true', false)
                      ? this.getCompanyLogo()
                      : Logo
                    : LogoSmall
                }
              />

              <NavigationMenu takeover={takeover} collapsed={collapsedMenu} />
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
            {takeover ? (
              <CustomDiv>
                <Rectangle>
                  <IconMinimize2 size='28' />
                  <div>
                    <span>You are working on take-over mode. Company: {companyName}. </span>
                    {<CustomSpanReturn onClick={() => takeOverCompanyFinish()}>Return to admin</CustomSpanReturn>}
                  </div>
                </Rectangle>
                <MainTitleWithMessage as='h1'>{title}</MainTitleWithMessage>
              </CustomDiv>
            ) : (
              <MainTitle as='h1'>{title}</MainTitle>
            )}

            <Menu.Menu position='right' className='black'>
              {auth && auth.identity && !auth.identity.isAdmin && (
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
                      <>
                        {formatMessage({ id: 'navigation.userSettings', defaultMessage: 'User Settings' })}
                        <Settings role='user' />
                      </>
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
        <ChatWidget />
        <FlexContainer>
          <TopMenuContainer fluid>
            <Messages />
          </TopMenuContainer>
          <ContentContainer fluid className='page-wrapper flex stretched'>
            {!this.state.fatalError ? children : <ErrorComponent />}
          </ContentContainer>
        </FlexContainer>
        <AgreementModal onAccept={agreeWithTOS} isOpen={isOpen} />
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
    takeover: getSafe(() => !!state.auth.identity.company.id, false),
    phoneCountryCodes: getSafe(() => state.phoneNumber.phoneCountryCodes, []),
    companyId: getSafe(() => state.auth.identity.company.id, false),
    hasLogo: getSafe(() => state.auth.identity.company.hasLogo, false),
    companyLogo: getSafe(() => state.businessTypes.companyLogo, null),
    useCompanyLogo: getSafe(() => state.auth.identity.settings.find(set => set.key === 'COMPANY_USE_OWN_LOGO'), false),
    companyName: getSafe(() => state.auth.identity.company.name, false)
  }
}

export default withAuth(withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Layout)))))
