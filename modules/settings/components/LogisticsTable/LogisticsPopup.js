import React, { Component } from 'react'
import { Modal, Button, FormGroup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { array } from 'prop-types'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'

import { errorMessages } from '~/constants/yupValidation'

const { requiredMessage } = errorMessages

import { closePopup, getLogisticsProviders, createLogisticsAccount, updateLogisticsAccount } from '~/modules/settings/actions'

const validationSchema = Yup.object().shape({
  provider: Yup.string(requiredMessage).required(requiredMessage),
  apiKey: Yup.string(requiredMessage).required(requiredMessage),
  username: Yup.string(requiredMessage).required(requiredMessage),
  password: Yup.string(requiredMessage).required(requiredMessage)
})

const initialValues = {
  provider: '',
  apiKey: '',
  username: '',
  password: ''
}



class LogisticsPopup extends Component {
  componentDidMount() {
    this.props.getLogisticsProviders()
  }

  render() {
    let {
      popupValues, closePopup, logisticsProviders,
      logisticsProvidersFetching, createLogisticsAccount, updateLogisticsAccount, intl: { formatMessage }, toastManager } = this.props

    return (
      <Modal open centered={false}>
        <Modal.Header>
          {popupValues
            ? <FormattedMessage id='settings.editLogistics' defaultMessage='Edit Logistics' />
            : <FormattedMessage id='settings.addLogistics' defaultMessage='Add Logistics' />
          }
        </Modal.Header>
        <Modal.Content>
          <Form
            validationSchema={validationSchema}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={popupValues || initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (popupValues) {
                  await updateLogisticsAccount(values)
                } else {
                  await createLogisticsAccount(values)
                }

                let status = popupValues ? 'Updated' : 'Created'

                toastManager.add(generateToastMarkup(
                  formatMessage({ id: `notifications.logistics${status}.header` }),
                  formatMessage({ id: `notifications.logistics${status}.content` }, { name: logisticsProviders[logisticsProviders.findIndex((el) => el.id === values.provider)].name })
                ), { appearance: 'success' })

              } catch { }
              finally {
                setSubmitting(false)
                closePopup()
              }
            }}>
            {({ submitForm }) => {
              this.handleSubmit = submitForm
              return (
                <>
                  <FormGroup widths='equal' data-test='settings_logistics_apikey_inp'>
                    <Dropdown name='provider'
                      options={
                        logisticsProviders.map((provider) => ({
                          key: provider.id,
                          text: provider.name,
                          value: provider.id
                        }))
                      }
                      label={formatMessage({ id: 'logistics.label.logisticsProvider', defaultMessage: 'Logistics Provider' })}
                      inputProps={{
                        'data-test': 'settings_logistics_provider_drpdn',
                        placeholder: formatMessage({ id: 'logistics.placeholder.logisticsProvider', label: 'Select Logistics Provider' }),
                        loading: logisticsProvidersFetching
                      }} />
                    <Input
                      name='apiKey'
                      label={formatMessage({ id: 'logistics.label.apiKey', defaultMessage: 'API Key' })}
                      inputProps={{ placeholder: formatMessage({ id: 'logistics.placeholder.apiKey', defaultMessage: 'Enter your API key' }) }} />
                  </FormGroup>

                  <FormGroup widths='equal' data-test='settings_logistics_namePassword_inp'>
                    <Input
                      name='username'
                      label={formatMessage({ id: 'logistics.label.username', defaultMessage: 'User Name' })}
                      inputProps={{ placeholder: formatMessage({ id: 'logistics.placeholder.username', defaultMessage: 'username' }) }} />
                    <Input
                      name='password'
                      label={formatMessage({ id: 'logistics.label.password', defaultMessage: 'Password' })}
                      inputProps={{ type: 'password' }} />
                  </FormGroup>
                </>
              )
            }}

          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={closePopup} data-test='settings_logistics_cancel_btn'>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
          </Button>
          <Button onClick={() => this.handleSubmit()} primary data-test='settings_logistics_submit_btn'>
            <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}


LogisticsPopup.propTypes = {
  logisticsProviders: array
}

LogisticsPopup.defaultProps = {
  logisticsProviders: []
}


const mapDispatchToProps = {
  closePopup, getLogisticsProviders, createLogisticsAccount, updateLogisticsAccount
}

const mapStateToProps = ({ settings: { popupValues, logisticsProvidersFetching, logisticsProviders } }) => ({
  popupValues, logisticsProvidersFetching, logisticsProviders
})


export default injectIntl(withToastManager(connect(mapStateToProps, mapDispatchToProps)(LogisticsPopup)))