import React, { Component } from 'react'
import { connect } from 'react-redux'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import { getSafe } from '~/utils/functions'
import { downloadAttachment } from '~/modules/inventory/actions'
import { Button, Icon } from 'semantic-ui-react'

import * as Actions from '../../actions'
import moment from 'moment/moment'
import { getLocaleDateFormat } from '~/components/date-format'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import { echoRowActions } from './constants'
import { FileText } from 'react-feather'
import styled from 'styled-components'
import { Popup } from 'semantic-ui-react'

const UnpublishedIcon = styled(FileText)`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #f16844;
  line-height: 20px;

  &.grey {
    color: #848893;
  }
`

class ProductCatalogTable extends Component {
  state = {
    columns: [
      {
        name: 'notPublishedStatus',
        title: <UnpublishedIcon className='grey' />,
        width: 40,
        align: 'center'
      },
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.productName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'EchoProduct.name'
      },
      {
        name: 'code',
        title: (
          <FormattedMessage id='global.productCode' defaultMessage='Product Code'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'EchoProduct.code'
      },
      {
        name: 'manufacturerName',
        title: (
          <FormattedMessage id='admin.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'EchoProduct.manufacturer.name'
      },
      {
        name: 'sds',
        title: (
          <FormattedMessage id='admin.echoProducts.sds' defaultMessage='SDS'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'sdsVersionNumber',
        title: (
          <FormattedMessage id='admin.echoProducts.sdsVersion' defaultMessage='SDS Version'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'EchoProduct.sdsVersionNumber'
      },
      {
        name: 'sdsRevisionDate',
        title: (
          <FormattedMessage id='admin.echoProducts.sdsRevisionDate' defaultMessage='SDS Revision Date'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'EchoProduct.sdsRevisionDate'
      },
      {
        name: 'tagsFormatted',
        title: (
          <FormattedMessage id='global.tags' defaultMessage='Tags'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      }
    ]
  }

  getRows = rows => {
    const {
      intl: { formatMessage }
    } = this.props
    return rows.map(row => {

      return {
        ...row,
        notPublishedStatus: !row.isPublished
          ? (
            <Popup
              size='small'
              header={
                <FormattedMessage
                  id='global.notPublished'
                  defaultMessage='This echo product is not published and will not show on the Marketplace.'
                />}
              trigger={
                <div>
                  <UnpublishedIcon />
                </div>
              } // <div> has to be there otherwise popup will be not shown
            />
          )
          : null
        ,
        sds:
          row.attachments && row.attachments.length ? (
            <Button as='a' onClick={() => this.downloadAttachment(row.attachments[0].name, row.attachments[0].id)}>
              <Icon name='download' />
              {row.attachments[0].name}
            </Button>
          ) : (
            ''
          ),
        manufacturerName: row.manufacturer ? row.manufacturer.name : '',
        sdsRevisionDate: row.sdsRevisionDate ? moment(row.sdsRevisionDate).format(getLocaleDateFormat()) : '',
        tagsFormatted:
          <ArrayToFirstItem
            values={row.tags ? row.tags.map(d => d.name ? d.name : d) : ''}
            rowItems={2}
          />
      }
    })
  }

  getMimeType = documentName => {
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

  prepareLinkToAttachment = async (documentName, documentId) => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const mimeType = this.getMimeType(documentName)

    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    return element
  }

  viewAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentName, documentId)

    element.target = '_blank'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentName, documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  render() {
    const {
      datagrid,
      rows,
      intl: { formatMessage },
      openEditEchoProduct,
      openEditEchoAltNamesPopup,
      deleteEchoProduct,
      editedId,
      filterValue,
    } = this.props

    let { columns } = this.state

    return (
      <React.Fragment>
        <ProdexTable
          tableName='admin_product-catalog'
          {...datagrid.tableProps}
          columns={columns}
          filterValue={filterValue}
          loading={datagrid.loading}
          rows={this.getRows(rows)}
          rowActions={[
            ...echoRowActions((row, i) => openEditEchoProduct(row.id, i, true)),
            {
              text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }),
              callback: row => openEditEchoAltNamesPopup(row)
            },
            {
              text: formatMessage({ id: 'admin.deleteEchoProduct', defaultMessage: 'Delete Echo Product' }),
              disabled: row => editedId === row.id,
              callback: row => {
                confirm(
                  formatMessage({ id: 'confirm.deleteEchoProduct.title', defaultMessage: 'Delete Echo Product?' }),
                  formatMessage(
                    {
                      id: 'confirm.deleteEchoProduct.content',
                      defaultMessage: `Do you really want to delete '${row.name}' echo product?`
                    },
                    { name: row.name }
                  )
                ).then(() => {
                  deleteEchoProduct(row.id)
                  datagrid.removeRow(row.id)
                })
              }
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ admin }, { datagrid }) => {
  const editedId =
    admin.currentTab.name === 'Product Catalog' &&
    (!!admin.currentAddForm || !!admin.currentEditForm) &&
    admin.popupValues
      ? admin.popupValues.id
      : -1

  return {
    editedId,
    productListDataRequest: admin.productListDataRequest,
    filterValue: admin.filterValue,
    currentTab: admin.currentTab,
    rows: datagrid.rows.map(c => ({
      ...c
    })),
    confirmMessage: admin.confirmMessage,
    deleteRowById: admin.deleteRowById
  }
}

export default withDatagrid(
  connect(mapStateToProps, { ...Actions, downloadAttachment })(injectIntl(ProductCatalogTable))
)
