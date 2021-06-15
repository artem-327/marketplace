import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import ShippingQuotesTable from './ShippingQuotesTable'
import {
  deleteShippingQuote,
  openPopup
} from '../../actions'
import { makeGetFilterValue, makeGetLoading } from '../../selectors'
import { getRows } from './ShippingQuotesTable.services'

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
