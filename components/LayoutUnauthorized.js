import Head from 'next/head'
import Link from 'next/link'
import { Container } from 'semantic-ui-react'
import { Messages } from '~/modules/messages'
import { injectIntl } from 'react-intl'

const Layout = ({ children, intl: { formatMessage } }) => (
  <Container style={{ paddingTop: 40 }}>
    <Head>
      <title>{formatMessage({ id: 'global.echoTitle', defaultMessage: 'Echo exchange' })}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Messages />
    {children}

  </Container>
)

export default injectIntl(Layout)