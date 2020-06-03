import { connect } from 'react-redux'
import ExportInventorySidebar from './ExportInventorySidebar'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'

const mapStateToProps = (store, { datagrid }) => {
  return {
    ...store.exportInventory,
    rows: datagrid.rows.map(row => {
      return {
        id: row.id,
        root: true,
        treeRoot: true,
        name: row.cfDisplayName,
        branches: row.branches.map(branch => ({
          id: row.id + '_' + branch.id,
          branchId: branch.id,
          name: branch.deliveryAddress.cfName,
        })),
        branchesIds: row.branches.map(b => b.id)
      }
    }),
    searchedCompanies: store.exportInventory.searchedCompanies.map(d => ({
      key: d.id,
      value: d.id,
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    }))
  }
}

export default withDatagrid(
  connect(mapStateToProps, { ...Actions })(ExportInventorySidebar))