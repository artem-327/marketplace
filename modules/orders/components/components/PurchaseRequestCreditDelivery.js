import { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader, FormGroup } from 'semantic-ui-react'
import { Form, TextArea, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import * as val from 'yup'

import { generateToastMarkup } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { getSafe } from '~/utils/functions'
//Styles
import { PaperclipIcon } from '../../../company-form/components/AddCertifications/AddCertifications.styles'
//Components
import BasicButton from '../../../../components/buttons/BasicButton'
const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const StrongTitle = styled.strong`
  display: flex;
  align-items: center;
`

const CreditInput = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

const reasons = [
  {
    value: 1,
    label: { id: 'order.reject.SPECIFICATION_NOT_MET', defaultMessage: 'Product does not meet specification' }
  },
  {
    value: 2,
    label: { id: 'order.reject.PACKAGING_NOT_AS_DESCRIBED', defaultMessage: 'Packaging is not as described' }
  },
  {
    value: 3,
    label: { id: 'order.reject.BAD_PAPERWORK', defaultMessage: 'Paperwork is not in compliance' }
  },
  {
    value: 4,
    label: { id: 'order.reject.NOT_PROPERLY_LABELED', defaultMessage: 'Product is not properly labeled' }
  },
  {
    value: 5,
    label: {
      id: 'order.reject.DELIVERY_VEHICLE_NOT_PLACARDED',
      defaultMessage: 'Delivery vehicle is not properly placarded'
    }
  },
  {
    value: 6,
    label: {
      id: 'order.reject.DELIVERY_EQUIPMENT_NOT_AS_REQUESTED',
      defaultMessage: 'Delivery equipment was not as requested'
    }
  },
  {
    value: 7,
    label: { id: 'order.reject.OTHER', defaultMessage: 'Other' }
  }
]

const initValues = {
  reasonText: null,
  reason: null,
  credit: null
}

const validationSchema = val.object().shape({
  credit: val
    .number()
    .min(0, errorMessages.minimum(0))
    .typeError(errorMessages.mustBeNumber)
    .required(errorMessages.requiredMessage)
})

class PurchaseRequestCreditDelivery extends Component {
  state = {
    reason: null,
    reasonText: null
  }

  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager, creditRequest } = this.props
    const { reason, reasonText, attachments, credit } = values

    const request = {
      amount: credit,
      message:
        reason > 0 && reason < 7
          ? `${getSafe(() => reasons[reason - 1].label.defaultMessage, '')}. ${reasonText ? reasonText : ''}`
          : reasonText
    }
    if (!request.message) {
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='order.requestCreditNotSent' defaultMessage='Not sent' />,
          <FormattedMessage
            id='order.requestCredit.atLeastReasonOrReasonText'
            defaultMessage='Reason has to be selected or write reason message.'
          />
        ),
        {
          appearance: 'error'
        }
      )
      actions.setSubmitting(false)
      return
    }
    try {
      await creditRequest(orderId, request, attachments)
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  handleChange = (e, value, name, setFieldValue) => {
    e.preventDefault()
    this.setState({ [name]: value })
    setFieldValue(name, value)
  }

  render() {
    const {
      intl: { formatMessage },
      isSending
    } = this.props

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closePopup()} open={true} size='small'>
          <Dimmer active={isSending} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='order.openDispute' defaultMessage='Open Dispute' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={true}
                validationSchema={validationSchema}
                initialValues={{ ...initValues }}
                onSubmit={this.submitHandler}
                className='flex stretched'
                style={{ padding: '0' }}>
                {({ values, submitForm, setFieldValue, resetForm }) => {
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <StrongTitle>
                              <FormattedMessage
                                id='order.dispute.selectReason'
                                defaultMessage='Please select the reason for disputing this order'
                              />
                              {/* <CreditInput>
                                <Input
                                  name='credit'
                                  inputProps={{
                                    onChange: (e, { value, name }) => this.handleChange(e, value, name, setFieldValue),
                                    placeholder: '$',
                                    type: 'number',
                                    min: 0
                                  }}
                                />
                              </CreditInput>
                              <FormattedMessage id='order.requestingCreditBecause' defaultMessage={' because'} /> */}
                            </StrongTitle>
                            <FormGroup grouped>
                              {reasons.map(reason => (
                                <Form.Radio
                                  checked={this.state.reason === reason.value}
                                  onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
                                  label={formatMessage({
                                    id: reason.label.id,
                                    defaultMessage: reason.label.defaultMessage
                                  })}
                                  name={'reason'}
                                  value={reason.value}
                                />
                              ))}

                              <Form.TextArea
                                required={this.state.reason === 7}
                                onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
                                name='reasonText'
                                placeholder={formatMessage({
                                  id: 'order.dispute.enterReasonHere',
                                  defaultMessage: 'Enter reason here...'
                                })}
                                label={formatMessage({
                                  id: 'order.dispute.pleaseProvide',
                                  defaultMessage:
                                    'Please provide as much information as you can about this dispute and how you would like it resolved.'
                                })}
                              />
                              <UploadAttachment
                                {...this.props}
                                name='attachments'
                                attachments={values.attachments}
                                fileMaxSize={20}
                                onChange={files => {
                                  files.map((file, i) => {
                                    setFieldValue(`attachments[${i}]`, file)
                                  })
                                  this.setState({ changedForm: true })
                                }}
                                data-test='detail_request_credit_attachments'
                                emptyContent={
                                  <label>
                                    <PaperclipIcon size='14' color='#20273a' />
                                    <FormattedMessage
                                      id='order.dispute.dragAndDrop'
                                      defaultMessage={'Drag and drop or {link} to upload files'}
                                      values={{
                                        link: (
                                          <a>
                                            <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                          </a>
                                        )
                                      }}
                                    />
                                  </label>
                                }
                                uploadedContent={
                                  <label>
                                    <FormattedMessage
                                      id='order.dispute.dragAndDrop'
                                      defaultMessage={'Drag and drop or {link} to upload files'}
                                      values={{
                                        link: (
                                          <a>
                                            <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                          </a>
                                        )
                                      }}
                                    />
                                  </label>
                                }
                              />
                            </FormGroup>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={10}></Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <BasicButton
                              noBorder
                              fluid
                              onClick={() => {
                                resetForm()
                                this.props.closePopup()
                              }}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </BasicButton>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <BasicButton fluid type='submit'>
                              <FormattedMessage id='global.confirm' defaultMessage='Confirm' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </BasicButton>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </>
                  )
                }}
              </Form>
            </Modal.Description>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { detail } = state.orders
  return {
    orderId: detail.id,
    isSending: state.orders.isSending
  }
}

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(PurchaseRequestCreditDelivery)))
