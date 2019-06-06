import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Dropdown, GridRow, GridColumn, Divider } from 'semantic-ui-react'
import ShippingAddress from './ShippingAddress'
import Link from 'next/link'

export default class Payment extends Component {

  render() {
    let { payments, selectedAddress } = this.props
    let columns = payments.length === 0
      ? { computer: 16 }
      : { computer: 8 }
    return (
      <>
        <GridRow>
          <GridColumn {...columns}>
            {
              payments.length === 0
                ? <FormattedMessage
                  id='payments.notAvailableAddOne'
                  values={{
                    addBankAccount: <FormattedMessage id='payments.addBankAccount'>
                      {(text) => (
                        <Link href='/settings?type=bank-accounts'>{text}</Link>
                      )}
                    </FormattedMessage>
                  }} />
                : <Dropdown
                  options={payments}
                  fluid
                  selection
                  placeholder={<FormattedMessage id='cart.selectBankAccount' />}
                />
            }

          </GridColumn>
        </GridRow>

        <Divider />

        <ShippingAddress selectedAddress={selectedAddress} addressOnly={true} header={{ id: 'cart.billingInfo', defaultMessage: 'Billing Info' }} />
      </>
    )
  }
}