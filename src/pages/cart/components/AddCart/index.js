import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddCart from './AddCart';
import { postNewOrder, postOrderEdit, sidebarChanged } from "../../../../modules/cart"
import { getProductOffer, addCartItem, updateCartItem } from '~/modules/purchase-order/actions'
import { removePopup } from "../../../../modules/popup"
import { getPricing, getLocationString } from '../../../../utils/functions'
import { getSafe } from '~/utils/functions'
import React from 'react'
import { ArrayToMultiple } from '~/components/formatted-messages'

function mapStateToProps(store) {
    let pricing = getPricing(store.cart.offerDetail, store.cart.sidebar.quantity)
    let offer = { ...store.cart.offerDetail, locationStr: store.cart.offerDetail ? getLocationString(store.cart.offerDetail) : '' }
    return { // ! ! fix casProducts
        offer: offer,
        order: store.cart.orderDetail,
        sidebar: { ...store.cart.sidebar, pricing },
        offerDetailIsFetching: store.cart.offerDetailIsFetching,
        orderDetailIsFetching: store.cart.orderDetailIsFetching,
        casProductsChemNames: <ArrayToMultiple values={getSafe(() => offer.product.casProducts, []).map(d => (d.casProduct.chemicalName))} />,
        casProductsCasNumbers: <ArrayToMultiple values={getSafe(() => offer.product.casProducts, []).map(d => (d.casProduct.casNumber))} />,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProductOffer, postOrderEdit, postNewOrder, removePopup, sidebarChanged, updateCartItem, addCartItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
