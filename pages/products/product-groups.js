import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import ProductsPage from '~/modules/products'
import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout title={formatMessage({ id: 'title.products.productGroups', defaultMessage: 'Product Groups' })}>
        <ProductsPage currentTab={'product-groups'}/>
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))