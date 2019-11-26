import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addPopup, removePopup } from '../../modules/popup'
import DataTable from './DataTable'
import { initDataTable, selectDataTable, selectGroup, selectRow, toggleVisibleColumn } from '../../modules/dataTables'

function mapStateToProps(store, ownProps) {
  return {
    dataTable: store.dataTables[ownProps.id]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { initDataTable, addPopup, removePopup, selectRow, selectGroup, toggleVisibleColumn, selectDataTable },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
