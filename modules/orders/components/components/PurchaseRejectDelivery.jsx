import { useState } from 'react'
import { Modal, Button, Grid, Dimmer, Loader, FormGroup } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
// Styles
import { ModalBody } from '../../styles'
// Constants
import { reasons } from '../../constants'


const initValues = {
  reasonComment: null,
  reason: null
}

const PurchaseRejectDelivery = props => {
  const [state, setState] = useState({
    reason: null,
    changedForm: false,
    reasonComment: null
  })

  const submitHandler = async (values, actions) => {
    const { closePopup, orderId, rejectPurchaseOrder } = props
    const { reason, reasonComment, attachments } = values

    try {
      const request = { reason, reasonComment }
      await rejectPurchaseOrder(orderId, request, attachments)
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
          <FormattedMessage id='order.rejectOrder' defaultMessage='REJECT ORDER' />
        </Modal.Header>
        <ModalBody>
          <Modal.Description>
            <Form
              enableReinitialize
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
                          <strong>
                            <FormattedMessage
                              id='order.selectReason'
                              defaultMessage='Please select the reason for rejecting this order'
                            />
                          </strong>
                          <FormGroup grouped>
                            {reasons.map((reason, i) => (
                              <Form.Radio
                                key={i}
                                checked={state.reason === reason.value}
                                onChange={(e, { value, name }) => handleChange(e, value, name, setFieldValue)}
                                label={formatMessage({
                                  id: reason.label.id,
                                  defaultMessage: reason.label.defaultMessage
                                })}
                                name={'reason'}
                                value={reason.value}
                                data-test={`purchase_reject_radio_index=${i}`}
                              />
                            ))}

                            <Form.TextArea
                              required={state.reason === 7}
                              onChange={(e, { value, name }) => handleChange(e, value, name, setFieldValue)}
                              name='reasonComment'
                              label={formatMessage({
                                id: 'order.reject.enterReasonHere',
                                defaultMessage: 'Enter reason here:'
                              })}
                              data-test='purchase_reject_text_area'
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
                              data-test='purchase_reject_import_attachments'
                              emptyContent={
                                <label>
                                  <FormattedMessage
                                    id='addInventory.dragDrop'
                                    defaultMessage={'Drag and drop to add file here'}
                                  />
                                  <br />
                                  <FormattedMessage
                                    id='addInventory.dragDropOr'
                                    defaultMessage={'or {link} to select from computer'}
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
                                    id='addInventory.dragDrop'
                                    defaultMessage={'Drag and drop to add file here'}
                                  />
                                  <br />
                                  <FormattedMessage
                                    id='addInventory.dragDropOr'
                                    defaultMessage={'or {link} to select from computer'}
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
                          <Button
                            type='button'
                            basic
                            fluid
                            onClick={() => {
                              resetForm()
                              props.closePopup()
                            }}>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
                          </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button
                            disabled={
                              typeof state.reason !== 'number' ||
                              (state.reason === 7 &&
                                (!state.reasonComment ||
                                  (state.reasonComment && !state.reasonComment.trim())))
                            }
                            primary
                            fluid>
                            <FormattedMessage id='global.confirm' defaultMessage='Confirm' tagName='span' />
                          </Button>
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

PurchaseRejectDelivery.propTypes = {
  orderId: PropTypes.number,
  closePopup: PropTypes.func, 
  rejectPurchaseOrder: PropTypes.func,
  intl: PropTypes.object,
  isSending: PropTypes.bool
}

PurchaseRejectDelivery.defaultValues = {
  orderId: 0,
  closePopup: () => {}, 
  rejectPurchaseOrder: () => {},
  intl: {},
  isSending: false
}

export default injectIntl(PurchaseRejectDelivery)
