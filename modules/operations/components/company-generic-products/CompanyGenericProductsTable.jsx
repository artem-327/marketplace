import { Fragment, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Components
import ProdexGrid from '../../../../components/table'
// Styles
import { StyledModal } from '../../styles'
// Services
import { 
  columns,
  getRowss,
  closePopup,
  getAttachmentsContent
} from './CompanyGenericProductsTable.services'

const CompanyGenericProductsTable = props => {
  const [state, setState] = useState({
    openAttachmentsPopup: false,
    attachments: [],
    openModalAccounting: false
  })

  const { datagrid, filterValue, loading } = props

  return (
    <Fragment>
      {state.openAttachmentsPopup && (
        <StyledModal size='small' closeIcon={false} onClose={() => closePopup(state, setState)} centered={true} open={true}>
          <Modal.Header style={{ textTransform: 'uppercase' }}>
            <FormattedMessage id='operations.attachedDocuments' defaultMessage='Attached Documents' />
          </Modal.Header>
          <Modal.Content scrolling>{getAttachmentsContent(props, state)}</Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => closePopup(state, setState)}>
              <FormattedMessage id='global.close' defaultMessage='Close' />
            </Button>
          </Modal.Actions>
        </StyledModal>
      )}
      <div className='flex stretched listings-wrapper'>
        <ProdexGrid
          tableName='operations_company_generic_products_create_request'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={getRowss(props, state, setState)}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
        />
      </div>
    </Fragment>
  )
}

CompanyGenericProductsTable.propTypes = {
  datagrid: PropTypes.object, 
  intl: PropTypes.object,
  loading: PropTypes.bool,
  filterValue: PropTypes.string, 
  rows: PropTypes.array,
  markRequestAsProcessed: PropTypes.func,
  denyRequest: PropTypes.func,
  deleteRequest: PropTypes.func,
  downloadAttachmentPdf: PropTypes.func,
  downloadAttachment: PropTypes.func
}

CompanyGenericProductsTable.defaultValues = {
  datagrid: {}, 
  intl: {},
  loading: false,
  filterValue: '', 
  rows: [],
  markRequestAsProcessed: () => {},
  denyRequest: () => {},
  deleteRequest: () => {},
  downloadAttachmentPdf: () => {},
  downloadAttachment: () => {}
}

export default injectIntl(CompanyGenericProductsTable)
