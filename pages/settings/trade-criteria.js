import { Component } from 'react'
import Router, { withRouter } from 'next/router'
import { injectIntl } from 'react-intl'
//Components
import Layout from '../../components/Layout'
import SettingsPage from '../../modules/settings'
import securePage from '../../hocs/securePage'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    const titleName = formatMessage({
      id: 'title.myTradePass',
      defaultMessage: 'My Trade Pass'
    })

    return (
      <Layout title={titleName}>
        <SettingsPage currentTab={'trade-criteria'} />
      </Layout>
    )
  }
}

export default withRouter(securePage(injectIntl(Index)))
