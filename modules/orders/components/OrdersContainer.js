import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'

import Orders from './Orders'
import * as Actions from '../actions'
import { withDatagrid } from '../../datagrid'
import { applyFilter } from '../../filter/actions'
import { downloadAttachment, downloadAttachmentPdf } from '../../inventory/actions'
// Services
import { getRows } from '../services'
// Selectors
import {
  makeGetIsOpen,
  makeGetFilterData,
  makeGetActiveStatus,
  makeGetListDocumentTypes,
  makeGetDocumentTypesFetching,
  makeGetTutorialCompleted,
  makeGetRelatedOrders,
  makeGetLoadRelatedOrders,
  makeGetLoadingRelatedDocuments,
  makeGetIsFetching,
  makeGetTableHandlersFilters
} from '../selectors'

const makeMapStateToProps = () => {
  const getIsOpen = makeGetIsOpen()
  const getFilterData = makeGetFilterData()
  const getActiveStatus = makeGetActiveStatus()
  const getListDocumentTypes = makeGetListDocumentTypes()
  const getDocumentTypesFetching = makeGetDocumentTypesFetching()
  const getTutorialCompleted = makeGetTutorialCompleted()
  const getRelatedOrders = makeGetRelatedOrders()
  const getLoadRelatedOrders = makeGetLoadRelatedOrders()
  const getLoadingRelatedDocuments = makeGetLoadingRelatedDocuments()
  const getIsFetching = makeGetIsFetching()
  const getTableHandlersFilters = makeGetTableHandlersFilters()

  const mapStateToProps = (state, { router, datagrid, currentTab }) => {
    return {
      rows: getRows(datagrid, currentTab),
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
  return bindActionCreators({ ...Actions, downloadAttachment, downloadAttachmentPdf, dispatch, applyFilter }, dispatch)
}

export default withDatagrid(withRouter(connect(makeMapStateToProps, mapDispatchToProps)(Orders)))
