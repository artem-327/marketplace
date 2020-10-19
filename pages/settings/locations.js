import React, { Component } from 'react'
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
    const titleName = formatMessage(
      {
        id: 'title.settings',
        defaultMessage: 'Settings - {tab}'
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
        <SettingsPage currentTab={'locations'} />
      </Layout>
    )
  }
}

export default withRouter(securePage(injectIntl(Index)))