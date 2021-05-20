import { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Dropdown, Icon } from 'semantic-ui-react'
import { Popup } from 'semantic-ui-react'
// Components
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
// Services
import { getSafe } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
import { getLocaleDateFormat } from '../../../../components/date-format'
// Styles
import { Circle } from '../../styles'
// Constants
import { echoRowActions, productCatalogTableColumns } from './constants'

const ProductCatalogTable = props => {
  const {
    datagrid,
    openEditEchoProduct,
    openEditEchoAltNamesPopup,
    deleteCompanyGenericProduct,
    editEchoProductChangeTab, 
    rows, 
    filterValue, 
    editedId,
    intl: { formatMessage }
  } = props

  const getActions = row => {
    return [
      ...echoRowActions((row, i) => openEditEchoProduct(row.id, i, true)),
      {
        text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }),
        callback: () => openEditEchoAltNamesPopup(row)
      },
      {
        text: formatMessage({
          id: 'admin.deleteCompanyGenericProduct',
          defaultMessage: 'Delete Company Generic Product'
        }),
        disabled: () => props.editedId === row.id,
        callback: () => {
          confirm(
            formatMessage({
              id: 'confirm.deleteCompanyGenericProduct.title',
              defaultMessage: 'Delete Company Generic Product?'
            }),
            formatMessage(
              {
                id: 'confirm.deleteCompanyGenericProduct.content',
                defaultMessage: `Do you really want to delete '${row.name}' company generic product?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteCompanyGenericProduct(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
        }
      }
    ]
  }

  const getRows = rows => {
    return rows.map((row, _i) => {
      return {
        ...row,
        name: (
          <ActionCell
            key={_i}
            row={row}
            getActions={getActions}
            content={row.name}
            onContentClick={() => editEchoProductChangeTab(0, true, { id: row.id })}
            leftContent={
              row.isPublished ? (
                <Popup
                  size='small'
                  header={
                    <FormattedMessage
                      id='global.productOk'
                      defaultMessage='This product is being broadcasted to the marketplace'
                    />
                  }
                  trigger={
                    <div>
                      <Circle />
                    </div>
                  } // <div> has to be there otherwise popup will be not shown
                />
              ) : (
                <Popup
                  size='small'
                  header={
                    <FormattedMessage
                      id='global.notPublished'
                      defaultMessage='This Company Generic Product is not published and will not be shown on the Marketplace'
                    />
                  }
                  trigger={
                    <div>
                      <Circle className='red' />
                    </div>
                  } // <div> has to be there otherwise popup will be not shown
                />
              )
            }
          />
        ),
        sds:
          row.attachments && row.attachments.length ? (
            <Button as='a' onClick={() => downloadAttachment(row.attachments[0].name, row.attachments[0].id)}>
              <Icon name='download' />
              {row.attachments[0].name}
            </Button>
          ) : (
            ''
          ),
        manufacturerName: row.manufacturer ? row.manufacturer.name : '',
        sdsRevisionDate: row.sdsRevisionDate ? moment(row.sdsRevisionDate).format(getLocaleDateFormat()) : '',
        productGroup: getSafe(() => row.productGroup.name, ''),
        company: getSafe(() => row.company.name, '')
      }
    })
  }

  const getMimeType = documentName => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)
    switch (documentExtension) {
      case 'doc':
        return 'application/msword'
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      case 'ppt':
        return 'application/vnd.ms-powerpoint'
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      case 'xls':
        return 'application/vnd.ms-excel'
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      case 'gif':
        return 'image/gif'
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'svg':
        return 'image/svg'
      case 'pdf':
        return 'application/pdf'
      case '7z':
        return 'application/x-7z-compressed'
      case 'zip':
        return 'application/zip'
      case 'tar':
        return 'application/x-tar'
      case 'rar':
        return 'application/x-rar-compressed'
      case 'xml':
        return 'application/xml'
      default:
        return 'text/plain'
    }
  }

  const prepareLinkToAttachment = async (documentName, documentId) => {
    let downloadedFile = await props.downloadAttachment(documentId)
    const mimeType = getMimeType(documentName)

    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    return element
  }

  const viewAttachment = async (documentName, documentId) => {
    const element = await prepareLinkToAttachment(documentName, documentId)

    element.target = '_blank'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const downloadAttachment = async (documentName, documentId) => {
    const element = await prepareLinkToAttachment(documentName, documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <Fragment>
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          tableName='admin_product-catalog'
          {...datagrid.tableProps}
          columns={productCatalogTableColumns}
          filterValue={filterValue}
          loading={datagrid.loading}
          rows={getRows(rows)}
          editingRowId={editedId}
        />
      </div>
    </Fragment>
  )
}

ProductCatalogTable.propTypes = {
  datagrid: PropTypes.object,
  openEditEchoProduct: PropTypes.func,
  openEditEchoAltNamesPopup: PropTypes.func,
  deleteCompanyGenericProduct: PropTypes.func,
  editEchoProductChangeTab: PropTypes.func,
  rows: PropTypes.array,
  filterValue: PropTypes.string,
  editedId: PropTypes.number,
  intl: PropTypes.object
}

ProductCatalogTable.defaultProps = {
  datagrid: {},
  openEditEchoProduct: () => {},
  openEditEchoAltNamesPopup: () => {},
  deleteCompanyGenericProduct: () => {},
  editEchoProductChangeTab: () => {},
  rows: [],
  filterValue: '',
  editedId: null,
  intl: {}
}

export default injectIntl(ProductCatalogTable)
