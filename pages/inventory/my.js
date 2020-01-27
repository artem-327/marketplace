import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { MyInventory } from '~/modules/inventory/my'
import { injectIntl } from 'react-intl'

class MyInventoryPage extends Component {
  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <Layout title={formatMessage({ id: 'global.myInventory', defaultMessage: 'My Inventory' })}>
        <MyInventory />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MyInventoryPage))
