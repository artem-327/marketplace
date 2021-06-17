import { useEffect, useState } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Modal, Container, Button } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import PropTypes from 'prop-types'
// Components
import Spinner from '../../../../components/Spinner/Spinner'
import ProdexGrid from '../../../../components/table'
//Hooks
import { usePrevious } from '../../../../hooks'
// Styles
import { StyledModal } from '../../styles'
// Services
import {
  columns,
  getRowss,
  closePopup,
  getModalAccountingContent,
  getRelatedDocumentsContent
} from './Orders.services'

/**
 * Orders Component
 * @category Operations - Orders
 * @components
 */
const Orders = props => {
  const [state, setState] = useState({
    sorting: {
      sortDirection: '',
      sortPath: ''
    },
    attachmentPopup: { attachment: null, order: { id: null } },
    openModal: false,
    relatedDocumentsDropdown: '',
    documentType: '',
    openUploadLot: false,
    relatedDocumentsTypeDropdown: [],
    documentFiles: [],
    isAddedNewDocument: false,
    isOpenManager: false,
    relatedDocumentType: '',
    row: '',
    isUnlinkDocument: false,
    replaceExisting: false,
    replaceRow: '',
    openRelatedPopup: false,
    relatedPopupType: '',
    relatedAttachments: [],
    expandedRowIds: [],
    filterDocumentType: 0,
    openModalAccounting: false,
    submitting: false
  })

  useEffect(() => {
    const { getDocumentTypes, listDocumentTypes } = props
    if (listDocumentTypes && !listDocumentTypes.length) {
      getDocumentTypes()
    }
  }, [])

  const prevDatagridFilterUpdate = usePrevious(props.datagridFilterUpdate)

  useEffect(() => {
    const { datagridFilter, datagrid } = props

    if (typeof prevDatagridFilterUpdate !== 'undefined') {  // To avoid call on 'componentDidMount'
      datagrid.setFilter(datagridFilter)
    }
  }, [props.datagridFilterUpdate])

  const {
    isFetching,
    datagrid,
    intl: { formatMessage },
    orderProcessing
  } = props

  return (
    <div id='page' className='flex stretched scrolling'>
      {state.openModalAccounting && (
        <StyledModal size='small' closeIcon={false} centered={true} open={true}>
          <Modal.Header>
            <FormattedMessage id='order.related.table' defaultMessage='Related Accounting Documents' />
          </Modal.Header>
          <Modal.Content scrolling>{getModalAccountingContent(props, state)}</Modal.Content>
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
          onClose={() => setState({ ...state, openRelatedPopup: false })}
          centered={true}
          open={true}>
          <Modal.Header>
            <FormattedMessage id='order.relatedDocuments' defaultMessage='RELATED DOCUMENTS' />
          </Modal.Header>
          <Modal.Content scrolling>{getRelatedDocumentsContent(props, state, setState)}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => closePopup(props, state, setState)}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      <Container fluid className='flex stretched'>
        {isFetching ? (
          <Spinner />
        ) : (
          <div className='flex stretched tree-wrapper'>
            <ProdexGrid
              tableName='operations_orders_grid'
              columns={columns}
              {...datagrid.tableProps}
              loading={datagrid.loading || orderProcessing}
              rows={getRowss(props, state, setState)}
              treeDataType={true}
              tableTreeColumn={'orderId'}
              getChildRows={(row, rootRows) => {
                return row ? row.orderItems : rootRows
              }}
              onRowClick={(_, row) => {
                if (row.root && row.orderItems.length) {
                  let ids = state.expandedRowIds.slice()
                  if (ids.includes(row.id)) {
                    //ids.filter(id => id === row.id)
                    setState({ ...state, expandedRowIds: ids.filter(id => id !== row.id) })
                  } else {
                    ids.push(row.id)
                    setState({ ...state, expandedRowIds: ids })
                  }
                }
              }}
              expandedRowIds={state.expandedRowIds}
              onExpandedRowIdsChange={expandedRowIds => setState({ ...state, expandedRowIds })}
              rowChildActions={[]}
            />
          </div>
        )}
      </Container>
    </div>
  )
}

Orders.propTypes = {
  datagrid: PropTypes.object,
  intl: PropTypes.object,
  datagridFilterUpdate: PropTypes.bool,
  isFetching: PropTypes.bool,
  orderProcessing: PropTypes.bool,
  orderAccountingDocumentsLoading: PropTypes.bool,
  documentTypesFetching: PropTypes.bool,
  rows: PropTypes.array,
  listDocumentTypes: PropTypes.array,
  orderAccountingDocuments: PropTypes.array, 
  router: PropTypes.any,
  getAccountingDocuments: PropTypes.func,
  downloadAttachmentPdf: PropTypes.func,
  downloadAttachment: PropTypes.func,
  clearAccountingDocuments: PropTypes.func,
  cancelOrder: PropTypes.func,
  getDocumentTypes: PropTypes.func, 
  openOrderDetail: PropTypes.func
}

Orders.defaultValues = {
  datagrid: {},
  intl: {},
  datagridFilterUpdate: false,
  isFetching: false,
  orderProcessing: false,
  orderAccountingDocumentsLoading: false,
  documentTypesFetching: false,
  rows: [],
  listDocumentTypes: [],
  orderAccountingDocuments: [], 
  router: null,
  getAccountingDocuments: () => {},
  downloadAttachmentPdf: () => {},
  downloadAttachment: () => {},
  clearAccountingDocuments: () => {},
  cancelOrder: () => {},
  getDocumentTypes: () => {}, 
  openOrderDetail: () => {}  
}

export default injectIntl(withToastManager(Orders))
