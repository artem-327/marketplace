import { connect } from 'react-redux'
//Components
import Table from './Table'
//HOC
import { withDatagrid } from '../../datagrid'
//Actions
import { buttonActionsDetailRow, connectionsStatuses, getConnection, showBluePallet, hideBluePallet } from '../actions'
import { getCompanyLogo } from '../../company-form/actions'
//Selectors
import {
  makeGetLoadingMyNetwork,
  makeGetModifiedRowsMyNetwork,
  makeGetInviteDetailCompanyMyNetwork,
  makeGetLoadingDetailRowMyNetwork
} from '../selectors'
import { makeGetQueryDatagrid, makeGetLoadingDatagrid, makeGetRowsDatagrid } from '../../datagrid/selectors'

const makeMapStateToProps = () => {
  const getQueryDatagrid = makeGetQueryDatagrid()
  const getLoadingDatagrid = makeGetLoadingDatagrid()
  const getRowsDatagrid = makeGetRowsDatagrid()

  const getLoadingMyNetwork = makeGetLoadingMyNetwork()
  const getModifiedRowsMyNetwork = makeGetModifiedRowsMyNetwork()
  const getInviteDetailCompanyMyNetwork = makeGetInviteDetailCompanyMyNetwork()
  const getLoadingDetailRowMyNetwork = makeGetLoadingDetailRowMyNetwork()

  const mapStateToProps = (state, props) => {
    const rows = getRowsDatagrid(props)
    const modifiedRows = getModifiedRowsMyNetwork(state, rows)

    return {
      rows: modifiedRows,
      query: getQueryDatagrid(props),
      loadingDatagrid: getLoadingDatagrid(props) || getLoadingMyNetwork(state),
      inviteDetailCompany: getInviteDetailCompanyMyNetwork(state),
      loadingDetailRow: getLoadingDetailRowMyNetwork(state),
      isCompanyAdmin: state.auth.identity ? state.auth.identity.isCompanyAdmin : false
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  buttonActionsDetailRow,
  connectionsStatuses,
  getCompanyLogo,
  getConnection,
  showBluePallet
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(Table))
