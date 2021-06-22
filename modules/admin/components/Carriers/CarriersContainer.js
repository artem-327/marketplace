import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import Carriers from './Carriers'
// Services
import { withDatagrid } from '../../../../modules/datagrid'
import { makeRows } from './Carriers.services'
// Actions
import { deleteCarrier, updateCarrier, openPopup } from '../../actions'
// Selectors
import { makeGetEditId, makeGetFilterValue, makeGetLoading, makeGetUpdating } from '../../selectors'

const makeMapStateToProps = () => {
    const getEditId = makeGetEditId()
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()
    const getUpdating = makeGetUpdating()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            rows: makeRows(datagrid),
            editId: getEditId(state),
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            updating: getUpdating(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, { deleteCarrier, updateCarrier, openPopup })(injectIntl(Carriers)))
