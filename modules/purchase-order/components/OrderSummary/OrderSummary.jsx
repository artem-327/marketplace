/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import {getSafe} from "~/utils/functions"
import { GridColumn, GridRow, Button } from 'semantic-ui-react'

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

  return (
    <GridSummary>
      <GridRow>
        <GridColumn>
          <Button
            fluid
            onClick={() => onButtonClick()}>
            {buttonText}
          </Button>
        </GridColumn>
      </GridRow>
      <GridRow className='bottom-border small-text'>
        <GridColumn>
          nejeke kecy
        </GridColumn>
      </GridRow>

      <GridRow className='bottom-border'>
        <GridColumn className='summary'>
          Order Summary nadp.
        </GridColumn>
      </GridRow>

      <GridRow className='less-padding'>
        <GridColumn width={8} className='description'>
          sub total
        </GridColumn>
        <GridColumn width={8} className='right'>
          cena
        </GridColumn>
      </GridRow>
      <GridRow className='less-padding'>
        <GridColumn width={8} className='description'>
          freight
        </GridColumn>
        <GridColumn width={8} className='right'>
          cena
        </GridColumn>
      </GridRow>
      <GridRow className='bottom-border'>
        <GridColumn width={8} className='description'>
          estimated
        </GridColumn>
        <GridColumn width={8} className='right'>
          cena
        </GridColumn>
      </GridRow>

      <GridRow className='total'>
        <GridColumn width={8} className='total'>
          Order total
        </GridColumn>
        <GridColumn width={8} className='right bold'>
          cena
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