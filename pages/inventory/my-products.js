import { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import MyProducts from '~/modules/inventory/my-products'
import { injectIntl } from 'react-intl'

class MyProductsPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.inventory.myProducts', defaultMessage: 'My Products' })}>
        <MyProducts />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MyProductsPage))
