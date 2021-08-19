import { Component } from 'react'
import securePage from '../hocs/securePage'
import Router from 'next/router'
import { connect } from 'react-redux'
import { getIdentity } from '~/modules/auth/actions'
import { getSafe } from '~/utils/functions'

class Index extends Component {
  async componentDidMount() {
    const { identity } = this.props
    const {
      roles,
      isAdmin,
      isOrderOperator,
      isOrderProcessing,
      isOrderView,
      isCompanyAdmin,
      isMerchant,
      isProductCatalogAdmin,
      isProductOfferManager,
      isUserAdmin
    } = identity

    let urlPage = '/dashboard'

    if (!isAdmin) await this.props.getIdentity()

    if (
      identity &&
      identity.isCompanyAdmin &&
      identity.company &&
      !identity.company.reviewRequested &&
      !identity.lastLoginAt
    ) {
      urlPage = '/settings/company-details'
    }
    if (isAdmin) urlPage = '/dashboard'
    if (identity && identity.roles.find(role => role.role === 'OPERATOR')) {
      urlPage = '/operations/shipping-quotes'
    }
    if (isOrderOperator) {
      urlPage = '/operations/orders'
    }
    if (
      identity &&
      !isCompanyAdmin &&
      !isMerchant &&
      !isProductCatalogAdmin &&
      !isProductOfferManager &&
      !isUserAdmin &&
      (isOrderProcessing || isOrderView)
    ) {
      urlPage = '/orders/sales'
    }

    Router.push(urlPage)
  }
  render() {
    return null
  }
}

export default connect(store => ({ identity: getSafe(() => store.auth.identity, {}) }), { getIdentity })(
  securePage(Index)
)
