import { connect } from 'react-redux'
// Components
import ShippingQuotesTable from './ShippingQuotesTable'
// Actions
import {
  deleteShippingQuote,
  openPopup,
  generateBOL
} from '../../actions'
import { downloadAttachment } from '../../../inventory/actions'
// Selectors
import { makeGetFilterValue, makeGetLoading } from '../../selectors'
// Services
import { withDatagrid } from '../../../datagrid'
import { getRows } from './ShippingQuotes.services'

const mapDispatchToProps = {
    deleteShippingQuote,
    openPopup,
    downloadAttachment,
    generateBOL
}

const makeMapStateToProps = () => {
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()

    const mapStateToProps = (state, props) => {
        return {
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            rows: getRows(props)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(ShippingQuotesTable))
