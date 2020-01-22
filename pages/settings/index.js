import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import SettingsPage from '~/modules/settings'
import Router, { withRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import { getSafe } from '~/utils/functions'

class Index extends Component {
  render() {
    const tabName = getSafe(() => this.props.router.query.type, '')
    const titleName = typeof FormattedMessage !== 'undefined' ? (<FormattedMessage id='title.settings' defaultMessage='Settings - {tab}' values={{ tab: <FormattedMessage id={tabName ? `title.settings.${tabName}` : ''} defaultMessage='Preparing' /> }} />) : ''

    return (
      <Layout title={titleName}>
        <SettingsPage type={tabName} />
      </Layout>
    )
  }
}

export default withRouter(securePage(Index))
