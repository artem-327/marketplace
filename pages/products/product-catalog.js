import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import ProductsPage from '~/modules/products'
import { injectIntl } from 'react-intl'

class Index extends Component {
  componentDidMount() {
    if (!this.props.auth?.identity?.isAdmin) this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props
    return (
      <Layout title={formatMessage({ id: 'title.products.SDSCatalog', defaultMessage: 'SDS Catalog' })}>
        {!auth?.identity?.isAdmin
          ? (null)
          : (<ProductsPage currentTab={'product-catalog'} />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Index)))
