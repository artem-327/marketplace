import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import Alerts from '~/modules/alerts'

import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout
        title={formatMessage({
          id: 'alerts.title',
          defaultMessage: 'Notifications'
        })}>
        <Alerts />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
