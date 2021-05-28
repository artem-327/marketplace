/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { GridColumn, GridRow, Button, Popup } from 'semantic-ui-react'
import { currency } from '~/constants/index'

//Components
import BasicButton from '../../../../components/buttons/BasicButton'

//Hooks
//import { usePrevious } from '../../../hooks'

//Services
import { GridSummary, LinkLabel } from './OrderSummary.styles'
//Constants
import { URL_TERMS, URL_PRIVACY } from '../../../../constants'
/**
 * @category Purchase Order - Checkout
 * @component
 */
const OrderSummary = props => {
  const {
    buttonText,
    onButtonClick,
    allAccepted,
    submitButtonDisabled,
    loading,
    subTotalPrice,
    isNotHazardousPermissions,
    applicationName
  } = props

  const priceComponent = val =>
    val || val === 0 ? (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={val}
      />
    ) : (
      '-'
    )

  const freightPrice = getSafe(() => props.sectionState.freight.value.cfEstimatedSubtotal, '')

  return (
    <GridSummary>
      <Popup
        trigger={
          <GridRow>
            <GridColumn>
              <BasicButton
                fluid
                loading={loading}
                background='#00c7f9 !important'
                textcolor='#FFF !important'
                margin='0px !important'
                disabled={submitButtonDisabled}
                onClick={() => onButtonClick()}>
                {buttonText}
              </BasicButton>
            </GridColumn>
          </GridRow>
        }
        content={
          <div>
            <FormattedMessage
              id='cart.purchaseOrder.purchaseHazmatEligible'
              defaultMessage='You are not authorized to purchase this hazardous item.'
            />
          </div>
        }
        disabled={!isNotHazardousPermissions && !submitButtonDisabled}
      />

      <GridRow className='bottom-border small-text'>
        <GridColumn>
          {allAccepted ? (
            <FormattedMessage
              id='checkout.summary.byPlacingYourOrder'
              defaultMessage='By placing your order, you agree to {companyName}’s Privacy Policy and Conditions of use}.'
              values={{
                privacyPolicy: (
                  <LinkLabel href={URL_PRIVACY} target='_blank'>
                    <FormattedMessage id='checkout.summary.privacyPolicy' defaultMessage='Privacy Policy' />
                  </LinkLabel>
                ),
                conditionsOfUse: (
                  <LinkLabel href={URL_TERMS} target='_blank'>
                    <FormattedMessage id='checkout.summary.conditionsOfUse' defaultMessage='Conditions Of Use' />
                  </LinkLabel>
                ),
                companyName: applicationName
              }}
            />
          ) : (
            <FormattedMessage
              id='checkout.summary.continueToFinish'
              defaultMessage='Continue to step 4 to finish checking out.'
              values={{
                value: (
                  <b>
                    <FormattedMessage id='checkout.summary.step4' defaultMessage='step 4' />
                  </b>
                )
              }}
            />
          )}
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
          {priceComponent(+freightPrice + +subTotalPrice)}
        </GridColumn>
      </GridRow>
    </GridSummary>
  )
}

OrderSummary.propTypes = {
  buttonText: PropTypes.any,
  onButtonClick: PropTypes.func,
  loading: PropTypes.bool
}

OrderSummary.defaultProps = {
  buttonText: 'Missing buttonText value!',
  onButtonClick: () => {},
  loading: false
}

function mapStateToProps(store) {
  return {
    applicationName: store?.auth?.identity?.appInfo?.applicationName
  }
}

export default connect(mapStateToProps, {})(injectIntl(OrderSummary))
