import { connect } from 'react-redux'
// Components
import TagsTable from './TagsTable'
// Actions
import { openPopup, deleteTag } from '../../actions'
// Services
import { withDatagrid } from '../../../datagrid'
// Selectors
import { makeGetFilterValue, makeGetLoading, makeGetRows } from '../../selectors'

const mapDispatchToProps = {
    openPopup,
    deleteTag
}

const makeMapStateToProps = () => {
    const getFilterValue = makeGetFilterValue()
    const getLoading = makeGetLoading()
    const getRows = makeGetRows()

    const mapStateToProps = (state, { datagrid }) => {
        return {
            rows: getRows(datagrid),
            filterValue: getFilterValue(state),
            loading: getLoading(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(TagsTable))
  