import { connect } from 'react-redux'
// Components
import ShippingQuotesTable from './ShippingQuotesTable'
// Actions
import {
  deleteShippingQuote,
  openPopup
} from '../../actions'
// Selectors
import { makeGetFilterValue, makeGetLoading } from '../../selectors'
// Services
import { withDatagrid } from '../../../datagrid'
import { getRows } from './ShippingQuotes.services'

const mapDispatchToProps = {
    deleteShippingQuote,
    openPopup
}

const makeMapStateToProps = () => {
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            rows: getRows(datagrid)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(ShippingQuotesTable))
