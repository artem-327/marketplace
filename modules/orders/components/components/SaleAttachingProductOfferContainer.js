import { connect } from 'react-redux'
import * as Actions from '../../actions'
import SaleAttachingProductOffer from './SaleAttachingProductOffer'
import { addAttachment } from '../../../inventory/actions'
import { getSafe } from '../../../../utils/functions'
import {
    makeGetOrderId,
    makeGetLoadingGroupedProductOffer,
    makeGetGroupedProductOffers,
    makeGetAvailable,
    makeGetAllocated
} from '../../selectors'

const makeMapStateToProps = () => {
    const getOrderId = makeGetOrderId()
    const getLoadingGroupedProductOffer = makeGetLoadingGroupedProductOffer()
    const getGroupedProductOffers = makeGetGroupedProductOffers()
    const getAvailable = makeGetAvailable()
    const getAllocated = makeGetAllocated()

    const mapStateToProps = (state, { orderItems }) => {  

        const productOffersPkgAmount = new Map()
        const items = getSafe(() => state.orders.detail.orderItems, '')
        if (items.length) {
            items.forEach(item => {
            if (item && item.productOffers && item.productOffers.length) {
                item.productOffers.forEach(offer => {
                productOffersPkgAmount.set(offer.id, offer.pkgAmount)
                })
            }
            })
        }
        
        return {
            orderId: getOrderId(state),
            orderItemsId: orderItems
              .filter(item => {
                if (item.productOffers.some(product => product.virtual)) return item.id
              })
              .map(orderItem => orderItem.id),
            loadingGroupedProductOffer: getLoadingGroupedProductOffer(state),
            groupedProductOffers: getGroupedProductOffers(state),
            available: getAvailable(state),
            allocated: getAllocated(state),
            productOffersPkgAmount
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, { ...Actions, addAttachment })(SaleAttachingProductOffer)
