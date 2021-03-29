import { connect } from 'react-redux'
//Actions
import * as Actions from '../../actions'
import { getTemplates, broadcastChange } from '../../../broadcast/actions'

//HOC
import { withDatagrid } from '../../../datagrid'
//Components
import SharedListings from './SharedListings'

//Selectors
import { makeGetDatagridRows, getBroadcastTemplates } from '../../selectors'

const makeMapStateToProps = () => {
  const getRows = makeGetDatagridRows()

  const mapStateToProps = (state, props) => {
    return {
      rows: getRows(props), //Memoized. Recalculate rows only if in prevProps.datagrid.rows !== props.datagrid.rows
      ...state.simpleAdd,
      broadcastTemplates: getBroadcastTemplates(state) //Not memoized.
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  ...Actions,
  getTemplates,
  broadcastChange
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(SharedListings))
