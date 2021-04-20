import { Component } from 'react'
import { withRouter } from 'next/router'
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
        <SettingsPage currentTab={'insurance'} />
      </Layout>
    )
  }
}

export default withRouter(securePage(injectIntl(Index)))
