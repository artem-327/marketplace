import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Container, Grid, Dropdown, Label } from 'semantic-ui-react'
import { withRouter } from 'next/router'
import Router from 'next/router'

import ProdexGrid from '~/components/table'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import { Datagrid } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import Tutorial from '~/modules/tutorial'

const HoldDropdown = styled(Dropdown)`
  z-index: 601 !important;
`
class Holds extends Component {
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
        sortPath: 'InventoryHold.productOffer.companyProduct.intProductName'
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
        sortPath: 'InventoryHold.pkgsHeld'
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
        sortPath: 'InventoryHold.expirationTime'
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
        sortPath: 'InventoryHold.holdPricePerUOM'
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
        sortPath: 'InventoryHold.holdPriceSubtotal'
      },
      {
        name: 'status',
        title: (
          <FormattedMessage id='holds.status' defaultMessage='Status'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'InventoryHold.status'
      }
    ],
    selectedRows: [],
    //pageNumber: 0,
    open: false,
    holdDropdown: 'My Holds'
  }
  handleApprove = async id => {
    try {
      const response = await this.props.approveHold(id)
      const newRow = response && response.value && response.value.data ? response.value.data : null
      if (newRow) {
        Datagrid.updateRow(id, () => ({
          ...newRow,
          status: 'ON_HOLD'
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }
  handleReject = async id => {
    try {
      const response = await this.props.rejectHold(id)
      const newRow = response && response.value && response.value.data ? response.value.data : null
      if (newRow) {
        Datagrid.updateRow(id, () => ({
          ...newRow,
          status: 'REJECTED'
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }
  handleCancel = async id => {
    try {
      const response = await this.props.cancelHold(id)
      const newRow = response && response.value && response.value.data ? response.value.data : null
      if (newRow) {
        Datagrid.updateRow(id, () => ({
          ...newRow,
          status: 'CANCELLED'
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }
  handleBuy = async id => {
    try {
      await this.props.toCartHold(id)
      Router.push('/cart')
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { rows, datagrid, intl, isMerchant, isCompanyAdmin, isProductOfferManager, tutorialCompleted } = this.props
    const { columns } = this.state
    let { formatMessage } = intl
    const buttonApprove = {
      text: formatMessage({
        id: 'hold.approve',
        defaultMessage: 'Approve'
      }),
      callback: row => this.handleApprove(row.id),
      disabled: row => getSafe(() => row.status.props.children, false) && row.status.props.children !== 'Pending'
    }
    const buttonCancel = {
      text: formatMessage({
        id: 'hold.cancel',
        defaultMessage: 'Cancel'
      }),
      disabled: row =>
        (getSafe(() => row.status.props.children, false) && row.status.props.children === 'Rejected') ||
        row.status.props.children === 'Expired' ||
        row.status.props.children === 'Cancelled',
      callback: row => this.handleCancel(row.id)
    }
    const buttonReject = {
      text: formatMessage({
        id: 'hold.reject',
        defaultMessage: 'Reject'
      }),
      callback: row => this.handleReject(row.id),
      disabled: row => getSafe(() => row.status.props.children, false) && row.status.props.children !== 'Pending'
    }
    const buttonBuy = {
      text: formatMessage({
        id: 'hold.buy',
        defaultMessage: 'Buy'
      }),
      callback: row => this.handleBuy(row.id),
      disabled: row => getSafe(() => row.status.props.children, false) && row.status.props.children !== 'Approved'
    }
    let rowActions = []

    if (isMerchant && this.state.holdDropdown === 'My Holds') {
      rowActions.push(buttonCancel)
      rowActions.push(buttonBuy)
    } else if ((isCompanyAdmin || isProductOfferManager) && this.state.holdDropdown === 'Requsted Holds') {
      rowActions.push(buttonApprove)
      rowActions.push(buttonReject)
    }
    return (
      <Container fluid style={{ padding: '10px 0' }} className='flex stretched'>
        {!tutorialCompleted && <Tutorial marginHolds />}
        <Grid>
          <Grid.Column>
            <HoldDropdown
              options={[
                {
                  key: 1,
                  value: 'My Holds',
                  text: 'My Holds'
                },
                {
                  key: 2,
                  value: 'Requsted Holds',
                  text: 'Requsted Holds'
                }
              ]}
              value={this.state.holdDropdown}
              selection
              onChange={(event, { name, value }) => {
                if (value === 'My Holds') {
                  Datagrid.setApiConfig({ url: '/prodex/api/holds/my/datagrid/' })
                } else if (value === 'Requsted Holds') {
                  Datagrid.setApiConfig({ url: '/prodex/api/holds/foreign/datagrid/' })
                }
                this.setState({ [name]: value })
              }}
              name='holdDropdown'
              placeholder={formatMessage({ id: 'hold.selectHolds', defaultMessage: 'Select Holds' })}
            />
          </Grid.Column>
        </Grid>
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

export default withRouter(injectIntl(Holds))
