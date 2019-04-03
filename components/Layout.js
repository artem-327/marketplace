import Head from 'next/head'
import Link from 'next/link'
import {withRouter} from 'next/router'
import {Container, Menu, Image} from 'semantic-ui-react'
import styled from 'styled-components'
import Logo from '~/assets/images/nav/inventory.png'
import ErrorsHandler from '~/src/utils/errorsHandler'
import NavigationMenu from './NavigationMenu'
import PopUp from '~/src/components/PopUp'

const TopMenu = styled(Menu)`
  background-color: #33373e !important;
`
const TopMenuContainer = styled(Container)`
  padding: 0 29px;
`
const MainContainer = styled(Container)`
  padding: 47px 0 0;
`
const ContentContainer = styled(Container)`
  padding: 0 20px;
`
const LogoImage = styled(Image)`
  margin: 9px 10px 4px 0;
  height: 23.78px;
`

const MenuLink = withRouter(({router: {pathname}, to, children}) => (
  <Link prefetch href={to}>
    <Menu.Item as="a" active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const Layout = ({children, router: {pathname}, title = "Echo exchange"}) => (
  <MainContainer fluid>
    <PopUp />
    <ErrorsHandler />
    <Head>
      <title>Echo exchange / {title}</title>
    </Head>
    <TopMenu fixed="top" inverted size="large" borderless>
      
      <TopMenuContainer fluid>
        <LogoImage src={Logo} />

        <NavigationMenu />
        
        <Menu.Menu position="right">
          <MenuLink to='/auth/logout'>
            Logout
          </MenuLink>
        </Menu.Menu>
      </TopMenuContainer>
    </TopMenu>
    
    <ContentContainer fluid>
      {children} 
    </ContentContainer>

  </MainContainer>
)

export default withRouter(Layout)