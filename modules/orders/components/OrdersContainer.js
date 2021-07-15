import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'
// Components
import Orders from './Orders'
// Actions
import * as Actions from '../actions'
import { getDocumentTypes } from '../../global-data/actions'
import { applyFilter } from '../../filter/actions'
import { downloadAttachment, downloadAttachmentPdf } from '../../inventory/actions'
// Services
import { withDatagrid } from '../../datagrid'
import { getRowsContainer } from './Orders.service'
// Selectors
import {
  makeGetIsOpen,
  makeGetFilterData,
  makeGetActiveStatus,
  makeGetTutorialCompleted,
  makeGetRelatedOrders,
  makeGetLoadRelatedOrders,
  makeGetLoadingRelatedDocuments,
  makeGetIsFetching,
  makeGetTableHandlersFilters
} from '../selectors'

import {
  makeGetDocumentTypesDropdown,
  makeGetDocumentTypesLoading
} from '../../global-data/selectors'

const makeMapStateToProps = () => {
  const getIsOpen = makeGetIsOpen()
  const getFilterData = makeGetFilterData()
  const getActiveStatus = makeGetActiveStatus()
  const getListDocumentTypes = makeGetDocumentTypesDropdown()
  const getDocumentTypesFetching = makeGetDocumentTypesLoading()
  const getTutorialCompleted = makeGetTutorialCompleted()
  const getRelatedOrders = makeGetRelatedOrders()
  const getLoadRelatedOrders = makeGetLoadRelatedOrders()
  const getLoadingRelatedDocuments = makeGetLoadingRelatedDocuments()
  const getIsFetching = makeGetIsFetching()
  const getTableHandlersFilters = makeGetTableHandlersFilters()

  const mapStateToProps = (state, { router, datagrid, currentTab }) => {
    return {
      rows: getRowsContainer(datagrid, currentTab),
      isOpen: getIsOpen(state),
      filterData: getFilterData(state),
      activeStatus: getActiveStatus(state),
      listDocumentTypes: getListDocumentTypes(state),
      documentTypesFetching: getDocumentTypesFetching(state),
      tutorialCompleted: getTutorialCompleted(state),
      relatedOrders: getRelatedOrders(state),
      loadRelatedOrders: getLoadRelatedOrders(state),
      loadingRelatedDocuments: getLoadingRelatedDocuments(state),
      isFetching: getIsFetching(state),
      tableHandlersFilters: getTableHandlersFilters(state)
    }
  }
  return mapStateToProps
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...Actions,
    downloadAttachment,
    downloadAttachmentPdf,
    dispatch,
    applyFilter,
    getDocumentTypes
  }, dispatch)
}

export default withDatagrid(withRouter(connect(makeMapStateToProps, mapDispatchToProps)(Orders)))
