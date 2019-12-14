import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader, FormGroup } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
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

class PurchaseRejectDelivery extends React.Component {
  state = {
    reason: null
  }

  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager, rejectPurchaseOrder } = this.props
    const { reason, reasonText, attachments } = values
    try {
      await rejectPurchaseOrder(orderId, reason, reasonText, attachments)
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='order.success' defaultMessage='Success' />,
          <FormattedMessage id='order.rejected' defaultMessage='Order was successfully rejected' />
        ),
        {
          appearance: 'success'
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
            <FormattedMessage id='order.rejectOrder' defaultMessage='REJECT ORDER' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                onSubmit={this.submitHandler}
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
                                  checked={this.state.reason === reason.value}
                                  onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
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
                                required={this.state.reason === 7}
                                onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
                                name='reasonText'
                                label={formatMessage({
                                  id: 'order.reject.enterReasonHere',
                                  defaultMessage: 'Enter reason here:'
                                })}
                                data-test='purchase_reject_text_area'
                              />
                              <UploadLot
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
                                this.props.closePopup()
                              }}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button
                              disabled={
                                typeof this.state.reason !== 'number' ||
                                (this.state.reason === 7 &&
                                  (!this.state.reasonText || (this.state.reasonText && !this.state.reasonText.trim())))
                              }
                              primary
                              fluid>
                              <FormattedMessage id='global.confirm' defaultMessage='Confirm' tagName='span'>
                                {text => text}
                              </FormattedMessage>
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
}

function mapStateToProps(state) {
  const { detail } = state.orders
  return {
    orderId: detail.id,
    isSending: state.orders.isSending
  }
}

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(PurchaseRejectDelivery)))
