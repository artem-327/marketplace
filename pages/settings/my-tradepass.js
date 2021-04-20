import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import SettingsPage from '~/modules/settings'
import Router, { withRouter } from 'next/router'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    const titleName = formatMessage({ id: 'title.settings.myTradePass', defaultMessage: 'My Trade Pass' })

    return (
      <Layout title={titleName}>
        <SettingsPage currentTab={'my-tradepass'} />
      </Layout>
    )
  }
}

export default withRouter(securePage(injectIntl(Index)))