import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '~/constants/yupValidation'
import confirm from '~/src/components/Confirmable/confirm'
import { withToastManager } from 'react-toast-notifications'
import { DateInput } from '~/components/custom-formik'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const initValues = {}

class SaleReviewCreditRequest extends React.Component {
  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager } = this.props
    console.log('====================================')
    console.log(values)
    console.log('====================================')

    try {
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
            <FormattedMessage id='order.returnShipping' defaultMessage='ORDER RETURN SHIPPING' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={{ ...initValues }}
                onSubmit={this.submitHandler}
                className='flex stretched'
                style={{ padding: '0' }}>
                {({ values, submitForm, setFieldValue }) => {
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <DateInput
                              inputProps={{
                                fluid: true,
                                placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                              }}
                              label={
                                <FormattedMessage
                                  id='order.return.pickupDate'
                                  defaultMessage='Preferred pick-up date:'
                                />
                              }
                              name='pickupDate'
                            />
                            <TextArea
                              name='pickupRemarks'
                              label={formatMessage({
                                id: 'order.return.EnterPickupRemarks',
                                defaultMessage: 'Enter pickup remarks:'
                              })}
                            />
                            <TextArea
                              name='deliveryRemarks'
                              label={formatMessage({
                                id: 'order.return.EnterDeliveryRemarks',
                                defaultMessage: 'Enter delivery remarks:'
                              })}
                            />
                            <Input
                              name='shipperRefNo'
                              label={formatMessage({
                                id: 'order.return.shipperRefNo',
                                defaultMessage: 'Enter shipper reference number: '
                              })}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={10}></Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button basic fluid onClick={() => this.props.closePopup()}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button primary fluid type='submit'>
                              <FormattedMessage id='global.save' defaultMessage='Save' tagName='span'>
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

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(SaleReviewCreditRequest)))
