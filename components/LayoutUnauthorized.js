import Head from 'next/head'
import Link from 'next/link'
import {Container} from 'semantic-ui-react'

const Layout = ({children}) => (
  <Container style={{paddingTop: 40}}>
    <Head>
      <title>Echo exchange</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>

    {children}

  </Container>
)

export default Layout