import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as Actions from "../../actions"
import { loadFile, addAttachment} from "~/modules/inventory/actions"
import { Modal, ModalContent, Header, Button, Grid } from "semantic-ui-react"
import { Form, Dropdown } from 'formik-semantic-ui'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl'
import styled from 'styled-components'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import { withToastManager } from 'react-toast-notifications'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const Subtitle = styled(Header)`
  margin-top: 1em;
  font-weight: 400;
`

const initValues = {
  paymentAccounts: []
}

const validationScheme = val.object().shape({
  paymentAccounts: val.array().of(val.object().shape({
    id: val.number().min(0)
  }))
})

class ReinitiateTransfer extends React.Component {

  componentDidMount() {
    this.props.loadBankAccounts()
  }

  render() {
    const { intl: { formatMessage} } = this.props

    return (
      <>
        <Modal open={true}>
          <Modal.Header>
            <FormattedMessage id='order.reinitiateTransfer' defaultMessage='Reinitiate Transfer' />
            <Subtitle as='h4'>
              <FormattedMessage id='order.reinitiateTransfer.subtitle' defaultMessage='Please select another payment account and Transfer' />
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
                  actions.setSubmitting(false)
                }}
                className='flex stretched'
                style={{ padding: '0' }}
              >
                {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
                  return (
                    <>
                      <Grid>
                        <Grid.Column width={6}>
                          <Dropdown name='paymentAccounts' inputProps={{ placeholder: formatMessage({ id: 'order.reinitiateTransfer.dropdownPlaceholder', defaultMessage: '-- select payment account --' }) }} />
                        </Grid.Column>
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button basic fluid onClick={() => this.props.closeReinitiateTransfer()}>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
                          </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button primary fluid>
                            <FormattedMessage id='order.reinitiateTransfer.transfer' defaultMessage='Transfer' tagName='span' />
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
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(ReinitiateTransfer)))
