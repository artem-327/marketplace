import { connect } from 'react-redux'
import Operations from './Operations'
import * as Actions from '../actions'
import { withAuth } from '../../../hocs'
import { makeGetAuth, makeGetIsOpenPopup, makeGetOrderDetailData, makeGetCompanyProductUnmappedOnly } from '../selectors'

const makeMapStateToProps = () => {
    const getAuth = makeGetAuth()
    const getIsOpenPopup = makeGetIsOpenPopup()
    const getOrderDetailData = makeGetOrderDetailData()
    const getCompanyProductUnmappedOnly = makeGetCompanyProductUnmappedOnly()

    const mapStateToProps = state => {
        return {
            auth: getAuth(state),
            isOpenPopup: getIsOpenPopup(state),
            orderDetailData: getOrderDetailData(state),
            companyProductUnmappedOnly: getCompanyProductUnmappedOnly(state)
        }
    }
    return mapStateToProps
}

export default withAuth(connect(makeMapStateToProps, Actions)(Operations))
