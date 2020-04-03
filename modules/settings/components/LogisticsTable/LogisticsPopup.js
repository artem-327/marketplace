import React, { Component } from 'react'
import { Modal, Button, FormGroup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { array } from 'prop-types'
import { errorMessages, passwordValidationAnyChar } from '~/constants/yupValidation'

const { requiredMessage } = errorMessages
import { Required } from '~/components/constants/layout'

import {
  closePopup,
  getLogisticsProviders,
  createLogisticsAccount,
  updateLogisticsAccount,
  getLogisticsAccounts
} from '~/modules/settings/actions'

const validationSchema = Yup.object().shape(
  {
    providerIdentifier: Yup.string(requiredMessage).required(requiredMessage),
    username: Yup.string(requiredMessage).required(requiredMessage),
    password: passwordValidationAnyChar()
  }
)

const initialValues = {
  providerIdentifier: '',
  providerIdentifierName: '',
  username: '',
  password: ''
}

class LogisticsPopup extends Component {

  componentDidMount() {
    this.props.getLogisticsProviders()
  }

  getInitialValues = () => {
    let { popupValues } = this.props
    return popupValues
      ? {
        providerIdentifier: JSON.stringify(popupValues.provider.identifier),
        providerIdentifierName: `${popupValues.provider.name} (${popupValues.provider.identifier.value})`,
        username: popupValues.accountInfos && popupValues.accountInfos.length
          ? popupValues.accountInfos[0].username
          : '',
        password: ''
      }
      :
      initialValues
  }

  render() {
    let {
      popupValues,
      closePopup,
      logisticsProviders,
      logisticsProvidersFetching,
      createLogisticsAccount,
      updateLogisticsAccount,
      getLogisticsAccounts,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false}>
        <Modal.Header>
          {popupValues ? (
            <FormattedMessage id='settings.editLogistics' defaultMessage='Edit Logistics' />
          ) : (
            <FormattedMessage id='settings.addLogistics' defaultMessage='Add Logistics' />
          )}
        </Modal.Header>
        <Modal.Content>
          <Form
            validationSchema={validationSchema}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={this.getInitialValues()}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const payload = {
                  providerIdentifier: JSON.parse(values.providerIdentifier),
                  username: values.username,
                  password: values.password
                }

                if (popupValues) {
                  await updateLogisticsAccount(popupValues.id, payload)
                } else {
                  await createLogisticsAccount(payload)
                  getLogisticsAccounts()
                }
              } catch {
              } finally {
                setSubmitting(false)
                closePopup()
              }
            }}>
            {({ submitForm, values }) => {
              this.handleSubmit = submitForm
              return (
                <>
                  <FormGroup widths='equal' data-test='settings_logistics_apikey_inp'>
                    {popupValues ? (
                      <Input
                        name='providerIdentifierName'
                        label={formatMessage({
                          id: 'logistics.label.logisticsProvider',
                          defaultMessage: 'Logistics Provider'
                        })}
                        inputProps={{
                          readOnly: true
                        }}
                      />
                    ) : (
                      <Dropdown
                        name='providerIdentifier'
                        options={logisticsProviders.map((provider, index) => ({
                          key: provider.identifier.value,
                          text: `${provider.name} (${provider.identifier.value})`,
                          value: JSON.stringify(provider.identifier)
                        }))}
                        label={formatMessage({
                          id: 'logistics.label.logisticsProvider',
                          defaultMessage: 'Logistics Provider'
                        })}
                        inputProps={{
                          search: true,
                          'data-test': 'settings_logistics_provider_drpdn',
                          placeholder: formatMessage({
                            id: 'logistics.placeholder.logisticsProvider',
                            label: 'Select Logistics Provider'
                          }),
                          loading: logisticsProvidersFetching
                        }}
                      />
                    )}
                  </FormGroup>

                  <FormGroup widths='equal' data-test='settings_logistics_namePassword_inp'>
                    <Input
                      name='username'
                      label={
                        <>
                          {formatMessage({ id: 'logistics.label.username', defaultMessage: 'User Name' })}
                          <Required />
                        </>
                      }
                      inputProps={{
                        placeholder: formatMessage({ id: 'logistics.placeholder.username', defaultMessage: 'username' })
                      }}
                    />
                    <Input
                      name='password'
                      label={
                        <>
                          {formatMessage({ id: 'logistics.label.password', defaultMessage: 'Password' })}
                          <Required />
                        </>
                      }
                      inputProps={{ type: 'password' }}
                    />
                  </FormGroup>
                </>
              )
            }}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={closePopup} data-test='settings_logistics_cancel_btn'>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
              {text => text}
            </FormattedMessage>
          </Button>
          <Button onClick={() => this.handleSubmit()} primary data-test='settings_logistics_submit_btn'>
            <FormattedMessage id='global.save' defaultMessage='Save'>
              {text => text}
            </FormattedMessage>
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
  closePopup,
  getLogisticsProviders,
  createLogisticsAccount,
  updateLogisticsAccount,
  getLogisticsAccounts
}

const mapStateToProps = ({ settings: { popupValues, logisticsProvidersFetching, logisticsProviders } }) => ({
  popupValues,
  logisticsProvidersFetching,
  logisticsProviders
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(LogisticsPopup))
