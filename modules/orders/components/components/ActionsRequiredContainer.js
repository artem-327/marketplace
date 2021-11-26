import { connect } from 'react-redux'
import * as Actions from '../../actions'
import ActionsRequired from './ActionsRequired'
import {
    makeGetOrderStatus,
    makeGetShippingStatus,
    makeGetReviewStatus,
    makeGetCreditReviewStatus,
    makeGetDisputeResolutionStatus,
    makeGetReturnStatus,
    makeGetIsSending,
    makeGetDetail,
    makeGetShippingTrackingCode,
    makeGetReturnShippingTrackingCode,
    makeGetOrderCreditHistoryOpen,
    makeGetOpenedPopup,
    makeGetActionNeeded,
    makeGetSellEligible
} from '../../selectors'
import { makeGetIsCompanyAdmin } from '../../../auth/selectors'

const makeMapStateToProps = () => {
    const getOrderStatus = makeGetOrderStatus()
    const getShippingStatus = makeGetShippingStatus()
    const getReviewStatus = makeGetReviewStatus()
    const getCreditReviewStatus = makeGetCreditReviewStatus()
    const getDisputeResolutionStatus = makeGetDisputeResolutionStatus()
    const getReturnStatus = makeGetReturnStatus()
    const getIsSending = makeGetIsSending()
    const getDetail = makeGetDetail()
    const getShippingTrackingCode = makeGetShippingTrackingCode()
    const getReturnShippingTrackingCode = makeGetReturnShippingTrackingCode()
    const getOrderCreditHistoryOpen = makeGetOrderCreditHistoryOpen()
    const getOpenedPopup = makeGetOpenedPopup()
    const getActionNeeded = makeGetActionNeeded()
    const getSellEligible = makeGetSellEligible()
    const getIsCompanyAdmin = makeGetIsCompanyAdmin()

    const mapStateToProps = (state, ownProps) => {
        return {
            order: ownProps.order,
            ordersType: ownProps.ordersType,
            orderStatus: getOrderStatus(state),
            shippingStatus: getShippingStatus(state),
            reviewStatus: getReviewStatus(state),
            creditReviewStatus: getCreditReviewStatus(state),
            disputeResolutionStatus: getDisputeResolutionStatus(state),
            returnStatus: getReturnStatus(state),
            assignLotsRequired: false, 
            isSending: getIsSending(state),
            detail: getDetail(state),
            shippingTrackingCode: getShippingTrackingCode(state),
            returnShippingTrackingCode: getReturnShippingTrackingCode(state),
            orderCreditHistoryOpen: getOrderCreditHistoryOpen(state),
            openedPopup: getOpenedPopup(state),
            actionNeeded: getActionNeeded(state),
            sellEligible: getSellEligible(state),
            isCompanyAdmin: getIsCompanyAdmin(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, { ...Actions })(ActionsRequired)