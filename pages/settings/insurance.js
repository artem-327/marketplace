import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import { withRouter } from 'next/router'
import { injectIntl } from 'react-intl'
//Components
import Layout from '../../components/Layout'
import SettingsPage from '../../modules/settings'
import securePage from '../../hocs/securePage'

class Index extends Component {
  componentDidMount() {
    if (!this.props.auth?.identity?.isCompanyAdmin) this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props
    const titleName = formatMessage({
      id: 'title.myTradePass',
      defaultMessage: 'TradePass'
    })

    return (
      <Layout title={titleName}>
        {!auth?.identity?.isCompanyAdmin
          ? (null)
          : (<SettingsPage currentTab={'insurance'} />)
        }
      </Layout>
    )
  }
}

export default withRouter(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(securePage(injectIntl(Index))))
