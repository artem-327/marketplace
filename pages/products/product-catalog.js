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
      <Layout title={formatMessage({ id: 'title.products.productCatalog', defaultMessage: 'Product Catalog' })}>
        <ProductsPage currentTab={'product-catalog'}/>
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))