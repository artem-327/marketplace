import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
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
  MainTitle
} from '~/components/constants/layout'
import { Container, Menu, Dropdown, Icon } from 'semantic-ui-react'
import { Sidebar } from 'react-feather'
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
import { withToastManager } from 'react-toast-notifications'

import ChatWidget from '~/modules/chatWidget/components/ChatWidgetContainer'
import PerfectScrollbar from 'react-perfect-scrollbar'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))

class Layout extends Component {
  state = {
    collapsed: false
  }

  componentDidMount() {
    if (!this.props.phoneCountryCodes.length) this.props.getCountryCodes()
  }

  collapseMenu = () => {
    this.setState({collapsed: !this.state.collapsed})
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
      agreeWithTOS
    } = this.props
    const { collapsed } = this.state

    return (
      <MainContainer fluid>
        <PopUp />
        <Head>
          <title>
            {formatMessage({ id: 'global.echoTitle', defaultMessage: 'Echo exchange' })} / {title}
          </title>
        </Head>

        <LeftMenu vertical fixed='left' inverted size='large' borderless className={collapsed ? 'collapsed' : ''}>
          <LeftMenuContainer fluid>
            <PerfectScrollbar>
              <LogoImage src={!collapsed ? Logo : LogoSmall} />

              <NavigationMenu takeover={takeover} collapsed={collapsed} />
            </PerfectScrollbar>
            <Container className='bottom'>
              <Menu.Item as='a' onClick={() => this.collapseMenu()} data-test='navigation_menu_collapse_lnk'>
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
          <TopMenuContainer fluid>
            <MainTitle as='h1'>{title}</MainTitle>
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
              <Dropdown className='user-menu-wrapper' item icon={{ className: 'user thick' }}>
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
                  <Dropdown.Item
                    as={Menu.Item}
                    onClick={() => chatWidgetToggle()}
                    data-test='navigation_menu_user_support_chat_drpdn'>
                    {formatMessage({
                      id: 'global.supportChat',
                      defaultMessage: 'Support Chat'
                    })}
                  </Dropdown.Item>

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
            {children}
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
  getCountryCodes
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    isOpen: getSafe(() => !state.auth.identity.tosAgreementDate, false),
    cartItems: getSafe(() => state.cart.cart.cartItems.length, 0),
    takeover: getSafe(() => !!state.auth.identity.company.id, false),
    phoneCountryCodes: getSafe(() => state.phoneNumber.phoneCountryCodes, [])
  }
}

export default withAuth(withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Layout)))))
