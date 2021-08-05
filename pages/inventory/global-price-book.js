import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import GlobalPriceBook from '~/modules/inventory/global-price-book'
import { injectIntl } from 'react-intl'

class GlobalPriceBookPage extends Component {
  componentDidMount() {
    if (!this.props.auth?.identity?.isCompanyAdmin) this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.inventory.globalPriceBook', defaultMessage: 'Global Price Book' })}>
        {!auth?.identity?.isCompanyAdmin
          ? (null)
          : (<GlobalPriceBook />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(GlobalPriceBookPage)))
