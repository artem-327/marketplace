import { connect } from 'react-redux'
import * as Actions from '../../actions'
import ReinitiateTransfer from './ReinitiateTransfer'
import {
    makeGetOrderId,
    makeGetBankAccounts,
    makeGetBankAccountsLoading,
    makeGetPaymentProcessor,
    makeGetIsThirdPartyConnectionException
} from '../../selectors'

const makeMapStateToProps = () => {
    const getOrderId = makeGetOrderId()
    const getBankAccounts = makeGetBankAccounts()
    const getBankAccountsLoading = makeGetBankAccountsLoading()
    const getPaymentProcessor = makeGetPaymentProcessor()
    const getIsThirdPartyConnectionException  = makeGetIsThirdPartyConnectionException()

    const mapStateToProps = (state) => {  
        return {
            orderId: getOrderId(state),
            bankAccounts: getBankAccounts(state),
            bankAccountsLoading: getBankAccountsLoading(state),
            paymentProcessor: getPaymentProcessor(state),
            isThirdPartyConnectionException: getIsThirdPartyConnectionException(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, { ...Actions })(ReinitiateTransfer)
