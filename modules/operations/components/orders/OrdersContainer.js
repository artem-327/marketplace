import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'
// Components
import Orders from './Orders'
// Actions
import * as Actions from '../../actions'
import { applyFilter } from '../../../filter/actions'
import { downloadAttachment, downloadAttachmentPdf } from '../../../inventory/actions'
import { getDocumentTypes } from '../../../global-data/actions'
// Services
import { withDatagrid } from '../../../datagrid'
import { getRows } from './Orders.services'
// Selectors
import {
  makeGetDatagridFilterUpdate, 
  makeGetOrderAccountingDocuments,
  makeGetOrderAccountingDocumentsLoading,
  makeGetIsFetching,
  makeGetOrderProcessing
} from '../../selectors'

import {
  makeGetDocumentTypesDropdown,
  makeGetDocumentTypesLoading
} from '../../../global-data/selectors'

const makeMapStateToProps = () => {
  const getListDocumentTypes = makeGetDocumentTypesDropdown()
  const getDocumentTypesFetching = makeGetDocumentTypesLoading()
  const getDatagridFilterUpdate = makeGetDatagridFilterUpdate()
  const getOrderAccountingDocuments = makeGetOrderAccountingDocuments()
  const getOrderAccountingDocumentsLoading = makeGetOrderAccountingDocumentsLoading()
  const getIsFetching = makeGetIsFetching()
  const getOrderProcessing = makeGetOrderProcessing()

  const mapStateToProps = (state, { router, datagrid }) => {
    return {
      rows: getRows(datagrid),
      listDocumentTypes: getListDocumentTypes(state),
      documentTypesFetching: getDocumentTypesFetching(state),
      datagridFilterUpdate: getDatagridFilterUpdate(state),
      orderAccountingDocuments: getOrderAccountingDocuments(state),
      orderAccountingDocumentsLoading: getOrderAccountingDocumentsLoading(state),
      isFetching: getIsFetching(state),
      orderProcessing: getOrderProcessing(state)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...Actions, downloadAttachment, downloadAttachmentPdf, dispatch, applyFilter, getDocumentTypes }, dispatch)
}

export default withDatagrid(withRouter(connect(makeMapStateToProps, mapDispatchToProps)(Orders)))
