import React, { Component } from 'react'
import { Segment, FormGroup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { array } from 'prop-types'
import styled from 'styled-components'
//Actions
import {
  closeSidebar,
  getLogisticsProviders,
  createLogisticsAccount,
  updateLogisticsAccount,
  getLogisticsAccounts
} from '~/modules/settings/actions'
//Components
import { errorMessages, passwordValidationAnyChar } from '~/constants/yupValidation'
const { requiredMessage } = errorMessages
import { Required } from '~/components/constants/layout'
import { getSafe } from '~/utils/functions'
import ErrorFocus from '~/components/error-focus'
import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/constants/layout'

const initialValues = {
  providerIdentifier: '',
  providerIdentifierName: '',
  username: '',
  password: '',
  apiKey: ''
}

const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
  background-color: #ffffff;
  z-index: 1;
`

const CustomSegmentContent = styled(Segment)`
  padding-top: 0px !important;
`

const BottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
`

const ButtonSubmit = styled(Button.Submit)`
  background-color: #2599d5 !important;
  color: #ffffff !important;
`

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

class LogisticsSidebar extends Component {
  componentDidMount() {
    this.props.getLogisticsProviders()
  }

  getInitialValues = () => {
    let { popupValues } = this.props
    return popupValues
      ? {
          providerIdentifier: JSON.stringify(popupValues.provider.identifier),
          providerIdentifierName: `${popupValues.provider.name} (${popupValues.provider.identifierValue})`,
          username:
            popupValues.accountInfos && popupValues.accountInfos.length ? popupValues.accountInfos[0].username : '',
          password: '',
          apiKey: popupValues.accountInfos && popupValues.accountInfos.length ? popupValues.accountInfos[0].apiKey : ''
        }
      : initialValues
  }

  getValidationSchema = popupValues => {
    if (popupValues) {
      return Yup.object().shape({
        username: Yup.string(requiredMessage).required(requiredMessage),
        password: passwordValidationAnyChar()
      })
    } else {
      return Yup.object().shape({
        providerIdentifier: Yup.string(requiredMessage).required(requiredMessage),
        username: Yup.string(requiredMessage).required(requiredMessage),
        password: passwordValidationAnyChar()
      })
    }
  }

  render() {
    let {
      popupValues,
      closeSidebar,
      logisticsProviders,
      logisticsProvidersFetching,
      createLogisticsAccount,
      updateLogisticsAccount,
      getLogisticsAccounts,
      intl: { formatMessage }
    } = this.props

    return (
      <CustomForm
        validationSchema={this.getValidationSchema(popupValues)}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={this.getInitialValues()}
        onSubmit={async (values, { setSubmitting }) => {
          const apiKey = values.apiKey ? { apiKey: values.apiKey } : null

          const payload = {
            providerIdentifier: getSafe(() => popupValues.provider.identifierType, '')
              ? {
                  type: popupValues.provider.identifierType,
                  value: popupValues.provider.identifierValue
                }
              : JSON.parse(values.providerIdentifier),
            username: values.username,
            password: values.password,
            ...apiKey
          }

          try {
            if (popupValues) {
              await updateLogisticsAccount(popupValues.id, payload)
            } else {
              await createLogisticsAccount(payload)
              getLogisticsAccounts()
            }
          } catch {
          } finally {
            setSubmitting(false)
            closeSidebar()
          }
        }}>
        <FlexSidebar visible={true} width='very wide' style={{ width: '630px' }} direction='right' animation='overlay'>
          <div>
            <CustomHighSegment basic>
              {popupValues ? (
                <FormattedMessage id='settings.editLogistics' defaultMessage='Edit Logistics' />
              ) : (
                <FormattedMessage id='settings.addLogistics' defaultMessage='Add Logistics' />
              )}
            </CustomHighSegment>
          </div>
          <FlexContent style={{ padding: '16px' }}>
            <CustomSegmentContent basic>
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
                <Input
                  name='apiKey'
                  label={<>{formatMessage({ id: 'logistics.label.apiKey', defaultMessage: 'API key' })}</>}
                  inputProps={{
                    placeholder: formatMessage({
                      id: 'logistics.placeholder.apiKey',
                      defaultMessage: 'Enter API key'
                    })
                  }}
                />
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
            </CustomSegmentContent>
          </FlexContent>
          <BottomButtons>
            <Button type='button' basic onClick={closeSidebar} data-test='settings_logistics_sidebar_reset_btn'>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                {text => text}
              </FormattedMessage>
            </Button>
            <ButtonSubmit data-test='settings_logistics_sidebar_submit_btn'>
              <FormattedMessage id='global.save' defaultMessage='Save'>
                {text => text}
              </FormattedMessage>
            </ButtonSubmit>
          </BottomButtons>
        </FlexSidebar>

        <ErrorFocus />
      </CustomForm>
    )
  }
}

LogisticsSidebar.propTypes = {
  logisticsProviders: array
}

LogisticsSidebar.defaultProps = {
  logisticsProviders: []
}

const mapDispatchToProps = {
  closeSidebar,
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(LogisticsSidebar))
