import { connect } from 'react-redux'
// Components
import ShippingQuotesPopup from './ShippingQuotesPopup'
// Services
import { withDatagrid } from '../../../datagrid'
// Actions
import { closePopup, createShippingQuote, searchManualQuoteRequest } from '../../actions'
// Selectors
import { makeGetSearchedManQuotRequests, makeGetSearchedManQuotRequestsLoading, makeGetPopupValues } from '../../selectors'

const mapDispatchToProps = {
    closePopup,
    createShippingQuote,
    searchManualQuoteRequest
}

const makeMapStateToProps = () => {
    const getSearchedManQuotRequests = makeGetSearchedManQuotRequests()
    const getSearchedManQuotRequestsLoading = makeGetSearchedManQuotRequestsLoading()
    const getPopupValues = makeGetPopupValues()

    const mapStateToProps = state => {
        return {
            searchedManQuotRequests: getSearchedManQuotRequests(state),
            searchedManQuotRequestsLoading: getSearchedManQuotRequestsLoading(state),
            popupValues: getPopupValues(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(ShippingQuotesPopup))
