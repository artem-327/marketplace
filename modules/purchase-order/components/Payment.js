import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Dropdown, GridRow, GridColumn, Divider } from 'semantic-ui-react'
import ShippingAddress from './ShippingAddress'


export default class Payment extends Component {

  render() {
    let { payments, selectedAddress } = this.props

    return (
      <>
        <GridRow>
          <GridColumn computer={8}>
            <Dropdown
              options={payments}
              fluid
              selection
              placeholder={<FormattedMessage id='cart.selectBankAccount' />}
            />
          </GridColumn>
        </GridRow>

        <Divider />

        <ShippingAddress selectedAddress={selectedAddress} addressOnly={true} header={{ id: 'cart.billingInfo', defaultMessage: 'Billing Info' }} />
      </>
    )
  }
}