import { connect } from 'react-redux'
//Components
import Table from './Table'
//HOC
import { withDatagrid } from '../../datagrid'
//Services
import { getStatuses, getRowDetail } from '../MyNetwork.services'
//Actions
import { buttonActionsDetailRow, connectionsStatuses } from '../actions'
import { getCompanyLogo } from '../../company-form/actions'

//Constants
import { mockRows } from '../constants'

const mapDispatchToProps = {
  buttonActionsDetailRow,
  connectionsStatuses,
  getCompanyLogo
}

const mapStateToProps = ({ myNetwork }, { datagrid }) => {
  const { rows } = datagrid

  return {
    datagrid,
    loadingDatagrid: datagrid.loading,
    statuses: getStatuses(mockRows),
    rows: rows?.length ? rows.map(row => getRowDetail(row)) : [],
    inviteDetailCompany: getRowDetail(myNetwork?.companyNetworkConnection)
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(Table))
