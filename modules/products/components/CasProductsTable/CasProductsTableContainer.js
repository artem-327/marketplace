import { connect } from 'react-redux'
import CasProductsTable from './CasProductsTable'
import {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
} from '../../actions'
import { withDatagrid } from '../../../datagrid'
import { makeGetEditedId, makeGetCasRows } from '../../selectors'

const mapDispatchToProps = {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct  
}

const makeMapStateToProps = () => {
  const getEditedId = makeGetEditedId()
  const getCasRows = makeGetCasRows()

  const mapStateToProps = (state, { datagrid }) => {
    return {
      editedId: getEditedId(state),
      rows: getCasRows(datagrid)
    }
  }
  return mapStateToProps
}


export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(CasProductsTable))