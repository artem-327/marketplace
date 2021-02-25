/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import { AlertCircle } from 'react-feather'

//Components
import { GridRow, GridColumn, Radio, Icon, Button, Header, Input, Dimmer, Loader } from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'
import {
  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  DivSectionHeader,
  DivSectionName,
  DivSectionDescription,
  GridExpandedSection,
  GridRowExpandedSelectionRow,
  DivFlexRow,
  DivCentered,
  DivTopPadding,
  DivSectionSmallHeader
} from '../Checkout.styles'
import moment from 'moment'
import { GridStyled, CustomRectangle, DivTitle, DivInTitle, DivContent } from './FreightSelection.styles'
import {
  VerticalUnpaddedColumn,
  StyledRow,
  TopUnpaddedRow,
  GridContainer,
  VerticalUnpaddedRow,
  BottomUnpaddedRow,
  CustomMessage,
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle,
  InfoIcon
} from '~/modules/cart/components/StyledComponents'

import FreightLabel from './FreightLabel'

// Services
import { handleManualShipment } from './FreightSelection.services'

//Hooks
import { usePrevious } from '../../../../hooks'

// Constants
import { FREIGHT_TYPES } from '../Checkout.constants'

const FreightSelection = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded = usePrevious(props.isExpanded)

  const {
    isExpanded,
    allAccepted,
    sectionState,
    shippingQuotes,
    onValueChange,
    setSummaryButtonCaption,
    value,
    orderTotal,
    fixedFreightId,
    cart,
    intl: { formatMessage },
    shippingQuotesAreFetching
  } = props

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    if (isExpanded && !prevIsExpanded) {
      setSummaryButtonCaption(
        <FormattedMessage id='checkout.button.useThisFreight' defaultMessage='Use this Freight'>
          {text => text}
        </FormattedMessage>
      )
    }
  }, [isExpanded])

  const freightOptions = getSafe(() => shippingQuotes.rates, [])
  let weightLimitStr = cart.weightLimit ? `of ${cart.weightLimit}` : ''
  let palletLimitStr = cart.palletCountLimit ? `of ${cart.palletCountLimit}` : ''
  let isAnyItemHazardous = cart.cartItems.some(
    item => getSafe(() => item.productOffer.companyProduct.hazardous, false) === true
  )
  const isOwn = value && value.freightType === FREIGHT_TYPES.OWN

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.freightSelection' defaultMessage='4. Freight Selection' />}
      onSubmitClick={() => props.onSubmitClick()}
      submitButtonCaption={
        allAccepted ? (
          <FormattedMessage id='checkout.button.placeOrder' defaultMessage='Place Order'>
            {text => text}
          </FormattedMessage>
        ) : (
          <FormattedMessage id='checkout.button.useThisFreight' defaultMessage='Use this Freight'>
            {text => text}
          </FormattedMessage>
        )
      }
      submitButtonDisabled={!value}
      content={
        sectionState.accepted || isExpanded ? (
          isExpanded ? (
            <>
              {!cart.weightLimitExceed && !cart.palletLimitExceed && !fixedFreightId && (
                <GridExpandedSection overflow={'overflow: auto;'} maxHeight='605px'>
                  <Dimmer inverted active={shippingQuotesAreFetching}>
                    <Loader />
                  </Dimmer>
                  {freightOptions.map((item, index) => (
                    <GridRowExpandedSelectionRow
                      key={index}
                      checked={value && value.quoteId === item.quoteId}
                      onClick={() => !isOwn && onValueChange({ ...item, freightType: FREIGHT_TYPES.ECHO })}
                      selection={isOwn ? '' : 'true'}
                    >
                      <GridColumn width={10}>
                        <DivFlexRow>
                          <DivCentered>
                            <Radio checked={value && value.quoteId === item.quoteId} disabled={isOwn} />
                          </DivCentered>
                          <div>
                            <DivSectionHeader disabled={isOwn}>{item.carrierName}</DivSectionHeader>
                            <DivSectionName disabled={isOwn}>
                              <FormattedNumber
                                minimumFractionDigits={2}
                                maximumFractionDigits={2}
                                style='currency'
                                currency={currency}
                                value={item.estimatedPrice}
                              />
                            </DivSectionName>
                          </div>
                        </DivFlexRow>
                      </GridColumn>
                      <GridColumn width={3}>
                        <DivSectionSmallHeader>
                          <FormattedMessage id='checkout.freight.estDelivery' defaultMessage='Est. Delivery' />
                        </DivSectionSmallHeader>
                        <DivSectionName disabled={isOwn}>{moment(item.estimatedDeliveryDate).fromNow()}</DivSectionName>
                      </GridColumn>
                      {false && (
                        <GridColumn width={2}>
                          <DivSectionSmallHeader>
                            <FormattedMessage id='checkout.freight.etd' defaultMessage='ETD' />
                          </DivSectionSmallHeader>
                          <DivSectionName disabled={isOwn}>{item.quoteId /* missing in endpoint */}</DivSectionName>
                        </GridColumn>
                      )}
                      <GridColumn width={3}>
                        <DivSectionSmallHeader>
                          <FormattedMessage id='checkout.freight.service' defaultMessage='Service' />
                        </DivSectionSmallHeader>
                        <DivSectionName disabled={isOwn}>{item.serviceType}</DivSectionName>
                      </GridColumn>
                    </GridRowExpandedSelectionRow>
                  ))}
                </GridExpandedSection>
              )}

              {(cart.weightLimitExceed || cart.palletLimitExceed) && !fixedFreightId && (
                <GridStyled>
                  <GridRow>
                    <GridColumn computer={16}>
                      <CustomMessage warning>
                        <CustomMessage.Header>
                          <Icon name='warning circle' />
                          {formatMessage({
                            id: 'cart.weightLimitExceeded.header',
                            defaultMessage:
                              'We are sorry, but no matching Shipping Quotes were provided by logistics company.'
                          })}
                        </CustomMessage.Header>
                        <CustomMessage.Content>
                          {formatMessage(
                            {
                              id: cart.weightLimitExceed
                                ? 'cart.weightLimitExceeded.content'
                                : 'cart.palletLimitExceeded.content',
                              defaultMessage: cart.weightLimitExceed
                                ? `Your order weight exceeds weight limit ${weightLimitStr} for automatic shipping quotes. Your shipping quote needs to be processed manually. If you wish to continue, click the "Request Shipping Quote" button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`
                                : `Your order pallet exceeds pallet limit ${palletLimitStr} for automatic shipping quotes. Your shipping quote needs to be processed manually. If you wish to continue, click the "Request Shipping Quote" button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`
                            },
                            { limit: cart.weightLimitExceed ? weightLimitStr : palletLimitStr }
                          )}
                        </CustomMessage.Content>
                      </CustomMessage>
                    </GridColumn>
                  </GridRow>
                </GridStyled>
              )}
              {freightOptions.length === 0 &&
                !shippingQuotesAreFetching &&
                !fixedFreightId &&
                !cart.weightLimitExceed &&
                !cart.palletLimitExceed && (
                  <GridStyled>
                    <GridRow>
                      <GridColumn computer={16}>
                        <CustomRectangle>
                          <DivTitle>
                            <AlertCircle color='orange' size={18} />
                            <DivInTitle>
                              <FormattedMessage
                                id='cart.noShippingQuotes.processManually.title'
                                defaultMessage={`We are sorry, but no matching Shipping Quotes were provided by logistics company.`}
                              />
                            </DivInTitle>
                          </DivTitle>
                          <DivContent>
                            <FormattedMessage
                              id='cart.noShippingQuotes.processManually'
                              defaultMessage={`It was not possible to retrieve any automated shipping quotes for you order. Your shipping quote might need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                            />
                          </DivContent>
                        </CustomRectangle>
                      </GridColumn>
                    </GridRow>
                  </GridStyled>
                )}

              {!shippingQuotesAreFetching &&
                !fixedFreightId &&
                (cart.weightLimitExceed || freightOptions.length === 0 || cart.palletLimitExceed) && (
                  <GridStyled>
                    <GridRow>
                      <GridColumn computer={8}>
                        <Button
                          basic
                          fluid
                          loading={props.manualShipmentPending}
                          type='button'
                          onClick={() => handleManualShipment(props)}>
                          <FormattedMessage id='cart.requestShippingQuote' defaultMessage='Request Shipping Quote'>
                            {text => text}
                          </FormattedMessage>
                        </Button>
                      </GridColumn>
                    </GridRow>
                  </GridStyled>
                )}

              {!shippingQuotesAreFetching &&
                (cart.weightLimitExceed || freightOptions.length === 0 || cart.palletLimitExceed) && (
                  <GridStyled>
                    <GridRow>
                      <GridColumn>
                        <Header as='h3'>
                          <FormattedMessage
                            id='cart.quoteReceived'
                            defaultMessage='If you already received the shipping quote and agree, please type in the provide Shipping Quote Id and continue with Checkout.'
                          />
                        </Header>
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn computer={8}>
                        <div>
                          <FormattedMessage id='cart.shippingQuoteId' defaultMessage='Shipping Quote ID' />
                        </div>
                        <Input
                          onChange={(_, { value }) =>
                            onValueChange({
                              freightType: FREIGHT_TYPES.ECHO,
                              carrierName: value,
                              estimatedPrice: '',
                              estimatedDeliveryDate: '',
                              quoteId: value
                            })
                          }
                          name='shipmentQuoteId'
                          value={value && value.quoteId ? value.quoteId : ''}
                          disabled={isOwn}
                        />
                      </GridColumn>
                    </GridRow>
                  </GridStyled>
                )}
              <FreightLabel
                isOwn={isOwn}
                onChange={val => onValueChange(val)}
              />
            </>
          ) : (
            <DivSectionCollapsedWrapper>
              <DivSectionCollapsedRow>
                <DivSectionName>{value ? value.carrierName : ''}</DivSectionName>
                <DivSectionDescription>
                  {value && value.estimatedPrice ? (
                    <FormattedNumber
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                      style='currency'
                      currency={currency}
                      value={value ? value.estimatedPrice : 0}
                    />
                  ) : (
                    ''
                  )}
                </DivSectionDescription>
                <DivSectionDescription>
                  {value && value.estimatedDeliveryDate ? moment(value.estimatedDeliveryDate).fromNow() : ''}
                </DivSectionDescription>
              </DivSectionCollapsedRow>
            </DivSectionCollapsedWrapper>
          )
        ) : null
      }
      bottomLeftContent={
        allAccepted ? (
          <DivTopPadding>
            <FormattedMessage
              id='checkout.summary.orderTotalValue'
              defaultMessage={`Order Total: ${orderTotal}`}
              values={{
                value: (
                  <b>
                    <FormattedNumber
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                      style='currency'
                      currency={currency}
                      value={orderTotal}
                    />
                  </b>
                )
              }}
            />
          </DivTopPadding>
        ) : (
          ''
        )
      }
    />
  )
}

FreightSelection.propTypes = {}

FreightSelection.defaultProps = {}

function mapStateToProps(store, props) {
  return {}
}

export default injectIntl(connect(mapStateToProps, {})(FreightSelection))
