import { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Input, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Form, Modal, Dimmer, Loader, Grid, GridRow, GridColumn, List } from 'semantic-ui-react'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
import { currencyId, currency } from '~/constants/index'
import styled from 'styled-components'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty, getSafe, getPricing } from '~/utils/functions'
import { uniqueArrayByKey } from '~/utils/functions'
import ErrorFocus from '~/components/error-focus'
import { Schedule } from '@material-ui/icons'

import { TableSegment, StyledList, StyledRectangle, PriceInput, BottomButtons } from '../../constants/layout'


class MakeOfferPopupOld extends Component {
  state = {}


  render() {
    const {
      intl: { formatMessage },
      popupValues,
      closePopup,
      updating,
      listFobPriceUnit,
      packagingType,
      packagingUnit,
      packagingSize
    } = this.props

    return (
      <Formik
        autoComplete='off'
        enableReinitialize
        initialValues={this.getInitialFormValues(props)}
        validationSchema={formValidation()}
        onSubmit={data => this.submitOffer(data, props)}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps

          const pkgAmount = parseInt(values.pkgAmount)
          let amount = pkgAmount
          if (isNaN(pkgAmount)) amount = 1

          const listFobPrice = getPricing(popupValues, amount).price
          const totalListPrice = amount * packagingSize * listFobPrice

          return (
            <StyledModal closeIcon onClose={closePopup} open={true} size='large'>
              <Dimmer active={updating} inverted>
                <Loader />
              </Dimmer>
              <Modal.Header>
                <FormattedMessage id='marketplace.makeAnOffer' defaultMessage='Make an Offer' />
              </Modal.Header>
              <Modal.Content scrolling>
                <Form>
                  <>
                    <StyledGrid>
                      <GridRow>
                        <GridColumn>
                          <StyledRectangle className='grey'>
                            <div className='header'>
                              <FormattedMessage id='marketplace.productName' defaultMessage='Product Name' />
                            </div>
                            <div className='name'>{this.props.productName}</div>
                          </StyledRectangle>
                        </GridColumn>
                      </GridRow>

                      <GridRow>
                        <GridColumn>
                          <TableSegment style={{ backgroundColor: '#f8f9fb' }}>
                            <StyledList divided relaxed horizontal size='large'>
                              <List.Item>
                                <List.Content>
                                  <List.Header as='label'>
                                    <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity' />
                                  </List.Header>
                                  <List.Description as='span'>
                                    {isNaN(pkgAmount)
                                      ? `${packagingSize} ${packagingUnit} ${packagingType}`
                                      : `${pkgAmount} (${packagingSize} ${packagingUnit} ${packagingType})`}
                                  </List.Description>
                                </List.Content>
                              </List.Item>

                              <List.Item>
                                <List.Content>
                                  <List.Header as='label'>
                                    <FormattedMessage id='marketplace.listFobPrice' defaultMessage='List FOB Price' />
                                  </List.Header>
                                  <List.Description as='span'>
                                    <FormattedNumber
                                      minimumFractionDigits={3}
                                      maximumFractionDigits={3}
                                      style='currency'
                                      currency={currency}
                                      value={listFobPrice}
                                    />{' '}
                                    {listFobPriceUnit}
                                  </List.Description>
                                </List.Content>
                              </List.Item>

                              <List.Item>
                                <List.Content>
                                  <List.Header as='label'>
                                    <FormattedMessage
                                      id='marketplace.totalListPrice'
                                      defaultMessage='Total List Price'
                                    />
                                  </List.Header>
                                  <List.Description as='span'>
                                    <FormattedNumber
                                      minimumFractionDigits={2}
                                      maximumFractionDigits={2}
                                      style='currency'
                                      currency={currency}
                                      value={totalListPrice}
                                    />
                                  </List.Description>
                                </List.Content>
                              </List.Item>

                              {false && (
                                <List.Item>
                                  <List.Content>
                                    <List.Header as='label'>
                                      <FormattedMessage id='marketplace.incoterms' defaultMessage='Incoterms' />
                                    </List.Header>
                                    <List.Description as='span'>TBD</List.Description>
                                  </List.Content>
                                </List.Item>
                              )}
                            </StyledList>
                          </TableSegment>
                        </GridColumn>
                      </GridRow>

                      <GridRow>
                        <GridColumn width={5}>
                          <Input
                            label={
                              <>
                                {formatMessage({ id: 'global.quantity', defaultMessage: 'Quantity' })}
                                <Required />
                              </>
                            }
                            name='pkgAmount'
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'global.enterQuantity',
                                defaultMessage: 'Enter Quantity'
                              }),
                              type: 'number',
                              min: 1,
                              step: 1
                            }}
                          />
                        </GridColumn>
                        <GridColumn width={5}>
                          <PriceInput
                            name='pricePerUOM'
                            inputProps={{
                              placeholder: '0.000',
                              min: 0.001,
                              type: 'number'
                            }}
                            label={
                              <>
                                <FormattedMessage
                                  id='marketplace.yourFobPriceOffer'
                                  defaultMessage='Your FOB price offer'
                                />
                                <Required />
                              </>
                            }
                            currencyLabel={'$'}
                          />
                        </GridColumn>
                        <GridColumn width={3}>
                          <Form.Field>
                            <label>
                              <FormattedMessage id='marketplace.YourTotalBid' defaultMessage='Your Total Bid'>
                                {text => text}
                              </FormattedMessage>
                            </label>
                            <FieldRectangle>
                              <FormattedNumber
                                minimumFractionDigits={2}
                                maximumFractionDigits={2}
                                style='currency'
                                currency={currency}
                                value={values.pkgAmount * packagingSize * values.pricePerUOM}
                              />
                            </FieldRectangle>
                          </Form.Field>
                        </GridColumn>
                      </GridRow>

                      <GridRow>
                        <GridColumn>
                          <TextArea
                            name='message'
                            label={
                              <FormattedMessage id='marketplace.messageToSeller' defaultMessage='Message to Seller' />
                            }
                            inputProps={{
                              'data-test': 'wanted_board_sidebar_specialNotes_inp',
                              placeholder: formatMessage({
                                id: 'marketplace.enterMessage',
                                defaultMessage: 'Enter Message...'
                              })
                            }}
                          />
                          <SmallText style={{ marginTop: '-14px' }}>
                            <FormattedMessage id='marketplace.optional' defaultMessage='Optional' />
                          </SmallText>
                        </GridColumn>
                      </GridRow>

                      <GridRow>
                        <GridColumn>
                          <SmallText>
                            <Schedule className='title-icon' />
                            <div>
                              <FormattedMessage
                                id='marketplace.sellerHas24HoursToReply.'
                                defaultMessage='Seller has 24 hours to reply.'>
                                {text => text}
                              </FormattedMessage>
                            </div>
                          </SmallText>
                        </GridColumn>
                      </GridRow>
                    </StyledGrid>
                    <ErrorFocus />
                  </>
                </Form>
              </Modal.Content>
              <BottomButtons>
                <Button
                  className='borderless'
                  size='large'
                  onClick={closePopup}
                  data-test='inventory_quick_edit_pricing_popup_cancel_btn'>
                  {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                </Button>
                <Button.Submit
                  className='light'
                  size='large'
                  onClick={() => {
                    let { validateForm, submitForm } = formikProps
                    validateForm().then(err => {
                      const errors = Object.keys(err)
                      if (errors.length && errors[0] !== 'isCanceled') {
                        submitForm() // to show errors
                      } else {
                        this.submitOffer(formikProps, props)
                      }
                    })
                  }}
                  type='button'
                  data-test='inventory_quick_edit_pricing_popup_save_btn'>
                  {formatMessage({ id: 'marketplace.submitOffer', defaultMessage: 'Submit Offer' })}
                </Button.Submit>
              </BottomButtons>
            </StyledModal>
          )
        }}
      </Formik>
    )
  }
}

function mapStateToProps(store) {
  const { popupValues } = store.marketplace

  const priceUnit = getSafe(() => popupValues.companyProduct.packagingUnit.nameAbbreviation, '')

  return {
    popupValues,
    updating: store.marketplace.updating,
    productName: getSafe(() => popupValues.companyProduct.intProductName, ''),
    listFobPriceUnit: priceUnit ? `/ ${priceUnit}` : '',
    packagingType: getSafe(() => popupValues.companyProduct.packagingType.name, ''),
    packagingUnit: getSafe(() => popupValues.companyProduct.packagingUnit.nameAbbreviation, ''),
    packagingSize: getSafe(() => popupValues.companyProduct.packagingSize, 1)
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(MakeOfferPopupOld)))
