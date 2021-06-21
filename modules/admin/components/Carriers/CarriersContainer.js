import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import Carriers from './Carriers'
import { withDatagrid } from '../../../../modules/datagrid'
import { deleteCarrier, updateCarrier, openPopup } from '../../actions'
import { getRows } from './Carriers.services'
import { makeGetEditId, makeGetFilterValue, makeGetLoading, makeGetUpdating } from '../../selectors'

const makeMapStateToProps = () => {
    const getEditId = makeGetEditId()
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()
    const getUpdating = makeGetUpdating()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            rows: getRows(datagrid),
            editId: getEditId(state),
            filterValue: getFilterValue(state),
            loading: getLoading(state),
            updating: getUpdating(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, { deleteCarrier, updateCarrier, openPopup })(injectIntl(Carriers)))
