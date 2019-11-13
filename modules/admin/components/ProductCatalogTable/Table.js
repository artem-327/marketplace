import React, { Component } from 'react'
import { connect } from 'react-redux'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import { downloadAttachment } from '~/modules/inventory/actions'
import { Button, Icon } from 'semantic-ui-react'

import * as Actions from '../../actions'
import moment from "moment/moment"

import { echoRowActions } from './constants'


class ProductCatalogTable extends Component {

  getRows = (rows) => {
    const { intl: { formatMessage } } = this.props
    return rows.map((row) => {
      return {
        ...row,
        sds: row.attachments && row.attachments.length ? (<Button as='a' onClick={() => this.downloadAttachment(row.attachments[0].name, row.attachments[0].id)}><Icon name='download' />{row.attachments[0].name}</Button>) : '',
        manufacturerName: row.manufacturer ? row.manufacturer.name : '',
        sdsRevisionDate: row.sdsRevisionDate ? moment(row.sdsRevisionDate).format(formatMessage({ id: 'date.standardFormat', date: 'MM/DD/YYYY' })) : ''
      }
    })
  }

  getMimeType = (documentName) => {
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
      columns,
      rows,
      intl: { formatMessage },
      openEditEchoProduct,
      openEditEchoAltNamesPopup,
      deleteEchoProduct
    } = this.props

    return (
      <React.Fragment>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='admin_companies'
          columns={columns}
          defaultSorting={{
            columnName: 'name',
            sortPath: 'EchoProduct.name',
            direction: 'DESC'
          }}
          rows={this.getRows(rows)}
          rowActions={[
            ...echoRowActions((row, i) => openEditEchoProduct(row.id, i)),
            { text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }), callback: (row) => openEditEchoAltNamesPopup(row) },
            { text: formatMessage({ id: 'admin.deleteEchoProduct', defaultMessage: 'Delete Echo Product' }), callback: (row) => confirm(
                formatMessage({ id: 'confirm.deleteEchoProduct.title', defaultMessage: 'Delete Echo Product?' }),
                formatMessage({ id: 'confirm.deleteEchoProduct.content', defaultMessage: `Do you really want to delete '${row.name}' echo product?` }, { name: row.name })
              ).then(() => {
                deleteEchoProduct(row.id)
                datagrid.removeRow(row.id)
              })
            },
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ admin }, { datagrid }) => {
  return {
    columns: admin.config[admin.currentTab.name].display.columns,
    productListDataRequest: admin.productListDataRequest,
    filterValue: admin.filterValue,
    currentTab: admin.currentTab,
    rows: datagrid.rows.map(c => ({
      ...c,
    })),
    confirmMessage: admin.confirmMessage,
    deleteRowById: admin.deleteRowById,
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, downloadAttachment })(injectIntl(withToastManager(ProductCatalogTable))))