import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddCart from './AddCart';
import { getProductOffer, postNewOrder, postOrderEdit, getOrderDetail, sidebarChanged } from "../../../../modules/cart";
import { removePopup } from "../../../../modules/popup"
import { getPricing } from '../../../../utils/functions'


function mapStateToProps(store) {
    let pricing = null, { offerDetail } = store.cart
    
    if (offerDetail.pricing) {
        let tiers = offerDetail.pricing.tiers.length > 0 ? offerDetail.pricing.tiers : offerDetail.pricing.price.amount
        if (tiers instanceof Array) {
            pricing = getPricing(tiers, store.cart.sidebar.quantity)
            try {
                delete pricing.id
            } catch (ignored) { }
        } else {
            pricing = { quantityFrom: 0, price: tiers }
        }

    }
    return {
        offer: store.cart.offerDetail,
        order: store.cart.orderDetail,
        sidebar: { ...store.cart.sidebar, pricing },
        offerDetailIsFetching: store.cart.offerDetailIsFetching,
        orderDetailIsFetching: store.cart.orderDetailIsFetching
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProductOffer, getOrderDetail, postOrderEdit, postNewOrder, removePopup, sidebarChanged }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
