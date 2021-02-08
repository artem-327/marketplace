import { Component } from 'react'
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
      <Layout title={formatMessage({ id: 'title.products.casProducts', defaultMessage: 'CAS Products' })}>
        <ProductsPage currentTab={'cas-products'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
