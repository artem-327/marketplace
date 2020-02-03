import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Container, Grid, GridRow, Dropdown, GridColumn, Header, Divider, Segment, Button } from 'semantic-ui-react'

import { ShippingQuotes } from '~/modules/shipping'
import SubMenu from '~/src/components/SubMenu'
import { Filter } from '~/modules/filter'
import ProdexGrid from '~/components/table'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import { getSafe } from '~/utils/functions'

const HoldDropdown = styled(Dropdown)`
  z-index: 601 !important;
`
//TODO all id in formattMessage
class Holds extends Component {
  //TODO columns
  state = {
    columns: [
      { name: 'id', title: '', disabled: true },
      {
        name: 'intProductName',
        title: (
          <FormattedMessage id='holds.intProductName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        sortPath: 'Holds.intProductName'
      },
      {
        name: 'pkgsHeld',
        title: (
          <FormattedMessage id='holds.pkgsHeld' defaultMessage='Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 140,
        align: 'right',
        sortPath: 'Holds.pkgsHeld'
      },
      {
        name: 'expirationTime',
        title: (
          <FormattedMessage id='holds.expirationTime' defaultMessage='Expires'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'Holds.expirationTime'
      },
      {
        name: 'holdPricePerUOM',
        title: (
          <FormattedMessage id='holds.holdPricePerUOM' defaultMessage='Price/LB'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'Holds.holdPricePerUOM'
      },
      {
        name: 'holdPriceSubtotal',
        title: (
          <FormattedMessage id='holds.holdPriceSubtotal' defaultMessage='Subtotal'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160,
        align: 'right',
        sortPath: 'Holds.holdPriceSubtotal'
      },
      {
        name: 'status',
        title: (
          <FormattedMessage id='holds.status' defaultMessage='Status'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'Holds.status'
      }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false
  }
  //TODO toastermessage
  handleApprove = async id => {
    try {
      await this.props.approveHold(id)
    } catch (error) {
      console.error(error)
    }
  }
  //TODO toastermessage
  handleReject = async id => {
    try {
      await this.props.rejectHold(id)
    } catch (error) {
      console.error(error)
    }
  }
  //TODO toastermessage
  handleCancel = async id => {
    try {
      await this.props.cancelHold(id)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { rows, datagrid, intl } = this.props
    const { columns } = this.state
    let { formatMessage } = intl
    const approveButton = {
      text: formatMessage({
        id: 'hold.approve',
        defaultMessage: 'Approve'
      }),
      callback: row => this.handleApprove(row.id)
    }
    const buttonCancel = {
      text: formatMessage({
        id: 'hold.cancel',
        defaultMessage: 'Cancel'
      }),
      callback: row => this.handleCancel(row.id)
    }
    const buttonReject = {
      text: formatMessage({
        id: 'hold.reject',
        defaultMessage: 'Reject'
      }),
      callback: row => this.handleReject(row.id)
    }
    let rowActions = []

    //TODO rowActions if isMerchant of Companymanager ??
    if (false) {
      rowActions.push(buttonCancel)
    } else if (true) {
      rowActions.push(approveButton)
      rowActions.push(buttonReject)
    }
    return (
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
          rowActions={rowActions}
        />
      </Container>
    )
  }
}

export default injectIntl(Holds)
