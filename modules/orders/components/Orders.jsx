import { useEffect, useState } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Modal, Container, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Components
import Spinner from '../../../components/Spinner/Spinner'
import ProdexGrid from '../../../components/table'
import { AttachmentManager } from '../../../modules/attachments'
import Tutorial from '../../../modules/tutorial/Tutorial'
import TablesHandlers from './TablesHandlers'
// Styles
import { StyledModal } from './Orders.styles'
// Services
import {
  getColumns,
  getRows,
  getContent,
  getRelatedDocumentsContent,
  closePopup,
  attachDocumentsManager,
  getRowDetail
} from './Orders.service'


const Orders = props => {

  const [state, setState] = useState({
    sorting: {
      sortDirection: '',
      sortPath: ''
    },
    openModal: false,
    documentType: '',
    openUploadAttachment: false,
    relatedDocumentsTypeDropdown: [],
    documentFiles: [],
    isAddedNewDocument: false,
    isOpenManager: false,
    relatedDocumentType: [],
    row: '',
    isUnlinkDocument: false,
    replaceExisting: false,
    replaceRow: '',
    openModalAccounting: false,
    openRelatedPopup: false,
    relatedPopupParams: {},
    expandedRowIds: [],
    filterDocumentType: 0
  })

  useEffect(() => {
    const { getDocumentTypes, listDocumentTypes } = props
    if (listDocumentTypes && !listDocumentTypes.length) {
      getDocumentTypes()
    }
  }, [])

  const { isFetching, currentTab, datagrid, tableHandlersFilters, saveFilters } = props

  const { relatedPopupParams } = state

  return (
    <div id='page' className='flex stretched scrolling'>
      {state.openModalAccounting && (
        <StyledModal size='small' closeIcon={false} centered={true} open={true}>
          <Modal.Header>
            <FormattedMessage id='order.related.table' defaultMessage='Related Accounting Documents' />
          </Modal.Header>
          <Modal.Content scrolling>{getContent(props, state)}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => closePopup(props, state, setState)}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}

      {state.openRelatedPopup && (
        <StyledModal
          size='small'
          closeIcon={false}
          onClose={() => {
            setState({
              ...state,
              openRelatedPopup: false,
              isAddedNewDocument: false,
              isUnlinkDocument: false,
              isOpenManager: false
            })
          }}
          centered={true}
          open={true}>
          <Modal.Header>{relatedPopupParams.header}</Modal.Header>
          <Modal.Content scrolling>{getRelatedDocumentsContent(props, state, setState)}</Modal.Content>
          <Modal.Actions>
            <Button
              basic
              onClick={() => {
                setState({
                  ...state,
                  openRelatedPopup: false,
                  isAddedNewDocument: false,
                  isUnlinkDocument: false,
                  isOpenManager: false
                })
                closePopup(props, state, setState)
              }}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}

      {!state.openRelatedPopup && state.isOpenManager && (
        <AttachmentManager
          documentTypeIds={state.relatedDocumentType}
          isOpenManager={state.isOpenManager}
          asModal
          singleSelection={true}
          lockedFileTypes={true}
          returnSelectedRows={rows => attachDocumentsManager(rows, props, state, setState)}
          returnCloseAttachmentManager={val =>
            setState({
              ...state,
              isOpenManager: false,
              relatedDocumentType: []
            })
          }
        />
      )}

      {<Tutorial marginOrders isTutorial={false} isBusinessVerification={true} />}
      <Container fluid style={{ padding: '20px 30px 10px 30px' }}>
        <TablesHandlers currentTab={currentTab} tableHandlersFilters={tableHandlersFilters} saveFilters={saveFilters} datagrid={datagrid}/>
      </Container>
      <Container fluid style={{ padding: '10px 30px' }} className='flex stretched'>
        {isFetching ? (
          <Spinner />
        ) : (
          <div className='flex stretched table-detail-rows-wrapper'>
            <ProdexGrid
              tableName={`orders_grid_${currentTab}`}
              columns={getColumns()}
              {...datagrid.tableProps}
              loading={datagrid.loading}
              rows={getRows(props, state, setState)}
              rowDetailType={true}
              rowDetail={getRowDetail}
              onRowClick={(_, row) => {
                if (row.root && row.orderItems.length) {
                  let ids = state.expandedRowIds.slice()
                  if (ids.includes(row.id)) {
                    setState({ ...state, expandedRowIds: ids.filter(id => id !== row.id) })
                  } else {
                    ids.push(row.id)
                    setState({ ...state, expandedRowIds: ids })
                  }
                }
              }}
              expandedRowIds={state.expandedRowIds}
              onExpandedRowIdsChange={expandedRowIds => setState({ ...state, expandedRowIds })}
              defaultSorting={{ columnName: 'orderId', sortPath: 'Order.id', direction: 'desc' }}
              estimatedRowHeight={1000}
            />
          </div>
        )}
      </Container>
    </div>
  )
}

Orders.propTypes = {
  tableHandlersFilters: PropTypes.object,
  rows: PropTypes.object,
  intl: PropTypes.object,
  datagrid: PropTypes.object,
  getDocumentTypes: PropTypes.func,
  saveFilters: PropTypes.func,
  getRelatedOrders: PropTypes.func,
  downloadAttachmentPdf: PropTypes.func,
  downloadAttachment: PropTypes.func,
  clearRelatedOrders: PropTypes.func, 
  unlinkAttachmentToOrder: PropTypes.func,
  removeLinkAttachmentToOrderItem: PropTypes.func,
  linkAttachmentToOrder: PropTypes.func,
  linkAttachmentToOrderItem: PropTypes.func,
  currentTab: PropTypes.string,
  relatedOrders: PropTypes.array,
  router: PropTypes.array,
  listDocumentTypes: PropTypes.array,
  loadRelatedOrders: PropTypes.bool,
  documentTypesFetching: PropTypes.bool,
  isFetching: PropTypes.bool,
  loadingRelatedDocuments: PropTypes.bool
}

Orders.defaultValues = {
  tableHandlersFilters: {},
  rows: {},
  intl: {},
  datagrid: {},
  getDocumentTypes: () => {},
  saveFilters: () => {},
  getRelatedOrders: () => {},
  downloadAttachmentPdf: () => {},
  downloadAttachment: () => {},
  clearRelatedOrders: () => {}, 
  unlinkAttachmentToOrder: () => {},
  removeLinkAttachmentToOrderItem: () => {},
  linkAttachmentToOrder: () => {},
  linkAttachmentToOrderItem: () => {},
  currentTab: '',
  relatedOrders: [],
  router: [],
  listDocumentTypes: [],
  loadRelatedOrders: false,
  documentTypesFetching: false,
  isFetching: false,
  loadingRelatedDocuments: false
}

export default injectIntl(Orders)
