import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'
import Orders from './Orders'
import * as Actions from '../../actions'
import { withDatagrid } from '../../../datagrid'
import { applyFilter } from '../../../filter/actions'
import { downloadAttachment, downloadAttachmentPdf } from '../../../inventory/actions'
import { getRows } from './Orders.services'
import { 
  makeGetListDocumentTypes, 
  makeGetDocumentTypesFetching, 
  makeGetDatagridFilterUpdate, 
  makeGetOrderAccountingDocuments,
  makeGetOrderAccountingDocumentsLoading,
  makeGetIsFetching,
  makeGetOrderProcessing
} from '../../selectors'

const makeMapStateToProps = () => {
  const getListDocumentTypes = makeGetListDocumentTypes()
  const getDocumentTypesFetching = makeGetDocumentTypesFetching()
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
  return bindActionCreators({ ...Actions, downloadAttachment, downloadAttachmentPdf, dispatch, applyFilter }, dispatch)
}

export default withDatagrid(withRouter(connect(makeMapStateToProps, mapDispatchToProps)(Orders)))
