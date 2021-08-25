import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import TablesHandlers from './TablesHandlers'
// Actions
import { openPopup, handleVariableSave } from '../actions'
// Services
import { withDatagrid } from '../../datagrid'
// Selectors
import { makeGetTableHandlersFilters, makeGetCasListDataRequest } from '../selectors'

const makeMapStateToProps = () => {
  const getTableHandlersFilters = makeGetTableHandlersFilters()
  const getCasListDataRequest = makeGetCasListDataRequest()

  const mapStateToProps = state => {
    return {
      tableHandlersFilters: getTableHandlersFilters(state),
      casListDataRequest: getCasListDataRequest(state)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  openPopup,
  handleVariableSave
}

export default withDatagrid(injectIntl(connect(makeMapStateToProps, mapDispatchToProps)(TablesHandlers)))
  