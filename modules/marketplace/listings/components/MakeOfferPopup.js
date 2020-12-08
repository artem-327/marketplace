import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Input, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import {
  Form,
  Modal,
  Dimmer,
  Loader,
  Grid,
  GridRow,
  GridColumn,
  Label,
  Checkbox,
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

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const HighSegment = styled.div`
  padding: 1.071428571em 2.142857143em;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;
  text-transform: uppercase;  
  display: flex;
  flex-direction: row;

  svg {
    font-size: 18px;
    vertical-align: middle;
  }
  
  svg.title-icon {
    margin-left: 15px;
    color: #cecfd4;
  }
  
  svg.close-icon {
    right: 0;
    position: absolute;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
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

const StyledRectangle = styled.div`
  padding: 11px 15px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  
  .header {
    font-size: 12px;
    color: #848893;
  }
  
  .name {
    font-size: 14px;
    color: #20273a;
    font-weight: bold;
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
  message: ''
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
                              {this.props.productName}
                            </div>
                          </StyledRectangle>
                        </GridColumn>
                      </GridRow>

                      <GridRow>
                        <GridColumn width={5}>
                          <Input
                            name='priceOffer'
                            inputProps={{
                              placeholder: '0',
                              min: 0,
                              type: 'number'
                            }}
                            label={
                              <FormattedMessage
                                id='marketplace.yourFobPriceOffer'
                                defaultMessage='Your FOB price offer'>
                                {text => text}
                              </FormattedMessage>}
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
                            <FieldRectangle>
                              value
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
                                id: 'wantedBoard.writeNotesHere',
                                defaultMessage: 'Write notes here'
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
                  {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
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