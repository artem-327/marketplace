import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import Logo from '~/assets/images/nav/inventory.png'
// import ErrorsHandler from '~/src/utils/errorsHandler'
import NavigationMenu from './NavigationMenu'
import PopUp from '~/src/components/PopUp'
import { Messages } from '~/modules/messages'

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

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const Layout = ({ children, router: { pathname }, title = 'Echo exchange' }) => (
  <MainContainer fluid>
    <PopUp />
    <Head>
      <title>Echo exchange / {title}</title>
    </Head>
    <TopMenu fixed='top' inverted size='large' borderless>

      <TopMenuContainer fluid>
        <LogoImage src={Logo} />

        <NavigationMenu />

        <Menu.Menu position='right' className='black'>
          <Dropdown item icon={{ name: 'user circle outline', size: 'large' }}>
            <Dropdown.Menu>
              <Dropdown.Item as={MenuLink} to='/auth/logout'>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </TopMenuContainer>


    </TopMenu>

    <FlexContainer>
      <Container fluid className='page-wrapper'>
        <Messages />
      </Container>
      <ContentContainer fluid className='page-wrapper flex stretched'>
        {children}
      </ContentContainer>
    </FlexContainer>

  </MainContainer>
)

export default withRouter(Layout)