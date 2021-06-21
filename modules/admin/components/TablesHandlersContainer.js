
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import TablesHandlers from './TablesHandlers'
import { openPopup, handleFiltersValue, handleVariableSave } from '../actions'
import { withDatagrid } from '../../datagrid'
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
  handleFiltersValue,
  handleVariableSave
}

export default withDatagrid(injectIntl(connect(makeMapStateToProps, mapDispatchToProps)(TablesHandlers)))
  