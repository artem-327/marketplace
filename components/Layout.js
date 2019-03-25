import Head from 'next/head'
import Link from 'next/link'
import {withRouter} from 'next/router'
import {Container, Menu, Icon, Image, Dropdown} from 'semantic-ui-react'
import Logo from '~/assets/images/nav/inventory.png'
import 'semantic-ui-css/semantic.min.css'
import '~/styles/base.scss'
import cn from 'classnames'
import ErrorsHandler from '~/src/utils/errorsHandler'

import PopUp from '~/src/components/PopUp'

const MenuLink = withRouter(({router: {pathname}, to, children}) => (
  <Link prefetch href={to}>
    <Menu.Item as="a" active={pathname === to}>{children}</Menu.Item>
  </Link>
))

const Layout = ({children, router: {pathname}, title = "Echo exchange"}) => (
  <Container fluid style={{backgroundColor: '#ffffff', padding: '47px 0 0'}}>
    <PopUp />
    <ErrorsHandler />
    <Head>
      <title>Echo exchange / {title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Menu fixed="top" inverted size="large" borderless>
      
      <Container fluid style={{padding: '0 29px'}}>
        <Image src={Logo} style={{margin: '9px 10px 4px 0', height: '23.78px'}}></Image>

        <MenuLink to='/dashboard'>Dashboard</MenuLink>
        <Dropdown item text="Inventory" className={cn({active: pathname.startsWith('/inventory') || pathname.startsWith('/inventory')})}>
          <Dropdown.Menu>
            <Dropdown.Item as={MenuLink} to="/inventory/my">My inventory</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/inventory/all">Marketplace</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/inventory/add">Add Inventory</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/cart">Shopping Cart</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Orders" className={cn({active: pathname.startsWith('/orders')})}>
          <Dropdown.Menu>
            <Dropdown.Item as={MenuLink} to="/orders/sales">Sales Orders</Dropdown.Item>
            <Dropdown.Item as={MenuLink} to="/orders/purchase">Purchase Orders</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <MenuLink to='/settings'>Settings</MenuLink>
        
        <Menu.Menu position="right">
          <MenuLink to='/auth/logout'>
            Logout
          </MenuLink>
        </Menu.Menu>
      </Container>
    </Menu>
    
    <Container fluid style={{padding: '0 20px'}}>
      {children} 
    </Container>   

  </Container>
)

export default withRouter(Layout)