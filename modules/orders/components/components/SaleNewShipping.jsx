import { Modal, Button, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
// Styles
import { ModalBody } from '../../styles'

const initValues = {}

const SaleNewShipping = props => {
  const submitHandler = async (values, actions) => {
    const { closePopup } = props

    try {
      closePopup()
    } catch {
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
          <FormattedMessage id='order.someTextHeaderId' defaultMessage='SaleNewShipping header' />
        </Modal.Header>
        <ModalBody>
          <Modal.Description>
            <Form
              enableReinitialize
              validateOnChange={false}
              initialValues={{ ...initValues }}
              onSubmit={submitHandler}
              className='flex stretched'
              style={{ padding: '0' }}>
              {({ values, submitForm }) => {
                return (
                  <>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          <div>SaleNewShipping body</div>
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

export default withToastManager(injectIntl(SaleNewShipping))
