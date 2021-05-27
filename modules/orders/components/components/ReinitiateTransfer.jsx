import { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Header, Button, Grid, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { Form, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { getSafe } from '../../../../utils/functions'
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl'
import styled from 'styled-components'
import * as val from 'yup'
import { errorMessages } from '../../../../constants/yupValidation'
const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const Subtitle = styled(Header)`
  margin-top: 1em;
  font-weight: 400;
`

const initValues = {
  paymentAccount: undefined
}

const validationScheme = val.object().shape({
  paymentAccount: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage)
})

class ReinitiateTransfer extends Component {
  state = {
    allowTransfer: false
  }

  componentDidMount() {
    if (this.props.paymentProcessor === 'DWOLLA') {
      this.props.loadDwollaBankAccounts()
    } else {
      this.props.loadVellociBankAccounts()
    }
  }

  render() {
    const {
      intl: { formatMessage },
      bankAccounts,
      bankAccountsLoading,
      orderId,
      isThirdPartyConnectionException
    } = this.props
    const { allowTransfer } = this.state

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closeReinitiateTransfer()} open={true}>
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
                  this.props
                    .payOrder(orderId, values.paymentAccount)
                    .then(r => {
                      actions.setSubmitting(false)
                      this.props.closeReinitiateTransfer()
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
                                if (value) this.setState({ allowTransfer: true })
                                else this.setState({ allowTransfer: false })
                              },
                              clearable: true
                            }}
                          />
                        </Grid.Column>
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button basic fluid onClick={() => this.props.closeReinitiateTransfer()}>
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
}

function mapStateToProps(state) {
  return {
    orderId: state.orders.detail.id,
    bankAccounts: state.orders.bankAccounts,
    bankAccountsLoading: state.orders.bankAccountsLoading,
    paymentProcessor: getSafe(() => state.auth.identity.company.paymentProcessor, ''),
    isThirdPartyConnectionException: getSafe(() => state.orders.isThirdPartyConnectionException, '')
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(ReinitiateTransfer))
