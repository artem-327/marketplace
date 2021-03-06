import { connect } from 'react-redux'
// Components
import Operations from './Operations'
// Actions
import * as Actions from '../actions'
// Services
import { withAuth } from '../../../hocs'
// Selectors
import { makeGetAuth, makeGetIsOpenPopup, makeGetIsOpenGenBOLPopup, makeGetOrderDetailData, makeGetCompanyProductUnmappedOnly } from '../selectors'

const makeMapStateToProps = () => {
    const getAuth = makeGetAuth()
    const getIsOpenPopup = makeGetIsOpenPopup()
    const getIsOpenGenBOLPopup = makeGetIsOpenGenBOLPopup()
    const getOrderDetailData = makeGetOrderDetailData()
    const getCompanyProductUnmappedOnly = makeGetCompanyProductUnmappedOnly()

    const mapStateToProps = state => {
        return {
            auth: getAuth(state),
            isOpenPopup: getIsOpenPopup(state),
            isOpenGenBOLPopup: getIsOpenGenBOLPopup(state),
            orderDetailData: getOrderDetailData(state),
            companyProductUnmappedOnly: getCompanyProductUnmappedOnly(state)
        }
    }
    return mapStateToProps
}

export default withAuth(connect(makeMapStateToProps, Actions)(Operations))
