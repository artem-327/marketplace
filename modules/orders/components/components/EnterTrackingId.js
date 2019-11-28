import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import { loadFile, addAttachment } from '~/modules/inventory/actions'
import {Modal, ModalContent, Button, Grid, Dimmer, Loader} from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '~/constants/yupValidation'
import confirm from '~/src/components/Confirmable/confirm'
import { withToastManager } from 'react-toast-notifications'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const initValues = {
  trackingId: ''
}

class EnterTrackingId extends React.Component {

  markShipped = async (value) => {
    const {
      orderId,
      toastManager,
      closeEnterTrackingId
    } = this.props

    try {
      await this.props.shipOrder(orderId, value)
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage
            id='notifications.order.actions.shipped.success.header'
            defaultMessage='Order Marked as Shipped'
          />,
          <FormattedMessage
            id='notifications.order.actions.shipped.success.content'
            defaultMessage='Order {orderId} successfully marked as shipped.'
            values={{ orderId: orderId }}
          />
        ), { appearance: 'success' }
      )
      closeEnterTrackingId()
    } catch {}
  }


  render() {
    const {
      intl: { formatMessage },
      orderId,
      isSending
    } = this.props

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closeEnterTrackingId()} open={true} size='small'>
          <Dimmer active={isSending} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='order.enterTrackingId' defaultMessage='Enter Tracking ID' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={{ ...initValues }}
                onSubmit={(values, actions) => {
                  if (values.trackingId.length) {
                    this.markShipped(values.trackingId)
                  }
                  else {
                    confirm(
                      formatMessage({ id: 'confirm.order.actions.shippedNoTracking.title', defaultMessage: 'Mark Order as Shipped without Tracking ID' }),
                      formatMessage(
                        {
                          id: 'confirm.order.actions.shippedNoTracking.content',
                          defaultMessage: `Do you want to mark order ${orderId} as shipped without providing Tracking ID?`
                        },
                        { orderId: orderId }
                      )
                    ).then(
                      () => { // confirm
                        this.markShipped(values.trackingId)
                      },
                      () => { // cancel
                      }
                    )
                  }
                  actions.setSubmitting(false)
                }}
                className='flex stretched'
                style={{ padding: '0' }}>
                {({ values, submitForm }) => {
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <Input
                              type='text'
                              label={formatMessage({ id: 'order.trackingId', defaultMessage: 'Tracking ID' })}
                              name='trackingId'
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={10}></Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button basic fluid onClick={() => this.props.closeEnterTrackingId()}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' >
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button primary fluid type='submit'>
                              <FormattedMessage id='global.save' defaultMessage='Save' tagName='span' >
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...Actions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(EnterTrackingId)))
