import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProdexGrid from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import { getLocaleDateFormat } from '~/components/date-format'
import moment from 'moment/moment'

import * as Actions from '../../actions'

class CompanyGenericProductsTable extends Component {
  state = {
    columns: [
      {
        name: 'productName',
        title: (
          <FormattedMessage id='global.productName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'CompanyGenericProductRequest.productName'
      },
      {
        name: 'notes',
        title: (
          <FormattedMessage id='global.notes' defaultMessage='Notes'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250,
        //sortPath: 'CompanyProduct.intProductCode'
      },
      {
        name: 'processed',
        title: (
          <FormattedMessage id='global.processed' defaultMessage='Processed'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
        align: 'center',
        sortPath: 'CompanyGenericProductRequest.processed'
      },
      {
        name: 'processedAt',
        title: (
          <FormattedMessage id='operations.processedAt' defaultMessage='Processed At'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'CompanyGenericProductRequest.processedDate'
      },
      {
        name: 'requestedAt',
        title: (
          <FormattedMessage id='operations.requestedAt' defaultMessage='Requested At'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150,
        sortPath: 'CompanyGenericProductRequest.createdAt'
      },
      {
        name: 'requestedByName',
        title: (
          <FormattedMessage id='operations.requestedByName' defaultMessage='Requested by Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250,
        sortPath: 'CompanyGenericProductRequest.requestedBy.name'
      },
      {
        name: 'requestedByCompany',
        title: (
          <FormattedMessage id='operations.requestedByCompany' defaultMessage='Requested by Company'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250,
        sortPath: 'CompanyGenericProductRequest.requestedBy.homeBranch.company.cfDisplayName'
      }
    ]
  }

  markRequestAsProcessed = async (row) => {
    const { markRequestAsProcessed, datagrid } = this.props
    try {
      const { value } = await markRequestAsProcessed(row.id)
      datagrid.updateRow(row.id, () => value)
    } catch (err) {
      console.error(err)
    }
  }

  denyRequest = async (row) => {
    const { denyRequest, datagrid } = this.props
    try {
      await denyRequest(row.id)
      datagrid.removeRow(row.id)
    } catch (err) {
      console.error(err)
    }
  }

  deleteRequest = async (row) => {
    const { deleteRequest, datagrid } = this.props
    try {
      await deleteRequest(row.id)
      datagrid.removeRow(row.id)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {
      datagrid,
      rows,
      filterValue,
      loading,
      intl
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          tableName='operations_company_generic_products_create_request'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            {
              text:
                formatMessage({ id: 'operations.markRequestAsProcessed', defaultMessage: 'Mark Request as Processed' }),
              callback: row => this.markRequestAsProcessed(row),
              hidden: row => row.rawData.processed
            },
            {
              text: formatMessage({ id: 'operations.denyRequest', defaultMessage: 'Deny Request' }),
              callback: row => {
                confirm(
                  formatMessage({
                    id: 'confirm.operations.denyRequest.title',
                    defaultMessage: 'Deny Create Request?'
                  }),
                  formatMessage(
                    {
                      id: 'confirm.operations.denyRequest.content',
                      defaultMessage: `Do you really want to deny '${row.rawData.productName}' create request?`
                    },
                    { name: row.rawData.productName }
                  )
                ).then(() => {
                  this.denyRequest(row)
                })
              },
              hidden: row => row.rawData.processed
            },
            {
              text: formatMessage({ id: 'operations.deleteRequest', defaultMessage: 'Delete Request' }),
              callback: row => {
                confirm(
                  formatMessage({
                    id: 'confirm.operations.deleteRequest.title',
                    defaultMessage: 'Delete Create Request?'
                  }),
                  formatMessage(
                    {
                      id: 'confirm.operations.deleteRequest.content',
                      defaultMessage: `Do you really want to delete '${row.rawData.productName}' create request?`
                    },
                    { name: row.rawData.productName }
                  )
                ).then(() => {
                  this.deleteRequest(row)
                })
              },
              hidden: row => !row.rawData.processed
            },
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    filterValue: state.operations.filterValue,
    loading: state.operations.loading,
    rows: datagrid.rows.map(d => {
      return {
        id: d.id,
        rawData: d,
        productName: <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {d.productName}
        </div>,
        notes: <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {d.notes}
        </div>,
        processed: d.processed ? (
          <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
          <FormattedMessage id='global.no' defaultMessage='No' />
        ),
        processedAt: d.processedAt && moment(d.processedAt).format(getLocaleDateFormat()),
        requestedAt: d.requestedAt && moment(d.requestedAt).format(getLocaleDateFormat()),
        requestedByName: getSafe(() => d.requestedBy.name, 'N/A'),
        requestedByCompany: getSafe(() => d.requestedBy.company.cfDisplayName, 'N/A')
      }
    }),
    currentTab: state.operations.currentTab
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(CompanyGenericProductsTable)))
