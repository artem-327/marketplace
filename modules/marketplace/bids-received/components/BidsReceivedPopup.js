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
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
import { currencyId } from '~/constants/index'
import styled from 'styled-components'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import { uniqueArrayByKey } from '~/utils/functions'
import get from 'lodash/get'
import { getSafe } from '~/utils/functions'
import ErrorFocus from '~/components/error-focus'
import { Schedule } from '@material-ui/icons'

import { TableSegment, StyledList, StyledRectangle, PriceInput } from '../../constants/layout'

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
    margin: -7.5px -10px;
  
    .row {
      padding: 7.5px 0;
      
      .column {
        padding: 0 10px;  
      }  
    }
    
    .ui.input {
      height: 40px;
    }
  }
`


const initValues = {
  priceOffer: '',
  message: '',
  accept: '',
  counter: ''
}

const formValidation = () =>
  Yup.object().shape({
    priceOffer: Yup.string().trim().required(errorMessages.requiredMessage),
    message: Yup.string().trim().required(errorMessages.requiredMessage)
  })

class MakeOfferPopup extends React.Component {
  state = {
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    return popupValues
      ? {
        priceOffer: 32,
        message: 'test init message'
      }
      : initValues
  }

  submitOffer = async (values, actions, closeOnSubmit = true) => {
    const { closePopup } = this.props

    const data = {
      priceOffer: values.priceOffer,
      message: values.message
    }

    removeEmpty(data)

    try {
      console.log('!!!!!!!!!! submitOffer values', values)
      console.log('!!!!!!!!!! submitOffer data', data)
      closePopup()
    } catch (e) {
      console.error(e)
    }
    actions.setSubmitting(false)
  }

  render() {
    const {
      intl: { formatMessage },
      popupValues,
      closePopup,
      isSending
    } = this.props

    console.log('!!!!!!!!!! render popupValues', popupValues)

    return (
      <Formik
        autoComplete='off'
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={formValidation()}
        onSubmit={this.submitOffer}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps
          return (
            <StyledModal closeIcon onClose={closePopup} open={true} size='large'>
              <Dimmer active={isSending} inverted>
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
                          <StyledRectangle>
                            <div className='header'>
                              <FormattedMessage id='marketplace.productName' defaultMessage='Product Name' />
                            </div>
                            <div className='name'>
                              productName
                            </div>
                          </StyledRectangle>
                        </GridColumn>
                      </GridRow>

                      <GridRow>
                        <GridColumn>
                          <TableSegment>
                            <StyledList divided relaxed horizontal size='large'>
                              <List.Item>
                                <List.Content>
                                  <List.Header as='label'>
                                    <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity' />
                                  </List.Header>
                                  <List.Description as='span'>
                                    Quantity
                                  </List.Description>
                                </List.Content>
                              </List.Item>

                              <List.Item>
                                <List.Content>
                                  <List.Header as='label'>
                                    <FormattedMessage id='marketplace.listFobPrice' defaultMessage='List FOB Price' />
                                  </List.Header>
                                  <List.Description as='span'>
                                    listFobPrice
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
                                    totalListPrice
                                  </List.Description>
                                </List.Content>
                              </List.Item>

                              <List.Item>
                                <List.Content>
                                  <List.Header as='label'>
                                    <FormattedMessage id='marketplace.incoterms' defaultMessage='Incoterms' />
                                  </List.Header>
                                  <List.Description as='span'>
                                    incoterms
                                  </List.Description>
                                </List.Content>
                              </List.Item>
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
                                    offeredFobPrice
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
                                    totalOfferedPrice
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
                          <PriceInput
                            name='priceOffer'
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'marketplace.enterCounterBid',
                                defaultMessage: 'Enter Counter Bid'
                              }),
                              min: 0,
                              type: 'number',
                              disabled: !(values.accept || values.counter)
                            }}
                            label={
                              <FormattedMessage
                                id='marketplace.yourFobPriceOffer'
                                defaultMessage='Your FOB price offer'>
                                {text => text}
                              </FormattedMessage>
                            }
                            currencyLabel={'$'}
                          />
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
                  </>
                </Form>
              </Modal.Content>
              <Modal.Actions>
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
                  onclick={() => console.log('!!!!!!!!!! onclick')}
                  type='button'
                  data-test='inventory_quick_edit_pricing_popup_save_btn'>
                  {formatMessage({ id: 'marketplace.submitOffer', defaultMessage: 'Submit Offer' })}
                </Button.Submit>
              </Modal.Actions>
            </StyledModal>
          )
        }}
      </Formik>
    )
  }
}

function mapStateToProps(store) {
  const { popupValues } = store.marketplace
  return {
    popupValues,
    isSending: store.marketplace.isSending,
    productName: getSafe(() => popupValues.companyProduct.intProductName, ''),

  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(MakeOfferPopup)))