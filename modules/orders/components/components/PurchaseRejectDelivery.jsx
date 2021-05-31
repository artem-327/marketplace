import { useState } from 'react'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader, FormGroup } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`
//temporary
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

export default injectIntl(PurchaseRejectDelivery)
