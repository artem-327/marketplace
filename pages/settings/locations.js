import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import SettingsPage from '~/modules/settings'
import Router, { withRouter } from 'next/router'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

class Index extends Component {
  componentDidMount() {
    if (!this.props.auth?.identity?.isCompanyAdmin) this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props
    const titleName = formatMessage(
      {
        id: 'title.settings',
        defaultMessage: 'My TradePass - {tab}'
      },
      {
        tab: formatMessage({
          id: 'title.settings.locations',
          defaultMessage: 'Locations'
        })
      }
    )

    return (
      <Layout title={titleName}>
        {!auth?.identity?.isCompanyAdmin
          ? (null)
          : (<SettingsPage currentTab={'locations'} />)
        }
      </Layout>
    )
  }
}

export default withRouter(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(securePage(injectIntl(Index))))
