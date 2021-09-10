import { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
//Components
import { LogoWrapper, LoginContainer, LoginSegment, InstructionsDiv, LoginHeader, StyledMessage, LogoImage, LogoIcon, LoginField, ToggleLabel, VersionWrapper } from '../../password/constants/layout'
import AuthenticationSelectPopup from './AuthenticationSelectPopup'
import AuthenticationEnterPopup from './AuthenticationEnterPopup'
//Images
import Logo from '../../../assets/images/login/logo-bluepallet.svg'
import Icon from '../../../assets/images/login/icon-bluepallet.svg'
//Styles
import { StyledForm, LoginButton, AutoColumn } from '../styles'
//Constants
import { validationLoginFormScheme, resetLoginFormScheme, initLoginFormValues } from '../constants'

const LoginForm = props => {
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)

  const { isLoading, message, version, intl, router, identity, twoFactorAuthSession } = props
  const { formatMessage } = intl

  useEffect(() => {
    const { loginInit, getVersion } = props

    loginInit()
    getVersion()
  }, [])

  const toggleResetPassword = () => {
    setResetPassword(!resetPassword)
  }

  return (
    <>
      <LogoWrapper>
        <LogoImage src={Logo} />
      </LogoWrapper>
      <LoginContainer>
        <LoginSegment loading={isLoading} raised padded='very'>
          <LoginHeader as='h1'>
            <LogoIcon src={Icon} />
            <FormattedMessage id='login.loginPage' defaultMessage='Login Page' />
          </LoginHeader>

          {message ? (
            <StyledMessage error content={message} />
          ) : (
            router.query.auto && <StyledMessage info content={'You have been automatically logged out.'} />
          )}

          <StyledForm
            initialValues={initLoginFormValues}
            validateOnChange={true}
            validationSchema={resetPassword ? resetLoginFormScheme : validationLoginFormScheme}
            onSubmit={async (values, actions) => {
              const { username, password } = values
              const { login, resetPasswordRequest } = props

              let inputsState = {
                passwordError: resetPassword ? false : password.length < 3,
                usernameError: username.length < 3
              }

              try {
                if (!inputsState.passwordError && !inputsState.usernameError) {
                  if (resetPassword) await resetPasswordRequest(username)
                  else await login(username.trim(), password)
                } else {
                  setUsernameError(inputsState.usernameError)
                  setPasswordError(inputsState.passwordError)
                  actions.setSubmitting(false)
                }
              } catch {
                // design for Bad Credentials
                actions.setFieldError('username', ' ')
                actions.setFieldError('password', ' ')
                actions.setSubmitting(false)
              }
            }}>
            {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
              return (
                <>
                  <InstructionsDiv>
                    {resetPassword && <FormattedMessage id='auth.resetPasswordInstructions' />}
                  </InstructionsDiv>

                  <LoginField error={usernameError} data-test='login_username_inp'>
                    <label>
                      <FormattedMessage id='auth.username' defaultMessage='Username' />
                    </label>
                    <Input
                      name='username'
                      inputProps={{ placeholder: formatMessage({ id: 'auth.username', defaultMessage: 'Password' }) }}
                    />
                  </LoginField>
                  {!resetPassword && (
                    <LoginField error={passwordError} data-test='login_password_inp'>
                      <label>
                        <FormattedMessage id='auth.password' defaultMessage='Password' />
                      </label>
                      <Input
                        name='password'
                        inputProps={{
                          placeholder: formatMessage({ id: 'auth.password', defaultMessage: 'Password' }),
                          type: 'password'
                        }}
                      />
                    </LoginField>
                  )}
                  <ToggleLabel onClick={toggleResetPassword} data-test='login_reset_toggle_btn'>
                    {resetPassword ? (
                      <FormattedMessage id='auth.cancelPasswordReset' defaultMessage='Password Reset Cancel'>
                        {text => text}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage id='auth.resetMyPassword' defaultMessage='Password Reset'>
                        {text => text}
                      </FormattedMessage>
                    )}
                  </ToggleLabel>
                  <LoginButton type='submit' primary fluid size='large' data-test='login_submit_btn' disabled={values.username === '' || (!resetPassword && values.password === '')}>
                    {resetPassword ? (
                      <FormattedMessage id='auth.resetPassword' defaultMessage='Reset Password'>
                        {text => text}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage id='auth.login' defaultMessage='Log in'>
                        {text => text}
                      </FormattedMessage>
                    )}
                  </LoginButton>



                  {twoFactorAuthSession?.options && (
                    <AuthenticationSelectPopup
                      onAccept={async value => {


                        console.log('!!!!!!!!!! AuthenticationSelectPopup onAccept value', value)
                        console.log('!!!!!!!!!! AuthenticationSelectPopup onAccept session', twoFactorAuthSession.session)

                        await props.login(
                          values.username.trim(),
                          values.password,
                          twoFactorAuthSession.session,
                          'EMAIL'
                        )

                      }}

                    />
                  )}
                  {twoFactorAuthSession && !twoFactorAuthSession.options && (
                    <AuthenticationEnterPopup

                      onAccept={async value => {


                        console.log('!!!!!!!!!! AuthenticationEnterPopup onAccept value', value)
                        console.log('!!!!!!!!!! AuthenticationEnterPopup onAccept session', twoFactorAuthSession.session)

                        await props.login(
                          values.username.trim(),
                          values.password,
                          twoFactorAuthSession.session,
                          null,
                          value
                        )

                      }}


                    />
                    )}







                </>
              )
            }}
          </StyledForm>
          <VersionWrapper>{version && `v${version}`}</VersionWrapper>
        </LoginSegment>
      </LoginContainer>
    </>
  )
}

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  version: PropTypes.string,
  intl: PropTypes.object,
  router: PropTypes.any,
  identity: PropTypes.object,
  loginInit: PropTypes.func,
  getVersion: PropTypes.func,
  login: PropTypes.func,
  resetPasswordRequest: PropTypes.func
}

LoginForm.defaultProps = {
  isLoading: false,
  message: '',
  version: '',
  intl: {},
  router: null,
  identity: {},
  loginInit: () => {},
  getVersion: () => {},
  login: () => {},
  resetPasswordRequest: () => {}
}

export default withRouter(injectIntl(LoginForm))
