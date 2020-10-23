import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import ManageGuests from '~/modules/manage-guests'
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
        id: 'manageGuests.manageGuestCompanies',
        defaultMessage: 'Manage Guest Companies'
      }
    )

    return (
      <Layout title={titleName}>
        <ManageGuests currentTab={'guests'} />
      </Layout>
    )
  }
}

export default withRouter(securePage(injectIntl(Index)))