import PropTypes from 'prop-types'
import { Input, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Form, Modal, Dimmer, Loader, GridRow, GridColumn, List } from 'semantic-ui-react'
import { Formik } from 'formik'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Schedule } from '@material-ui/icons'
import { injectIntl } from 'react-intl'
// Components
import ErrorFocus from '../../../../components/error-focus'
// Constants
import { currency } from '../../../../constants/index'
import { Required } from '../../../../components/constants/layout'
// Styles
import { TableSegment, StyledList, StyledRectangle, PriceInput, BottomButtons, ModalStyled, DivFieldRectangle, DivSmallText, GridStyled } from '../../styles'
// Services
import { formValidation, getInitialFormValues, submitOffer } from './MakeOfferPopup.services'
import { getPricing } from '../../../../utils/functions'

/**
 * MakeOfferPopup Component
 * @category Marketplace - Listings
 * @components
 */
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
                            <FormattedMessage id='marketplace.YourTotalBid' defaultMessage='Your Total Bid' />
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
                              defaultMessage='Seller has 24 hours to reply.'
                            />
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
  closePopup: PropTypes.func,
  makeOffer: PropTypes.func,
  updating: PropTypes.bool,
  listFobPriceUnit: PropTypes.string,
  packagingType: PropTypes.string,
  packagingUnit: PropTypes.string,
  productName: PropTypes.string,
  packagingSize: PropTypes.number,
  intl: PropTypes.object,
  popupValues: PropTypes.object,
  datagrid: PropTypes.object
}

MakeOfferPopup.defaultProps = {
  closePopup: () => {},
  makeOffer: () => {},
  updating: false,
  listFobPriceUnit: '',
  packagingType: '',
  packagingUnit: '',
  productName: '',
  packagingSize: 1,
  intl: {},
  popupValues: {},
  datagrid: {}
}

export default injectIntl(MakeOfferPopup)