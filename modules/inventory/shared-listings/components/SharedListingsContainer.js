import { connect } from 'react-redux'
// Components
import SharedListings from './SharedListings'
// Actions
import * as Actions from '../../actions'
import { getTemplates, broadcastChange } from '../../../broadcast/actions'
import { openBroadcast } from '../../../broadcast/actions'
// Services
import { getMappedRows } from './SharedListings.services'
// HOC
import { withDatagrid } from '../../../datagrid'
// Selectors
import { makeGetBroadcastTemplates } from '../../selectors'
import {SETTINGS} from "../../../auth/constants";

const makeMapStateToProps = () => {
  const getBroadcastTemplates = makeGetBroadcastTemplates()

  const mapStateToProps = (state, {datagrid}) => {
    const defaultMarkup = state?.auth?.identity?.settings?.find(s => s.key === SETTINGS.COMPANY_SHARED_LISTING_DEFAULT_MARKUP)
    return {
      rows: getMappedRows(datagrid), //Memoized. Recalculate rows only if in prevProps.datagrid.rows !== props.datagrid.rows
      ...state.simpleAdd,
      broadcastTemplates: getBroadcastTemplates(state), //Not memoized.
      settings: state?.auth?.identity?.settings,
      companyType: state?.auth?.identity?.company?.type,
      defaultMarkup: defaultMarkup && defaultMarkup.value !== 'EMPTY_STRING' ? defaultMarkup.value : '0'
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  ...Actions,
  getTemplates,
  broadcastChange,
  openBroadcast
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(SharedListings))
