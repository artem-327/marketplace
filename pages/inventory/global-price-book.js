import { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import GlobalPriceBook from '~/modules/inventory/global-price-book'
import { injectIntl } from 'react-intl'

class GlobalPriceBookPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.inventory.globalPriceBook', defaultMessage: 'Global Price Book' })}>
        <GlobalPriceBook />
      </Layout>
    )
  }
}

export default securePage(injectIntl(GlobalPriceBookPage))
