import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { GridRow, GridColumn, Divider } from 'semantic-ui-react'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import ShippingAddress from './ShippingAddress'
import Link from 'next/link'
import styled from 'styled-components'


export default class Payment extends Component {
  render() {
    let { payments, billingInfo, companyName } = this.props
    let columns = payments.length === 0 ? { computer: 16 } : { computer: 8 }

    return (
      <>
        <GridRow>
          <GridColumn {...columns} tablet={16}>
            {payments.length === 0 ? (
              <FormattedMessage
                id='payments.notAvailableAddOne'
                values={{
                  addBankAccount: (
                    <FormattedMessage id='payments.addBankAccount'>
                      {text => <Link href='/settings?type=bank-accounts'>{text}</Link>}
                    </FormattedMessage>
                  )
                }}
              />
            ) : (
                <Dropdown
                  options={payments.map(payment => ({
                    key: payment.id,
                    value: payment.id,
                    text: payment.name
                  }))}
                  fluid
                  selection
                  name='payment'
                  inputProps={{
                    placeholder: <FormattedMessage id='cart.selectBankAccount' />,
                    'data-test': 'purchase_order_payment_drpdn'
                  }}
                />
              )}
          </GridColumn>
          {payments.length &&
            <GridColumn computer={8}>
              <ShippingAddress billingInfo={billingInfo} companyName={companyName} />
            </GridColumn>
          }
        </GridRow>
      </>
    )
  }
}
