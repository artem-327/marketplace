import React, { Component } from 'react'
import { connect } from 'react-redux'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { getSafe } from '~/utils/functions'
import { downloadAttachment } from '~/modules/inventory/actions'
import {Button, Icon} from 'semantic-ui-react'

import * as Actions from '../../actions'
import moment from 'moment/moment'
import { getLocaleDateFormat } from '~/components/date-format'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import { echoRowActions } from './constants'
import styled from 'styled-components'
import { Popup } from 'semantic-ui-react'

const Circle = styled.div`
  width: 14px;
  height: 14px;
  margin: 3px;
  border-radius: 7px;
  background-color: #84c225;
  &.red {
    background-color: #f16844;
  }
`

class ProductCatalogTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fixed: [
        {
          name: 'name',
          position: 0
        }
      ],
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.productName' defaultMessage='Product Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 250,
          sortPath: 'CompanyGenericProduct.name',
          allowReordering: false
        },
        {
          name: 'code',
          title: (
            <FormattedMessage id='global.productCode' defaultMessage='Product Code'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProduct.code'
        },
        {
          name: 'manufacturerName',
          title: (
            <FormattedMessage id='admin.manufacturer' defaultMessage='Manufacturer'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProduct.manufacturer.name'
        },
        {
          name: 'sds',
          title: (
            <FormattedMessage id='admin.companyGenericProduct.sds' defaultMessage='SDS'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150
        },
        {
          name: 'sdsVersionNumber',
          title: (
            <FormattedMessage id='admin.companyGenericProduct.sdsVersion' defaultMessage='SDS Version'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProduct.sdsVersionNumber'
        },
        {
          name: 'sdsRevisionDate',
          title: (
            <FormattedMessage id='admin.companyGenericProduct.sdsRevisionDate' defaultMessage='SDS Revision Date'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProduct.sdsRevisionDate'
        },
        {
          name: 'productGroup',
          title: (
            <FormattedMessage id='global.productGroup' defaultMessage='Product Group'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProduct.productGroup.name'
        },
        {
          name: 'company',
          title: (
            <FormattedMessage id='global.company' defaultMessage='Company'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyGenericProduct.company.name'
        }
      ]
    }
  }

  getActions = (row) => {
    const {
      datagrid,
      intl: { formatMessage },
      openEditEchoProduct,
      openEditEchoAltNamesPopup,
      deleteCompanyGenericProduct
    } = this.props

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
        disabled: () => this.props.editedId === row.id,
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

  getRows = rows => {
    const {
      editEchoProductChangeTab,
      intl: { formatMessage }
    } = this.props
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={this.getActions}
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
            <Button as='a' onClick={() => this.downloadAttachment(row.attachments[0].name, row.attachments[0].id)}>
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
    const { datagrid, rows, filterValue, editedId } = this.props

    let { columns, fixed } = this.state

    return (
      <React.Fragment>
        <div className='flex stretched listings-wrapper'>
          <ProdexTable
            tableName='admin_product-catalog'
            {...datagrid.tableProps}
            columns={columns}
            fixed={fixed}
            filterValue={filterValue}
            loading={datagrid.loading}
            rows={this.getRows(rows)}
            editingRowId={editedId}
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ admin, productsAdmin }, { datagrid }) => {
  const editedId =
    (!!productsAdmin.currentAddForm || !!productsAdmin.currentEditForm) &&
    productsAdmin.popupValues
      ? productsAdmin.popupValues.id
      : -1

  return {
    editedId,
    filterValue: productsAdmin.filterValue,
    rows: datagrid.rows.map(c => ({
      ...c,
      company: getSafe(() => c.company, [])
    }))
  }
}

export default withDatagrid(
  connect(mapStateToProps, { ...Actions, downloadAttachment })(injectIntl(ProductCatalogTable))
)
