import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Input, Button, TextArea, Checkbox } from 'formik-semantic-ui-fixed-validation'
import {
  Form,
  Modal,
  Dimmer,
  Loader,
  Grid,
  GridRow,
  GridColumn,
  List,
  Label,
  FormField,
  FormGroup,
  Segment
} from 'semantic-ui-react'

import { Formik } from 'formik'
import { Field as FormikField } from 'formik'
import * as Yup from 'yup'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
import { currencyId, currency } from '~/constants/index'
import styled from 'styled-components'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty, getSafe, getPricing } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import { uniqueArrayByKey } from '~/utils/functions'
import get from 'lodash/get'
import ErrorFocus from '~/components/error-focus'
import { Schedule } from '@material-ui/icons'
import { DefaultIcon, IconWrapper, StyledName, NameWrapper, DetailHistoryRow } from '../../constants/layout'
import moment from 'moment'

import { TableSegment, StyledList, StyledRectangle, PriceInput } from '../../constants/layout'

export const DetailRow = styled.div`
  text-align: left;
  font-size: 14px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
`

const StyledModal = styled(Modal)`  
  > i.close.icon {
    font-size: 18px;
  }
  
  &.ui.large.modal > .header {
    font-size: 18px;
  }
  
  &.ui.large.modal > .scrolling.content {
    padding: 30px;
  }
`

const BottomButtons = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible;
  margin: 0;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  padding: 10px 25px;
  text-align: right;

  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;
    margin: 0 5px;
    align-items: center;

    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }
    &.secondary {
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }

  .ui.modal & {
    margin: 30px -1.5rem -1.5rem;
    border-top: 1px solid #dee2e6;
    box-shadow: 0 0 0 0 transparent;
  }
`

const FieldRectangle = styled.div`
  padding: 10px 15px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #20273a;
  
  &.disabled {
    opacity: 0.45;
  }
`

const SmallText = styled.div`
  font-size: 12px;
  color: #848893;
  display: flex;
  
  > svg.title-icon {
    font-size: 14px;
    margin-right: 8px;
  }
`

const StyledGrid = styled(Grid)`
  &.ui.grid {
    //margin: -7.5px -10px;
    margin: 0;
  
    .row {
      margin: 0; // ! ! asi
      padding: 7.5px 0;
      
      .column {
        margin: 0; // ! ! asi
        padding: 0 10px;  
      }  
    }
    
    .ui.input {
      height: 40px;
    }
  }
