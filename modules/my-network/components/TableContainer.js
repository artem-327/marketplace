import { connect } from 'react-redux'
//Components
import Table from './Table'
//HOC
import { withDatagrid } from '../../datagrid'
//Services
import { getStatuses, getRowDetail } from '../MyNetwork.services'
//Actions
import { buttonActionsDetailRow, connectionsStatuses, getConnection, showBluePallet, hideBluePallet } from '../actions'
import { getCompanyLogo } from '../../company-form/actions'

//Constants
import { mockRows } from '../constants'

const mapDispatchToProps = {
  buttonActionsDetailRow,
  connectionsStatuses,
  getCompanyLogo,
  getConnection,
  showBluePallet
}

const mapStateToProps = ({ myNetwork }, { datagrid }) => {
  const { rows } = datagrid

  return {
    datagrid,
    loadingDatagrid: datagrid.loading || myNetwork.loading,
    statuses: getStatuses(mockRows),
    rows: rows?.length ? rows.map(row => getRowDetail(row, myNetwork?.detailRow)) : [],
    inviteDetailCompany: getRowDetail(myNetwork?.companyNetworkConnection),
    loadingDetailRow: myNetwork?.loadingDetailRow
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(Table))
