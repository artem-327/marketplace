import { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader, FormGroup } from 'semantic-ui-react'
import { Form, TextArea, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import * as val from 'yup'
import { Check } from 'react-feather'

import { generateToastMarkup } from '../../../../utils/functions'
import { errorMessages } from '../../../../constants/yupValidation'
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
import { getSafe } from '../../../../utils/functions'
//Styles
import { PaperclipIcon } from '../../../company-form/components/AddCertifications/AddCertifications.styles'
import { DivCircle, DivModal } from '../../../my-network/components/DetailRow/DetailRow.style'
//Components
import BasicButton from '../../../../components/buttons/BasicButton'
import confirm from '../../../../components/Confirmable/confirm'

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

const CustomA = styled.a`
  color: #2599d5;
`

const SpanModalText = styled.span`
  text-align: center;
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
    const {
      closePopup,
      orderId,
      toastManager,
      creditRequest,
      intl: { formatMessage },
      appInfo
    } = this.props
    const { reason, reasonText, attachments, credit } = values

    const request = {
      reason,
      reasonComment:
        reason > 0 && reason < 7
          ? `${getSafe(() => reasons[reason - 1].label.defaultMessage, '')}. ${reasonText ? reasonText : ''}`
          : reasonText
    }
    if (!request.reasonComment) {
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
      confirm(
        <DivModal>
          <DivCircle background='#84c225' borderColor='#dae7c7'>
            <Check size='34' color='#ffffff' />
          </DivCircle>
        </DivModal>,
        <DivModal>
          <SpanModalText>
            {formatMessage({
              id: 'dispute.submit.success',
              defaultMessage:
                'Your dispute has been opened, a member of our Support staff will reach out shortly with the next steps. You can also email or call us at any time at '
            })}
            {formatMessage(
              {
                id: 'global.emailAndPhoneNumber',
                defaultMessage: '{emailAndPhoneNumber}'
              },
              {
                emailAndPhoneNumber: (
                  <>
                    <CustomA href={`mailto: ${appInfo?.supportEmail}`}>{appInfo?.supportEmail}</CustomA>
                    {formatMessage({ id: 'global.andSpaceAround', defaultMessage: ' and ' })}
                    <b>{appInfo?.supportPhone}</b>
                  </>
                )
              }
            )}
          </SpanModalText>
        </DivModal>,
        {
          cancelText: null,
          proceedText: formatMessage({ id: 'global.close', defaultMessage: 'Close' })
        },
        true //Basic Modal
      ).then(
        async () => {
          // confirm
        },
        () => {
          // cancel
        }
      )
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
                //validateOnChange={true}
                //validationSchema={validationSchema}
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
                        <Grid.Row textAlign='right'>
                          <Grid.Column width={8}></Grid.Column>
                          <Grid.Column floated='right' width={4}>
                            <BasicButton
                              margin='0px !important'
                              noBorder
                              onClick={() => {
                                resetForm()
                                this.props.closePopup()
                              }}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
                            </BasicButton>
                          </Grid.Column>
                          <Grid.Column floated='right' width={4}>
                            <BasicButton margin='0px !important' type='submit'>
                              <FormattedMessage id='global.send' defaultMessage='Send' tagName='span' />
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
    isSending: state.orders.isSending,
    appInfo: state?.auth?.identity?.appInfo
  }
}

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(PurchaseRequestCreditDelivery)))
