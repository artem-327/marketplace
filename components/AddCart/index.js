import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddCart from './AddCart'
import { sidebarChanged } from '~/modules/purchase-order/actions'
import { getProductOffer, addCartItem, updateCartItem } from '~/modules/purchase-order/actions'
import { getPricing, getLocationString } from '~/utils/functions'

import { createHold } from '~/modules/marketplace/actions'

function mapStateToProps(store) {
  let pricing = getPricing(store.cart.offerDetail, store.cart.sidebar.pkgAmount)
  let offer = {
    ...store.cart.offerDetail,
    locationStr: store.cart.offerDetail ? getLocationString(store.cart.offerDetail) : ''
  }

  return {
    offer: offer,
    order: store.cart.orderDetail,
    sidebar: { ...store.cart.sidebar, pricing },
    offerDetailIsFetching: store.cart.offerDetailIsFetching,
    orderDetailIsFetching: store.cart.orderDetailIsFetching
    // ! ! osetrit 'proprietary'
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProductOffer,
      sidebarChanged,
      updateCartItem,
      addCartItem,
      createHold
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart)
