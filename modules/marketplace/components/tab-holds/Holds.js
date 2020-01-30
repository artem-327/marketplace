import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Container, Grid, GridRow, Dropdown, GridColumn, Header, Divider, Segment, Button } from 'semantic-ui-react'

import { ShippingQuotes } from '~/modules/shipping'
import SubMenu from '~/src/components/SubMenu'
import { Filter } from '~/modules/filter'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'

const HoldDropdown = styled(Dropdown)`
  z-index: 601 !important;
`
//TODO all id in formattMessage
class Holds extends Component {
  //TODO columns
  state = {
    columns: [
      { name: 'id', disabled: true },
      {
        name: '',
        title: '',
        width: 20
      },
      {
        name: 'productName',
        title: (
          <FormattedMessage id='order.productName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 140,
        align: 'right',
        sortPath: 'ProductOffer.quantity'
      },
      {
        name: 'expires',
        title: (
          <FormattedMessage id='hold.expires' defaultMessage='Expires'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'Hold.expires'
      },
      {
        name: 'pricelb',
        title: (
          <FormattedMessage id='hold.pricelb' defaultMessage='Price/LB'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'ProductOffer.cfPricePerUOM'
      },
      {
        name: 'subtotal',
        title: (
          <FormattedMessage id='hold.subtotal' defaultMessage='Subtotal'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'Hold.subtotal'
      },
      {
        name: 'status',
        title: (
          <FormattedMessage id='hold.status' defaultMessage='Status'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Hold.status'
      }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false
  }
  //TODO
  handleApprove = id => {
    this.props.approveHold()
  }
  //TODO
  handleReject = id => {
    this.props.rejectHold(id)
  }

  render() {
    const { rows, datagrid, intl } = this.props
    const { columns } = this.state
    let { formatMessage } = intl
    return (
      <>
        <Container fluid style={{ padding: '0 32px' }}>
          <HoldDropdown
            options={[
              {
                key: 1,
                value: 'My holds',
                text: 'My holds'
              },
              {
                key: 2,
                value: 'Your holds',
                text: 'Your holds'
              },
              {
                key: 3,
                value: 'His holds',
                text: 'His holds'
              }
            ]}
            clearable
            selection
            search
            name='holdDropdown'
            placeholder={formatMessage({ id: 'hold.selectHolds', defaultMessage: 'Select Holds' })}
          />
          <ProdexGrid
            groupActions={row => {
              let values = row.key.split('_')
              return groupActionsMarketplace(rows, values[values.length - 1], openPopup).map(a => ({
                ...a,
                text: <FormattedMessage {...a.text}>{text => text}</FormattedMessage>
              }))
            }}
            tableName='hold_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            rowSelection
            showSelectionColumn
            onSelectionChange={selectedRows => this.setState({ selectedRows })}
            getChildGroups={rows =>
              _(rows)
                .groupBy('productName')
                .map(v => ({
                  key: `${v[0].productName}_${v.length}_${v[0].id}`,
                  childRows: v
                }))
                .value()
            }
            data-test='hold_row_action'
            rowActions={[
              {
                text: formatMessage({
                  id: 'hold.approve',
                  defaultMessage: 'Approve'
                }),
                callback: row => this.handleApprove(row.id)
              },
              {
                text: formatMessage({
                  id: 'hold.reject',
                  defaultMessage: 'Reject'
                }),
                callback: row => this.handleReject(row.id)
              }
            ]}
          />
        </Container>
      </>
    )
  }
}

export default injectIntl(Holds)
