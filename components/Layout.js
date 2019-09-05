import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Container, Menu, Image, Dropdown, Icon, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import Logo from '~/assets/images/nav/inventory.png'
// import ErrorsHandler from '~/src/utils/errorsHandler'
import NavigationMenu from './NavigationMenu'
import MiniCart from './MiniCart'
import PopUp from '~/src/components/PopUp'
import { Messages } from '~/modules/messages'
import Settings from '~/components/settings'
import { connect } from 'react-redux'
import { withAuth } from '~/hocs'
import { takeOverCompanyFinish } from '~/modules/admin/actions'
import { openProfilePopup } from '~/modules/profile/actions'
import { triggerSystemSettingsModal } from '~/modules/settings/actions'
import Profile from '~/modules/profile/components/Profile'
import React from 'react'
import Router from 'next/router'
import { getSafe } from '~/utils/functions'
import { injectIntl } from 'react-intl'

const TopMenu = styled(Menu)`
  background-color: #33373e !important;
  position: fixed;
  height: 49px;
  top: 0; right: 0; bottom: 0; left: 0;
`
const TopMenuContainer = styled(Container)`
  padding: 0 29px;
`
const MainContainer = styled(Container)`
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
`
const ContentContainer = styled(Container)`
  /* padding: 0 20px; */
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`
const FlexContainer = styled.div`
  position: fixed;
  top: 49px; right: 0; bottom: 0; left: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`
const LogoImage = styled(Image)`
  margin: 9px 10px 4px 0;
  height: 23.78px;
`
const CircularLabel = styled(Label)`
  position: absolute;
  top: -0.7em;
  left: auto;
  right: -0.7em;
  bottom: auto;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
`

const MenuLink = withRouter(({ router: { pathname }, to, children, }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const Layout = ({ children, router: { pathname }, title = 'Echo exchange', auth, takeOverCompanyFinish, triggerSystemSettingsModal, profile, openProfilePopup, cartItems, takeover, intl: { formatMessage } }) => (
  <MainContainer fluid>
    <PopUp />
    <Head>
      <title>{formatMessage({ id: 'global.echoTitle', defaultMessage: 'Echo echange' })} / {title}</title>
    </Head>
    <TopMenu fixed='top' inverted size='large' borderless>

      <TopMenuContainer fluid>
        <LogoImage src={Logo} />

        <NavigationMenu takeover={takeover} />

        <Menu.Menu position='right' className='black'>
          {auth && auth.identity && !auth.identity.isAdmin &&
            <Menu.Item onClick={() => Router.push('/cart')} data-test='navigation_menu_cart'>
              <MiniCart />
            </Menu.Item>
          }
          <Dropdown item icon={{ name: 'user circle outline', size: 'large' }}>
            <Dropdown.Menu data-test='navigation_menu_user_drpdn'>
              <Dropdown.Item as={Menu.Item} onClick={() => openProfilePopup()} data-test='navigation_menu_user_my_profile_drpdn'>{formatMessage({ id: 'global.myProfile', defaultMessage: 'My Profile' })}</Dropdown.Item>
              {getSafe(() => auth.identity.isAdmin, false) && takeover &&
                <Dropdown.Item as={Menu.Item} onClick={() => takeOverCompanyFinish()} data-test='navigation_menu_user_return_to_admin_drpdn'>{formatMessage({ id: 'global.returnToAdmin', defaultMessage: 'Return To Admin' })}</Dropdown.Item>
              }
              {/* {getSafe(() => !auth.identity.isAdmin && !auth.identity.isCompanyAdmin, false) && (
                <Menu.Item onClick={() => triggerSystemSettingsModal(true)}>
                  {formatMessage({ id: 'settings.systemSettings', defaultMessage: 'System Settings' })}

                </Menu.Item>
              )} */}

              {!getSafe(() => auth.identity.isAdmin, false) || takeover && <Menu.Item onClick={() => triggerSystemSettingsModal(true)} data-test='navigation_menu_settings_lnk'>
                <>
                  {formatMessage({ id: 'navigation.userSettings', defaultMessage: 'User Settings' })}
                  <Settings role='user' />
                </>
              </Menu.Item>}
              <Dropdown.Item as={MenuLink} to='/legal/terms-of-service' data-test='navigation_menu_user_terms_of_service_drpdn'>{formatMessage({ id: 'global.termsOfService', defaultMessage: 'Terms of Service' })}</Dropdown.Item>
              <Dropdown.Item as={MenuLink} to='/auth/logout' data-test='navigation_menu_user_logout_drpdn'>{formatMessage({ id: 'global.logout', defaultMessage: 'Logout' })}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </TopMenuContainer>
    </TopMenu>

    {profile && profile.profilePopup && <Profile />}

    <FlexContainer>
      <TopMenuContainer fluid>
        <Messages />
      </TopMenuContainer>
      <ContentContainer fluid className='page-wrapper flex stretched'>
        {children}
      </ContentContainer>
    </FlexContainer>

  </MainContainer>

)


const mapDispatchToProps = {
  takeOverCompanyFinish,
  openProfilePopup,
  triggerSystemSettingsModal
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    cartItems: getSafe(() => state.cart.cart.cartItems.length, 0),
    takeover: getSafe(() => !!state.auth.identity.company.id, false)
  }
}

export default withAuth(withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Layout))))