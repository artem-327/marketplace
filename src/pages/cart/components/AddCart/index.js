import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddCart from './AddCart';
import { postNewOrder, postOrderEdit, sidebarChanged } from "../../../../modules/cart"
import { getProductOffer, addCartItem, updateCartItem } from '~/modules/purchase-order/actions'
import { removePopup } from "../../../../modules/popup"
import { getPricing, getLocationString } from '../../../../utils/functions'
import { getSafe } from '~/utils/functions'
import React from 'react'
import { Label, Popup, List } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

const arrayToMultiple = (obj, field )=> {
    if (!obj || obj.length === 0) return <div>-</div>
    if (obj.length > 1) {
      let onMouseoverText = obj.map(d => (d.casProduct[field]))
      return (
        <div>
          <Popup
            data-test='add_cart_product_info_onMouseoverText'
            content={<List items={onMouseoverText} />}
            trigger={<Label><FormattedMessage id='global.multiple' defaultMessage='Multiple' /></Label>}
          />
        </div>
      )
    }
    else {
      return <div> {obj[0].casProduct[field]} </div>
    }
}


function mapStateToProps(store) {
    let pricing = getPricing(store.cart.offerDetail, store.cart.sidebar.quantity)
    let offer = { ...store.cart.offerDetail, locationStr: store.cart.offerDetail ? getLocationString(store.cart.offerDetail) : '' }
    return {
        offer: offer,
        order: store.cart.orderDetail,
        sidebar: { ...store.cart.sidebar, pricing },
        offerDetailIsFetching: store.cart.offerDetailIsFetching,
        orderDetailIsFetching: store.cart.orderDetailIsFetching,
        casProductsChemNames: arrayToMultiple(getSafe(() => offer.product.casProducts, null), 'chemicalName'),
        casProductsCasNumbers: arrayToMultiple(getSafe(() => offer.product.casProducts, null), 'casNumber'),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProductOffer, postOrderEdit, postNewOrder, removePopup, sidebarChanged, updateCartItem, addCartItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
