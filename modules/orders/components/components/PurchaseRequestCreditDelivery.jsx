import { useState } from 'react'
import { Modal, Grid, Dimmer, Loader, FormGroup } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import * as val from 'yup'
import { Check } from 'react-feather'
//Components
import BasicButton from '../../../../components/buttons/BasicButton'
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
// Services
import confirm from '../../../../components/Confirmable/confirm'
import { generateToastMarkup } from '../../../../utils/functions'
import { errorMessages } from '../../../../constants/yupValidation'
import { getSafe } from '../../../../utils/functions'
//Styles
import { PaperclipIcon } from '../../../company-form/components/AddCertifications/AddCertifications.styles'
import { DivCircle, DivModal } from '../../../my-network/components/DetailRow/DetailRow.style'
import { ModalBody, StrongTitle, CreditInput, CustomA, SpanModalText } from '../../styles'
// Constants
import { reasons } from '../../constants'

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

const PurchaseRequestCreditDelivery = props => {
  const [state, setState] = useState({
    reason: null,
    reasonText: null,
    changedForm: false
  })

  const submitHandler = async (values, actions) => {
    const {
      closePopup,
      orderId,
      toastManager,
      creditRequest,
      intl: { formatMessage },
      appInfo
    } = props
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

  const handleChange = (e, value, name, setFieldValue) => {
    e.preventDefault()
    setState({ ...state, [name]: value })
    setFieldValue(name, value)
  }

  
  const {
    intl: { formatMessage },
    isSending
  } = props

  return (
    <>
      <Modal closeIcon onClose={() => props.closePopup()} open={true} size='small'>
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
              onSubmit={submitHandler}
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
                          </StrongTitle>
                          <FormGroup grouped>
                            {reasons.map(reason => (
                              <Form.Radio
                                checked={state.reason === reason.value}
                                onChange={(e, { value, name }) => handleChange(e, value, name, setFieldValue)}
                                label={formatMessage({
                                  id: reason.label.id,
                                  defaultMessage: reason.label.defaultMessage
                                })}
                                name={'reason'}
                                value={reason.value}
                              />
                            ))}

                            <Form.TextArea
                              required={state.reason === 7}
                              onChange={(e, { value, name }) => handleChange(e, value, name, setFieldValue)}
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
                              {...props}
                              name='attachments'
                              attachments={values.attachments}
                              fileMaxSize={20}
                              onChange={files => {
                                files.map((file, i) => {
                                  setFieldValue(`attachments[${i}]`, file)
                                })
                                setState({ ...state, changedForm: true })
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
                              props.closePopup()
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

export default withToastManager(injectIntl(PurchaseRequestCreditDelivery))
