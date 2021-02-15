/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import {getSafe} from "~/utils/functions"
import { GridColumn, GridRow, Button } from 'semantic-ui-react'
import { currency } from '~/constants/index'

//Components

//Hooks
//import { usePrevious } from '../../../hooks'

//Services
import { GridSummary, LinkLabel } from './OrderSummary.styles'

const OrderSummary = props => {
  const {
    buttonText,
    onButtonClick,
    allAccepted,
    submitButtonDisabled
  } = props

  const priceComponent = val => (
    val
      ? (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={val}
        />
      ) : '-'
  )

  const subTotalPrice = getSafe(() => props.cart.cfPriceSubtotal, '')
  const freightPrice = getSafe(() => props.sectionState.freight.value.estimatedPrice, '')

  return (
    <GridSummary>
      <GridRow>
        <GridColumn>
          <Button
            fluid
            color='blue'
            disabled={submitButtonDisabled}
            onClick={() => onButtonClick()}>
            {buttonText}
          </Button>
        </GridColumn>
      </GridRow>
      <GridRow className='bottom-border small-text'>
        <GridColumn>
          {allAccepted
            ? (
              <FormattedMessage
                id='checkout.summary.byPlacingYourOrder'
                defaultMessage='By placing your order, you agree to Echosystem’s Privacy Policy and Conditions of use}.'
                values={{
                  privacyPolicy: (
                    <LinkLabel  href='https://www.google.com/search?q=PrivacyPolicy' target='_blank'>
                      <FormattedMessage
                        id='checkout.summary.privacyPolicy'
                        defaultMessage='Privacy Policy'
                      />
                    </LinkLabel>
                  ),
                  conditionsOfUse: (
                    <LinkLabel  href='https://www.google.com/search?q=ConditionsOfUse' target='_blank'>
                      <FormattedMessage
                        id='checkout.summary.conditionsOfUse'
                        defaultMessage='Conditions Of Use'
                      />
                    </LinkLabel>
                  ),
                }}
              />
            ) : (
              <FormattedMessage
                id='checkout.summary.continueToFinish'
                defaultMessage='Continue to step 4 to finish checking out.'
                values={{ value: (<b><FormattedMessage id='checkout.summary.step4' defaultMessage='step 4' /></b>) }}
              />
            )
          }
        </GridColumn>
      </GridRow>
      <GridRow className='bottom-border'>
        <GridColumn className='summary'>
          <FormattedMessage id='checkout.summary.orderSummary' defaultMessage='Order Summary' />
        </GridColumn>
      </GridRow>
      <GridRow className='less-padding'>
        <GridColumn width={8} className='description'>
          <FormattedMessage id='checkout.summary.subTotal' defaultMessage='Sub Total' />
        </GridColumn>
        <GridColumn width={8} className='right'>
          {priceComponent(subTotalPrice)}
        </GridColumn>
      </GridRow>
      <GridRow className='less-padding'>
        <GridColumn width={8} className='description'>
          <FormattedMessage id='checkout.summary.freightCost' defaultMessage='Freight Cost' />
        </GridColumn>
        <GridColumn width={8} className='right'>
          {priceComponent(freightPrice)}
        </GridColumn>
      </GridRow>
      <GridRow className='bottom-border'>
        <GridColumn width={8} className='description'>
          <FormattedMessage id='checkout.summary.estimatedTax' defaultMessage='Estimated Tax' />
        </GridColumn>
        <GridColumn width={8} className='right'>
          -
        </GridColumn>
      </GridRow>
      <GridRow className='total'>
        <GridColumn width={8} className='total'>
          <FormattedMessage id='checkout.summary.orderTotal' defaultMessage='Order Total' />
        </GridColumn>
        <GridColumn width={8} className='right bold'>
          {priceComponent(freightPrice ? freightPrice + subTotalPrice : '')}
        </GridColumn>
      </GridRow>
    </GridSummary>
  )
}

OrderSummary.propTypes = {
  buttonText: PropTypes.any,
  onButtonClick: PropTypes.func
}

OrderSummary.defaultProps = {
  buttonText: 'Missing buttonText value!',
  onButtonClick: () => {}
}

export default injectIntl(OrderSummary)