import { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { GridRow, GridColumn, Divider } from 'semantic-ui-react'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import ShippingAddress from './ShippingAddress'
import Link from 'next/link'
import styled from 'styled-components'

export default class Payment extends Component {
  render() {
    let { payments, billingInfo, companyName, isThirdPartyConnectionException } = this.props

    return (
      <>
        <GridRow>
          <GridColumn computer={payments && payments.length === 0 ? 16 : 8} tablet={16}>
            {payments.length === 0 && !isThirdPartyConnectionException ? (
              <>
                <FormattedMessage
                  id='payments.notAvailableAddOne'
                  values={{
                    addBankAccount: (
                      <FormattedMessage id='payments.addBankAccount' defaultMessage='Add Bank Account'>
                        {text => (
                          <Link href='/settings/bank-accounts'>
                            <a>{text}</a>
                          </Link>
                        )}
                      </FormattedMessage>
                    )
                  }}
                />
              </>
            ) : payments.length === 0 && isThirdPartyConnectionException ? (
              <FormattedMessage
                id='payments.bankAccountCannnotRetrieved'
                defaultMessage='Bank accounts cannot be retrieved at the moment. Please try again later.'
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
                  placeholder: (
                    <>
                      <FormattedMessage id='cart.selectBankAccount' defaultMessage='Select Bank Account' />
                    </>
                  ),
                  'data-test': 'purchase_order_payment_drpdn'
                }}
              />
            )}
          </GridColumn>
          {payments.length !== 0 && (
            <GridColumn computer={8}>
              <ShippingAddress billingInfo={billingInfo} companyName={companyName} />
            </GridColumn>
          )}
        </GridRow>
      </>
    )
  }
}
