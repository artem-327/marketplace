import { connect } from 'react-redux'
import CasProductsTable from './CasProductsTable'
import {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  deleteCasProduct
} from '../../actions'
import { getHazardClasses, getPackagingGroups } from '../../../global-data/actions'
import { withDatagrid } from '../../../datagrid'
import {
  makeGetEditedId,
  makeGetCasRows,
  makeGetHazardClasses,
  makeGetHazardClassesLoading,
  makeGetPackagingGroups,
  makeGetPackagingGroupsLoading
} from '../../selectors'

const mapDispatchToProps = {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClasses,
  getPackagingGroups,
  deleteCasProduct  
}

const makeMapStateToProps = () => {
  const getEditedId = makeGetEditedId()
  const getCasRows = makeGetCasRows()
  const getHazardClasses = makeGetHazardClasses()
  const getHazardClassesLoading = makeGetHazardClassesLoading()
  const getPackagingGroups = makeGetPackagingGroups()
  const getPackagingGroupsLoading = makeGetPackagingGroupsLoading()

  const mapStateToProps = (state, { datagrid }) => {
    return {
      editedId: getEditedId(state),
      rows: getCasRows(datagrid),
      hazardClasses: getHazardClasses(state),
      hazardClassesLoading: getHazardClassesLoading(state),
      packagingGroups: getPackagingGroups(state),
      packagingGroupsLoading: getPackagingGroupsLoading(state)
    }
  }
  return mapStateToProps
}


export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(CasProductsTable))