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

import {
  getShippingQuotes,
  deleteShippingQuote,
  openPopup
  // handleOpenConfirmPopup,
  // closeConfirmPopup,
} from '../../actions'
import Router from 'next/router'

class ShippingQuotesTable extends Component {
  state = {
    columns: [
      {
        name: 'carrierName',
        title: (
          <FormattedMessage id='operations.carrierName' defaultMessage='Carrier Name'>
            {text => text}
          </FormattedMessage>
        )
      },
      /*{
        name: 'createdAt',
        title: (
          <FormattedMessage id='operations.createdAt' defaultMessage='Created At'>
            {text => text}
          </FormattedMessage>
        )
      },*/
      {
        name: 'price',
        title: (
          <FormattedMessage id='operations.price' defaultMessage='Price'>
            {text => text}
          </FormattedMessage>
        )
      },
      {
        name: 'quoteId',
        title: (
          <FormattedMessage id='operations.quoteId' defaultMessage='Quote Id'>
            {text => text}
          </FormattedMessage>
        )
      },
      /*{
        name: 'updatedAt',
        title: (
          <FormattedMessage id='operations.updatedAt' defaultMessage='Updated At'>
            {text => text}
          </FormattedMessage>
        )
      },*/
      {
        name: 'validityDate',
        title: (
          <FormattedMessage id='operations.validityDate' defaultMessage='Validity Date'>
            {text => text}
          </FormattedMessage>
        )
      },
    ]
  }

  render() {
    const {
      datagrid,
      rows,
      filterValue,
      loading,
      openPopup,
      intl,
      deleteShippingQuote
    } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          tableName='operations_shipping_quotes'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
          rowActions={[
            /*{ // temporary? - missing edit endpoint
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: row => openPopup(row.data)
            },*/
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteShippingQuote', defaultMessage: 'Delete Shipping Quote' }),
                  formatMessage(
                    { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.quoteId}?` },
                    { item: row.quoteId }
                  )
                ).then(() => {
                  deleteShippingQuote(row.id)
                })
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getShippingQuotes,
  deleteShippingQuote,
  openPopup
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    filterValue: state.operations.filterValue,
    loading: state.operations.loading,
    rows: datagrid.rows.map(d => {
      return {
        data: d, // all row data, used for edit popup
        id: d.id,
        carrierName: d.carrierName || '',
        price: d.price ? <FormattedNumber style='currency' currency={currency} value={d.price} /> : 'N/A',
        quoteId: d.quoteId || '',
        validityDate: d.validityDate ? moment(d.validityDate).format(getLocaleDateFormat()) : 'N/A',
      }
    }),
    currentTab: getSafe(() => Router.router.query.type)
      ? state.operations.tabsNames.find(tab => tab.type === Router.router.query.type)
      : state.operations.tabsNames[0],
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShippingQuotesTable)))