/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//Components
import { Input, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Form, Modal, Dimmer, Loader, GridRow, GridColumn, List } from 'semantic-ui-react'
import { Formik } from 'formik'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import ErrorFocus from '~/components/error-focus'
import { Schedule } from '@material-ui/icons'

// Constants
import { errorMessages } from '~/constants/yupValidation'
import { currencyId, currency } from '~/constants/index'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'

// Styles
import { ModalStyled, DivFieldRectangle, DivSmallText, GridStyled } from './MakeOfferPopup.styles'
import { TableSegment, StyledList, StyledRectangle, PriceInput, BottomButtons } from '../../constants/layout'

// Services
import { formValidation, getInitialFormValues, submitOffer } from './MakeOfferPopup.services'
import * as Actions from '../../actions'
import { getSafe, getPricing } from '~/utils/functions'

const MakeOfferPopup = props => {
  const {
    intl: { formatMessage },
    popupValues,
    closePopup,
    updating,
    listFobPriceUnit,
    packagingType,
    packagingUnit,
    packagingSize
  } = props

  return (
    <Formik
      autoComplete='off'
      enableReinitialize
      initialValues={getInitialFormValues(props)}
      validationSchema={formValidation()}
      onSubmit={data => submitOffer(data, props)}>
      {formikProps => {
        let { values } = formikProps

        const pkgAmount = parseInt(values.pkgAmount)
        let amount = pkgAmount
        if (isNaN(pkgAmount)) amount = 1

        const listFobPrice = getPricing(popupValues, amount).price
        const totalListPrice = amount * packagingSize * listFobPrice

        return (
          <ModalStyled closeIcon onClose={closePopup} open={true} size='large'>
            <Dimmer active={updating} inverted>
              <Loader />
            </Dimmer>
            <Modal.Header>
              <FormattedMessage id='marketplace.makeAnOffer' defaultMessage='Make an Offer' />
            </Modal.Header>
            <Modal.Content scrolling>
              <Form>
                <>
                  <GridStyled>
                    <GridRow>
                      <GridColumn>
                        <StyledRectangle className='grey'>
                          <div className='header'>
                            <FormattedMessage id='marketplace.productName' defaultMessage='Product Name' />
                          </div>
                          <div className='name'>{props.productName}</div>
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
                          <DivFieldRectangle>
                            <FormattedNumber
                              minimumFractionDigits={2}
                              maximumFractionDigits={2}
                              style='currency'
                              currency={currency}
                              value={values.pkgAmount * packagingSize * values.pricePerUOM}
                            />
                          </DivFieldRectangle>
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
                        <DivSmallText style={{ marginTop: '-14px' }}>
                          <FormattedMessage id='marketplace.optional' defaultMessage='Optional' />
                        </DivSmallText>
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <DivSmallText>
                          <Schedule className='title-icon' />
                          <div>
                            <FormattedMessage
                              id='marketplace.sellerHas24HoursToReply.'
                              defaultMessage='Seller has 24 hours to reply.'>
                              {text => text}
                            </FormattedMessage>
                          </div>
                        </DivSmallText>
                      </GridColumn>
                    </GridRow>
                  </GridStyled>
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
                      submitOffer(formikProps, props)
                    }
                  })
                }}
                type='button'
                data-test='inventory_quick_edit_pricing_popup_save_btn'>
                {formatMessage({ id: 'marketplace.submitOffer', defaultMessage: 'Submit Offer' })}
              </Button.Submit>
            </BottomButtons>
          </ModalStyled>
        )
      }}
    </Formik>
  )
}

MakeOfferPopup.propTypes = {

}

MakeOfferPopup.defaultProps = {

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

export default withDatagrid(injectIntl(connect(mapStateToProps, Actions)(MakeOfferPopup)))