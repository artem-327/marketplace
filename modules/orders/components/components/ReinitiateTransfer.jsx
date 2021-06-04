import { useEffect, useState } from 'react'
import { Modal, Button, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as val from 'yup'
import PropTypes from 'prop-types'
// Services
import { errorMessages } from '../../../../constants/yupValidation'
// Styles
import { ModalBody, Subtitle } from '../../styles'


const initValues = {
  paymentAccount: undefined
}

const validationScheme = val.object().shape({
  paymentAccount: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage)
})

const ReinitiateTransfer = props => {
  
  const [allowTransfer, setAllowTransfer] = useState(false)
  
  useEffect(() => {
    if (props.paymentProcessor === 'DWOLLA') {
      props.loadDwollaBankAccounts()
    } else {
      props.loadVellociBankAccounts()
    }
  }, [])

  const {
    intl: { formatMessage },
    bankAccounts,
    bankAccountsLoading,
    orderId,
    isThirdPartyConnectionException
  } = props

  return (
    <>
      <Modal closeIcon onClose={() => props.closeReinitiateTransfer()} open={true}>
        <Dimmer active={bankAccountsLoading} inverted>
          <Loader />
        </Dimmer>
        <Modal.Header>
          <FormattedMessage id='order.reinitiateTransfer' defaultMessage='Reinitiate Transfer' />
          <Subtitle as='h4'>
            <FormattedMessage
              id='order.reinitiateTransfer.subtitle'
              defaultMessage='Please select another payment account and Transfer'
            />
          </Subtitle>
        </Modal.Header>
        <ModalBody>
          <Modal.Description>
            <Form
              enableReinitialize
              validateOnChange={false}
              initialValues={{ ...initValues }}
              validationSchema={validationScheme}
              onSubmit={(values, actions) => {
                props
                  .payOrder(orderId, values.paymentAccount)
                  .then(r => {
                    actions.setSubmitting(false)
                    props.closeReinitiateTransfer()
                  })
                  .catch(e => {
                    actions.setSubmitting(false)
                  })
              }}
              className='flex stretched'
              style={{ padding: '0' }}>
              {({ values, submitForm }) => {
                return (
                  <>
                    <Grid>
                      <Grid.Column width={6}>
                        <Dropdown
                          name='paymentAccount'
                          options={bankAccounts}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'order.reinitiateTransfer.dropdownPlaceholder',
                              defaultMessage: '-- select payment account --'
                            }),
                            onChange: (e, { value }) => {
                              if (value) setAllowTransfer(true)
                              else setAllowTransfer(false)
                            },
                            clearable: true
                          }}
                        />
                      </Grid.Column>
                      <Grid.Column width={4}></Grid.Column>
                      <Grid.Column floated='right' width={3}>
                        <Button basic fluid onClick={() => props.closeReinitiateTransfer()}>
                          <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
                        </Button>
                      </Grid.Column>
                      <Grid.Column floated='right' width={3}>
                        <Button primary fluid disabled={!allowTransfer}>
                          <FormattedMessage
                            id='order.reinitiateTransfer.transfer'
                            defaultMessage='Transfer'
                            tagName='span'
                          />
                        </Button>
                      </Grid.Column>
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

ReinitiateTransfer.propTypes = {
  orderId: PropTypes.number,
  paymentProcessor: PropTypes.string,
  intl: PropTypes.object,
  bankAccounts: PropTypes.array,
  bankAccountsLoading: PropTypes.bool,
  isThirdPartyConnectionException: PropTypes.bool,
  loadDwollaBankAccounts: PropTypes.func,
  loadVellociBankAccounts: PropTypes.func,
  closeReinitiateTransfer: PropTypes.func,
  payOrder: PropTypes.func
}

ReinitiateTransfer.defaultValues = {
  orderId: 0,
  paymentProcessor: '',
  intl: {},
  bankAccounts: [],
  bankAccountsLoading: false,
  isThirdPartyConnectionException: false,
  loadDwollaBankAccounts: () => {},
  loadVellociBankAccounts: () => {},
  closeReinitiateTransfer: () => {},
  payOrder: () => {}
}

export default injectIntl(ReinitiateTransfer)
