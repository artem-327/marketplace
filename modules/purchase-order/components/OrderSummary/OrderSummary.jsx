/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import {getSafe} from "~/utils/functions"
import { GridColumn, GridRow, Button } from 'semantic-ui-react'
import { currency } from '~/constants/index'

//Components
//


//Hooks
//import { usePrevious } from '../../../hooks'



//Services
//import ErrorFocus from '../../../components/error-focus'
import {
  GridSummary
} from './OrderSummary.styles'

const OrderSummary = props => {
  const {
    buttonText,
    onButtonClick
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

  console.log('!!!!!!!!!! aaaaa props', props)

  const subTotalPrice = getSafe(() => props.cart.cfPriceSubtotal, '')
  const freightPrice = getSafe(() => props.sectionState.freight.value.estimatedPrice, '')

  return (
    <GridSummary>
      <GridRow>
        <GridColumn>
          <Button
            fluid
            color='blue'
            onClick={() => onButtonClick()}>
            {buttonText}
          </Button>
        </GridColumn>
      </GridRow>
      <GridRow className='bottom-border small-text'>
        <GridColumn>
          links
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