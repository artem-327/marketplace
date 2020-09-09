import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { MyListings } from '~/modules/inventory/my-listings'
import { injectIntl } from 'react-intl'

class MyListingsPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.inventory.myListings', defaultMessage: 'My Listings' })}>
        <MyListings />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MyListingsPage))