`



const formValidation = () =>
  Yup.object().shape({
    pricePerUOM: Yup.string().trim().required(errorMessages.requiredMessage),
    pkgAmount: Yup.number()
      .min(1, errorMessages.minimum(1))
      .required(errorMessages.requiredMessage)
      .test('int', errorMessages.integer, val => {
        return val % 1 === 0
      })
  })

class BidsRowDetail extends React.Component {
  state = {
  }

  componentDidMount() {
    console.log('!!!!!!!!!! componentDidMount')
  }

  componentWillUnmount() {
    console.log('!!!!!!!!!! componentWillUnmount')
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    return {
      message: '',
      pkgAmount: popupValues.cfHistoryLastPkgAmount,
      pricePerUOM: ''
    }
  }

  submitOffer = async ({values, setSubmitting }) => {
    const { popupValues, closePopup, counterOffer, datagrid } = this.props

    const body = {
      pkgAmount: parseInt(values.pkgAmount),
      pricePerUOM: parseFloat(values.pricePerUOM),
      message: values.message
    }
    removeEmpty(body)

    try {
      await counterOffer(popupValues.id, body)
      datagrid.loadData()
      closePopup()
    } catch (e) {
      console.error(e)
    }
    setSubmitting(false)
  }

  render() {
    const {
      intl: { formatMessage },
      popupValues,
      productOffer,
      closePopup,
      isSending,
      listFobPriceUnit,
      packagingType,
      packagingUnit,
      packagingSize
    } = this.props

    //console.log('!!!!!!!!!! aaaaa popupValues', popupValues)

    const histories = popupValues.histories.slice(1)

    return (
      <Formik
        autoComplete='off'
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={formValidation()}
        onSubmit={this.submitOffer}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps

          const pkgAmount = parseInt(values.pkgAmount)
          let amount = pkgAmount
          if (isNaN(pkgAmount)) amount = 1

          const listFobPrice = getPricing(popupValues.productOffer, amount).price
          const totalListPrice = amount * listFobPrice

          const disabledInputPrice = values.accept || !values.counter

          return (
            <DetailRow>
              <Dimmer active={isSending} inverted>
                <Loader />
              </Dimmer>
              <div>
                <Form>
                  <StyledGrid>
                    {histories.map(r => {
                      return (
                        <DetailHistoryRow>
                          <GridColumn width={4}>
                            <NameWrapper>
                              <IconWrapper>{DefaultIcon}</IconWrapper>
                              <StyledName style={{ marginLeft: '10px', paddingTop: '2px' }}>
                                <div className='name'>
                                  {r.createdBy.name}
                                </div>
                                <div className='company'>
                                  {r.createdBy.company.cfDisplayName}
                                </div>
                              </StyledName>
                            </NameWrapper>
                          </GridColumn>
                          <GridColumn width={9}>
                            text text text
                          </GridColumn>
                          <GridColumn width={3} style={{ color: '#848893' }}>
                            {moment(r.createdAt).fromNow()}
                          </GridColumn>


                        </DetailHistoryRow>
                      )})
                    }
                    <GridRow>
                      <GridColumn>
                        <TableSegment>
                          <StyledList divided relaxed horizontal size='large'>
                            <List.Item>
                              <List.Content>
                                <List.Header as='label'>
                                  <FormattedMessage id='marketplace.productName' defaultMessage='Product Name' />
                                </List.Header>
                                <List.Description as='span'>
                                  {this.props.productName}
                                </List.Description>
                              </List.Content>
                            </List.Item>

                            <List.Item>
                              <List.Content>
                                <List.Header as='label'>
                                  <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity' />
                                </List.Header>
                                <List.Description as='span'>
                                  {`${isNaN(pkgAmount) ? packagingSize : pkgAmount * packagingSize} ${packagingUnit} ${packagingType}`}
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
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                    style='currency'
                                    currency={currency}
                                    value={listFobPrice}
                                  />
                                  {' '}
                                  {listFobPriceUnit}
                                </List.Description>
                              </List.Content>
                            </List.Item>

                            <List.Item>
                              <List.Content>
                                <List.Header as='label'>
                                  <FormattedMessage
                                    id='marketplace.totalListPrice'
                                    defaultMessage='Total List Price' />
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

                            {false && (<List.Item>
                              <List.Content>
                                <List.Header as='label'>
                                  <FormattedMessage id='marketplace.incoterms' defaultMessage='Incoterms' />
                                </List.Header>
                                <List.Description as='span'>
                                  TBD
                                </List.Description>
                              </List.Content>
                            </List.Item>)}
                          </StyledList>
                        </TableSegment>
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <TableSegment>
                          <StyledList divided relaxed horizontal size='large'>
                            <List.Item>
                              <List.Content>
                                <List.Header as='label'>
                                  <FormattedMessage
                                    id='marketplace.offeredFobPrice'
                                    defaultMessage='Offered FOB Price' />
                                </List.Header>
                                <List.Description as='span' className='green' >
                                  <FormattedNumber
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                    style='currency'
                                    currency={currency}
                                    value={popupValues.cfHistoryLastPricePerUOM}
                                  />
                                  {' '}
                                  {listFobPriceUnit}
                                </List.Description>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header as='label'>
                                  <FormattedMessage
                                    id='marketplace.totalOfferedPrice'
                                    defaultMessage='Total Offered Price' />
                                </List.Header>
                                <List.Description as='span' className='green' >
                                  <FormattedNumber
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                    style='currency'
                                    currency={currency}
                                    value={popupValues.cfHistoryLastPricePerUOM * popupValues.cfHistoryLastPkgAmount}
                                  />
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          </StyledList>
                        </TableSegment>
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <StyledRectangle>
                          <div className='header'>
                            <FormattedMessage
                              id='marketplace.messageFromSeller'
                              defaultMessage='Message from Seller' />
                          </div>
                          <div className='message'>
                            message from seller
                          </div>
                        </StyledRectangle>
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Checkbox
                          name='accept'
                          defaultChecked={false}
                          onChange={() => console.log('!!!!!!!!!! onChange accept')}
                          data-test={`bids_received_accept_chckb`}
                          label={formatMessage({ id: 'global.accept', defaultMessage: 'Accept' })}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow style={{ padding: '0' }}>
                      <GridColumn>
                        <FormattedMessage id='marketplace.or' defaultMessage='or' />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Checkbox
                          name='counter'
                          defaultChecked={false}
                          onChange={() => console.log('!!!!!!!!!! onChange counter')}
                          data-test={`bids_received_counter_chckb`}
                          label={formatMessage({ id: 'global.counter', defaultMessage: 'Counter' })}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={5}>
                        <Input
                          label={
                            <>
                              {formatMessage({ id: 'global.quantity', defaultMessage: 'Quantity' })}
                              {!disabledInputPrice && (<Required />)}
                            </>
                          }
                          name='pkgAmount'
                          inputProps={{
                            placeholder:
                              formatMessage({ id: 'global.enterQuantity', defaultMessage: 'Enter Quantity' }),
                            type: 'number',
                            min: 1,
                            step: 1,
                            disabled: disabledInputPrice
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={5}>
                        <PriceInput
                          name='pricePerUOM'
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'marketplace.enterCounterBid',
                              defaultMessage: 'Enter Counter Bid'
                            }),
                            min: 0,
                            type: 'number',
                            disabled: disabledInputPrice
                          }}
                          label={
                            <>
                              <FormattedMessage
                                id='marketplace.yourFobPriceOffer'
                                defaultMessage='Your FOB price offer'>
                                {text => text}
                              </FormattedMessage>
                              {!disabledInputPrice && (<Required />)}
                            </>
                          }
                          currencyLabel={'$'}
                        />
                      </GridColumn>
                      <GridColumn width={3}>
                        <Form.Field>
                          <label>
                            <FormattedMessage
                              id='marketplace.YourTotalBid'
                              defaultMessage='Your Total Bid'>
                              {text => text}
                            </FormattedMessage>
                          </label>
                          <FieldRectangle className={disabledInputPrice ? 'disabled' : ''}>
                            <FormattedNumber
                              minimumFractionDigits={2}
                              maximumFractionDigits={2}
                              style='currency'
                              currency={currency}
                              value={values.pkgAmount * values.pricePerUOM}
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
                            <FormattedMessage id='marketplace.messageToBuyer' defaultMessage='Message to Buyer' />
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
                  </StyledGrid>
                  <ErrorFocus />
                </Form>
              </div>
              <div>
                <Button
                  size='large'
                  inputProps={{ type: 'button' }}
                  onClick={closePopup}
                  data-test='inventory_quick_edit_pricing_popup_cancel_btn'>
                  {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                </Button>
                <Button.Submit
                  primary
                  size='large'
                  onClick={() => {
                    let { validateForm, submitForm } = formikProps
                    validateForm().then(err => {
                      const errors = Object.keys(err)
                      if (errors.length && errors[0] !== 'isCanceled') {
                        submitForm() // to show errors
                      } else {
                        this.submitOffer(formikProps)
                      }
                    })
                  }}
                  type='button'
                  data-test='inventory_quick_edit_pricing_popup_save_btn'>
                  {formatMessage({ id: 'marketplace.send', defaultMessage: 'Send' })}
                </Button.Submit>
              </div>
            </DetailRow>
          )
        }}
      </Formik>
    )
  }
}

function mapStateToProps(store, params) {
  //const { popupValues } = store.marketplace
  const { popupValues } = params
  const productOffer = popupValues.productOffer
  const companyProduct = productOffer.companyProduct

  const priceUnit = getSafe(() => companyProduct.packagingUnit.nameAbbreviation, '')

  return {
    popupValues,
    productOffer,
    isSending: store.marketplace.isSending,
    productName: getSafe(() => companyProduct.intProductName, ''),
    listFobPriceUnit: priceUnit ? `/ ${priceUnit}` : '',
    packagingType: getSafe(() => companyProduct.packagingType.name, ''),
    packagingUnit: getSafe(() => companyProduct.packagingUnit.nameAbbreviation, ''),
    packagingSize: getSafe(() => companyProduct.packagingSize, 1)
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(BidsRowDetail)))