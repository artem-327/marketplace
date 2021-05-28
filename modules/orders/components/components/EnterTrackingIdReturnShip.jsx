import { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '../../../../constants/yupValidation'
import confirm from '../../../../components/Confirmable/confirm'
const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const initValues = {
  trackingId: ''
}

const EnterTrackingIdReturnShip = props => {
  const markShipped = async (value, actions) => {
    const { orderId, closePopup } = props

    try {
      await props.returnShipOrder(orderId, value)
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }


  const {
    intl: { formatMessage },
    orderId,
    isSending
  } = props

  return (
    <>
      <Modal closeIcon onClose={() => props.closePopup()} open={true} size='small'>
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
                  markShipped(values.trackingId, actions)
                } else {
                  confirm(
                    formatMessage({
                      id: 'confirm.order.actions.shippedNoTracking.title',
                      defaultMessage: 'Mark Order as Shipped without Tracking ID'
                    }),
                    formatMessage(
                      {
                        id: 'confirm.order.actions.shippedNoTracking.content',
                        defaultMessage: `Do you want to mark order ${orderId} as shipped without providing Tracking ID?`
                      },
                      { orderId: orderId }
                    )
                  ).then(
                    () => {
                      // confirm
                      markShipped(values.trackingId, actions)
                    },
                    () => {
                      // cancel
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
                            inputProps={{ type: 'number' }}
                            label={formatMessage({ id: 'order.trackingId', defaultMessage: 'Tracking ID' })}
                            name='trackingId'
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={10}></Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button basic fluid onClick={() => props.closePopup()}>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
                          </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button primary fluid type='submit'>
                            <FormattedMessage id='global.save' defaultMessage='Save' tagName='span' />
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

function mapStateToProps(state) {
  const { detail } = state.orders
  return {
    orderId: detail.id,
    isSending: state.orders.isSending
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(EnterTrackingIdReturnShip))
